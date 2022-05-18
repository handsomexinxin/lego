<template>
  <div class="file-upload">
    <!-- class="upload-area" -->
    <div
      :class="{ 'is-dragover': isDragOver, 'upload-area': isDragOver }"
      v-on="events"
    >
      <slot v-if="isUploading" name="loading">
        <button disabled>正在上传</button>
      </slot>
      <slot
        name="uploaded"
        v-else-if="lastFileData && lastFileData.loaded"
        :uploadedDate="lastFileData.data"
      >
        <button>点击上传</button>
      </slot>
      <slot v-else name="default">
        <button>点击上传</button>
      </slot>
      <!-- <button @click="uploadFile">点击上传所有</button> -->
    </div>
    <input
      @change="handleFileChange"
      ref="fileInput"
      type="file"
      :style="{ display: 'none' }"
      :multiple="multiple"
      :accept="accept"
    />
    <ui class="upload-list" v-if="showUploaderList">
      <li
        v-for="file in fileList"
        :key="file.id"
        :class="`uploaded-file upload-${file.status}`"
      >
        <img
          v-if="file.url"
          :src="file.url"
          class="upload-list-thumbnail"
          :alt="file.name"
        />
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
import { computed, defineComponent, PropType, reactive, ref } from "vue";
import axios from "axios";
import { v4 as uuidV4 } from "uuid";
import { last } from "lodash-es";
import {
  DeleteOutlined,
  LoadingOutlined,
  FileOutlined,
} from "@ant-design/icons-vue";
type UploadStatus = "ready" | "loading" | "success" | "error";
type CheckUpload = (file: File) => boolean | Promise<File>;
type FileListType = "picture" | "text";

export interface UploadFile {
  id: string;
  size: number;
  name: string;
  status: UploadStatus;
  raw: File;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resp?: any;
  url?: string;
}
export default defineComponent({
  name: "upload",
  props: {
    action: {
      type: String,
      required: true,
    },
    beforeUpload: {
      type: Function as PropType<CheckUpload>,
    },
    headers: {
      type: Object as PropType<Record<string, string>>,
    },
    formName: {
      type: String,
    },
    data: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: Object as PropType<Record<string, any>>,
    },
    withCredentials: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: String,
    },
    drag: {
      type: Boolean,
      default: false,
    },
    autoUpload: {
      type: Boolean,
      default: true,
    },
    showUploaderList: {
      type: Boolean,
      default: true,
    },
    listType: {
      type: String as PropType<FileListType>,
      default: "text",
    },
  },
  components: { DeleteOutlined, LoadingOutlined, FileOutlined },
  emits: ["success", "onError", "onProgress"],
  setup(props, context) {
    const fileInput = ref<null | HTMLInputElement>(null);
    const fileList = ref<UploadFile[]>([]);
    const isDragOver = ref(false);
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };
    const isUploading = computed(() =>
      fileList.value.some((item) => item.status === "loading")
    );
    const lastFileData = computed(() => {
      const lastFile = last(fileList.value);
      if (lastFile) {
        return {
          loaded: lastFile.status === "success",
          data: lastFile.resp,
        };
      }
      return false;
    });
    const removeFile = (id: string) => {
      fileList.value = fileList.value.filter((file) => file.id !== id);
    };
    const postFile = (readyFile: UploadFile) => {
      const formData = new FormData();
      formData.append(props.formName || readyFile.name, readyFile.raw);
      if (props.data) {
        Object.keys(props.data).forEach((key) => {
          const value = props.data?.[key];
          if (value) {
            formData.append(key, value);
          }
        });
      }
      readyFile.status = "loading";

      axios
        .get(props.action, {
          withCredentials: props.withCredentials,
          headers: {
            "Content-Type": "multipart/form/data",
            ...props.headers,
          },
          onUploadProgress: (progressEvent) => {
            context.emit("onProgress", {
              progress: (progressEvent.loaded / progressEvent.total) * 100,
              fileObj: readyFile,
            });
          },
        })
        .then((resp) => {
          readyFile.status = "success";
          readyFile.resp = resp.data;

          context.emit("success", resp.data);
        })
        .catch(() => {
          console.log("catch");

          readyFile.status = "error";
          context.emit("onError");
        });
    };
    const addFileToList = (uploadFile: File) => {
      const fileObj = reactive<UploadFile>({
        id: uuidV4(),
        size: uploadFile.size,
        name: uploadFile.name,
        status: "ready",
        raw: uploadFile,
      });

      if (props.listType === "picture") {
        try {
          // 同步
          // 这种方式一直存在于document内，清除方式只有upload() 或者revokeObjectURL()手动清除  性能优秀
          fileObj.url = URL.createObjectURL(uploadFile);
          // 异步  bse64方式
          const fileReady = new FileReader();
          fileReady.readAsDataURL(uploadFile);
          fileReady.addEventListener("load", () => {
            fileObj.url = fileReady.result as string;
          });
        } catch (error) {
          console.error(error);
        }
      }

      fileList.value.push(fileObj);
      if (props.autoUpload) {
        postFile(fileObj);
      }
      if (fileInput.value) {
        fileInput.value.value = "";
      }
    };
    const beforeUploadCheck = (files: FileList) => {
      if (files) {
        const uploadFIle = files[0];
        if (props.beforeUpload) {
          const result = props.beforeUpload(uploadFIle);
          if (result && result instanceof Promise) {
            result
              .then((processFile) => {
                if (processFile instanceof File) {
                  addFileToList(processFile);
                } else {
                  throw new Error(
                    "beforeUpload promise should return file object "
                  );
                }
              })
              .catch((e) => {
                console.error(e);
              });
          } else if (result === true) {
            addFileToList(uploadFIle);
          }
        } else {
          addFileToList(uploadFIle);
        }
      }
    };

    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      if (files) {
        beforeUploadCheck(files);
      }
    };

    const uploadFile = () => {
      fileList.value
        .filter((file) => file.status === "ready")
        .forEach((readyFile) => postFile(readyFile));
    };

    const events: Record<string, (e: any) => void> = {
      click: triggerUpload,
    };

    const handleDrag = (e: DragEvent, over: boolean) => {
      e.preventDefault();
      isDragOver.value = over;
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      isDragOver.value = false;
      if (e.dataTransfer) {
        beforeUploadCheck(e.dataTransfer.files);
      }
    };

    if (props.drag === true) {
      events.dragover = (e: DragEvent) => {
        handleDrag(e, true);
      };
      events.dragleave = (e: DragEvent) => {
        handleDrag(e, false);
      };
      events.drop = handleDrop;
    }

    return {
      fileInput,
      triggerUpload,
      handleFileChange,
      fileList,
      isUploading,
      removeFile,
      lastFileData,
      isDragOver,
      handleDrag,
      handleDrop,
      events,
      uploadFile,
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
  .upload-list-thumbnail {
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
.file-upload .upload-area {
  background-color: #efefef;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  padding: 20px;
  width: 360px;
  height: 180px;
  text-align: center;
  &:hover {
    border: 1px dashed #1890ff;
  }
  &.is-dragover {
    background-color: rgba(#1890ff, 0.2);
    border: 1px dashed #1890ff;
  }
}
.upload-area img {
  height: 100px;
}
</style>
