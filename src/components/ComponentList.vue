<template>
  <div class="create-component-list">
    <div v-for="(item, index) in list" :key="index" class="component-item">
      <div v-if="item.tag === 'styled-uploader'">
        <styled-uploader @file-uploaded="onImageUploaded" />
      </div>
      <div @click="onItemClick(item)" v-else>
        <l-text v-bind="item" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  imageDefaultProps,
  maxWidth,
  TextComponentProps,
} from "@/defaultProps";
import { defaultTextTemplates } from "@/defaultTemplates";
import { UploadResp } from "@/extraType";
import { getImageDimensions } from "@/helper";
import { ComponentData } from "@/store/editor";
import { message } from "ant-design-vue";
import { v4 as uuidv4 } from "uuid";
import { defineComponent, PropType } from "vue";
// import LText from "./LTextx.vue";
import StyledUploader from "./StyledUploader.vue";

export default defineComponent({
  name: "component-list",
  props: {
    list: {
      type: Array as PropType<typeof defaultTextTemplates>,
      required: true,
    },
  },
  emits: ["on-tem-click"],
  components: {
    // LText,
    StyledUploader,
  },
  setup(props, context) {
    const onItemClick = (props: Partial<TextComponentProps>) => {
      const componentData: ComponentData = {
        id: uuidv4(),
        name: "l-text",
        props,
      };
      context.emit("on-tem-click", componentData);
    };
    const onImageUploaded = async (props: UploadResp) => {
      const { width } = await getImageDimensions(props.data.url);

      const componentData: ComponentData = {
        id: uuidv4(),
        name: "l-image",
        props: {
          ...imageDefaultProps,
        },
      };
      message.success("上传成功");
      componentData.props.src = props.data.url;
      componentData.props.width =
        width > maxWidth ? `${maxWidth}px` : `${width}px`;
      console.log(componentData);

      context.emit("on-tem-click", componentData);
    };
    return { onItemClick, onImageUploaded };
  },
});
</script>

<style scoped>
</style>
