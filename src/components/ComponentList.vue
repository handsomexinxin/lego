<template>
  <div class="create-component-list">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="component-item"
      @click="onItemClick(item)"
    >
      <l-text v-bind="item" />
    </div>
  </div>
</template>

<script lang="ts">
import { TextComponentProps } from "@/defaultProps";
import { defineComponent, PropType } from "vue";
import LText from "./LText.vue";

export default defineComponent({
  name: "component-list",
  props: {
    list: {
      type: Array as PropType<Partial<TextComponentProps>[]>,
      required: true,
    },
  },
  emits: ["on-tem-click"],
  components: { LText },
  setup(_, context) {
    const onItemClick = (data: Partial<TextComponentProps>) => {
      context.emit("on-tem-click", data);
    };
    return { onItemClick };
  },
});
</script>

<style scoped>
</style>
