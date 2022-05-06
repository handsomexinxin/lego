<template>
  <div class="file-upload">
    <button @click="triggerUpload" :disabled="isUploading">
      <span v-if="isUploading">正在上传</span>
      <!-- <span v-else-if="fileStatus === 'success'">上传成功</span>
      <span v-else-if="fileStatus === 'error'">上传失败</span> -->
      <span v-else>点击上传</span>
    </button>
    <input
      @change="handleFileChange"
      ref="fileInput"
      type="file"
      :style="{ display: 'none' }"
    />
    <ui class="upload-list">
      <li
        v-for="file in uploadedFiles"
        :key="file.id"
        :class="`uploaded-file upload-${file.status}`"
      >
        <span class="filename">{{ file.name }}</span>
        <FileOutlined />
        <LoadingOutlined v-if="file.status === 'loading'" />

        <DeleteOutlined class="delete-icon" @click="removeFile(file.id)"
          >del</DeleteOutlined
        >
      </li>
    </ui>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import axios from "axios";
import { v4 as uuidV4 } from "uuid";
import {
  DeleteOutlined,
  LoadingOutlined,
  FileOutlined,
} from "@ant-design/icons-vue";
type UploadStatus = "ready" | "loading" | "success" | "error";

export interface UploadFile {
  id: string;
  size: number;
  name: string;
  status: UploadStatus;
  raw: File;
}

export default defineComponent({
  name: "upload",
  props: {
    action: {
      type: String,
      required: true,
    },
  },
  components: { DeleteOutlined, LoadingOutlined, FileOutlined },
  setup(props) {
    const fileInput = ref<null | HTMLInputElement>(null);
    const uploadedFiles = ref<UploadFile[]>([]);
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };
    const isUploading = computed(() =>
      uploadedFiles.value.some((item) => item.status === "loading")
    );
    const removeFile = (id: string) => {
      uploadedFiles.value = uploadedFiles.value.filter(
        (file) => file.id !== id
      );
    };

    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      if (files) {
        const uploadFile = files[0];
        const formDate = new FormData();
        formDate.append(uploadFile.name, uploadFile);
        const fileObj = reactive<UploadFile>({
          id: uuidV4(),
          size: uploadFile.size,
          name: uploadFile.name,
          status: "loading",
          raw: uploadFile,
        });
        uploadedFiles.value.push(fileObj);
        axios
          .post(props.action, "formData", {
            headers: {
              "Content-Type": "multipart/form/data",
            },
          })
          .then((resp) => {
            console.log(resp.data);
            fileObj.status = "success";
          })
          .catch(() => {
            fileObj.status = "error";
          })
          .finally(() => {
            if (fileInput.value) {
              fileInput.value.value = "";
            }
          });
      }
    };

    return {
      fileInput,
      triggerUpload,
      handleFileChange,
      uploadedFiles,
      isUploading,
      removeFile,
    };
  },
});
</script>

<style scoped lang="scss">
.upload-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.upload-list li {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  font-size: 14px;
  line-height: 1.8;
  margin-top: 5px;
  box-sizing: border-box;
  border-radius: 4px;
  min-width: 200px;
  position: relative;
  &:first-child {
    margin-top: 10px;
  }
  .file-icon {
    svg: {
      margin-right: 5px;
      color: rgba(0, 0, 0, 0.45);
    }
  }
  .file-name {
    margin-left: 4px;
    margin-right: 40px;
  }
  &.upload-error {
    color: #f5222b;
    svg: {
      color: #f5222b;
    }
  }
  &.upload-success {
    color: #1f54c5;
    svg: {
      color: #1f54c5;
    }
  }
  &.upload-loading {
    color: #aaaeb6;
    svg: {
      color: #aaaeb6;
    }
    // &.upload-ready {
    //   color: #1F54C5;
    //   svg: {
    //     color: #1F54C5;
    //   }
    // }
  }
}
</style>
