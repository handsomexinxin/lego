<template>
  <div
    class="edit-wrapper"
    @click="onHandleClick(id)"
    :class="{ active: active }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "edit-wrapper",
  props: {
    id: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["set-active"],
  setup(props, context) {
    const onHandleClick = (id: string) => {
      context.emit("set-active", id);
    };
    return { onHandleClick };
  },
});
</script>

<style scoped>
.edit-wrapper {
  padding: 0;
  cursor: pointer;
  border: 1px solid transparent;
  user-select: none;
}
.edit-wrapper:hover {
  border: 1px solid #ccc;
}
.edit-wrapper.active {
  border: 1px solid #1890ff;
  user-select: none;
  z-index: 1500;
}
</style>
