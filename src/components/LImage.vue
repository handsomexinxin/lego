<template>
  <img
    :style="styleProps"
    :src="src"
    class="l-image-component"
    @click.prevent="handleClick"
  />
</template>

<script lang="ts">
import {
  imageDefaultProps,
  transformToComponentProps,
  imageStylePropNames,
} from "@/defaultProps";
import { useComponentCommon } from "@/hooks/useComponentCommon";
import { defineComponent } from "vue";
const defaultProps = transformToComponentProps(imageDefaultProps);

export default defineComponent({
  name: "l-image",
  props: {
    ...defaultProps,
  },
  setup(props) {
    const { styleProps, handleClick } = useComponentCommon(
      props,
      imageStylePropNames
    );
    return { styleProps, handleClick };
  },
});
</script>

<style scoped>
.l-image-component {
  box-sizing: border-box;
  white-space: pre-wrap;
  position: relative !important;
}
</style>
