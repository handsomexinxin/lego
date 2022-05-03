<template>
  <div class="edit-wrapper" @click="onHandleClick(id)">
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
</style>
