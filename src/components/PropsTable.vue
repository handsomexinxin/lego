<template>
  <div class="props-table">
    <div v-for="(value, key) in finalProps" :key="key" class="prop-item">
      <span class="label" v-if="value?.text">{{ value.text }}</span>
      <div class="prop-component">
        <component
          v-if="value"
          :is="value.component"
          :[value.valueProp]="value.value"
          v-bind="value.extraProps"
          v-on="value.events"
        >
          <!-- :value="value.value" -->
          <template v-if="value.options">
            <component
              v-for="(option, k) in value.options"
              :is="value.subComponent"
              :key="k"
              v-bind="option"
            >
              <render-v-node :v-node="option.text" />
            </component>
          </template>
        </component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { TextComponentProps } from "@/defaultProps";
import RenderVNode from "@/utils/RenderVNode";
import { computed, defineComponent, PropType, VNode } from "vue";
import { reduce } from "lodash-es";
import { mapPropsToFrom } from "@/propsMap";
import ColorPicker from "./ColorPicker.vue";

interface FormProps {
  component: string;
  subComponent?: string;
  value: unknown;
  valueProp: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraProps?: Record<string, any>;
  text?: string;
  options?: {
    text: string | VNode;
    value: unknown;
  }[];
  eventName: string;
  events: { [key: string]: (e: unknown) => void };
}

export default defineComponent({
  name: "props-table",
  components: { RenderVNode, ColorPicker },
  props: {
    props: {
      type: Object as PropType<TextComponentProps>,
      required: true,
    },
  },
  emits: ["change"],
  setup(props, context) {
    const finalProps = computed(() =>
      reduce(
        props.props,
        (result, value, key) => {
          const newKey = key as keyof TextComponentProps;
          const item = mapPropsToFrom[newKey];
          if (item !== undefined) {
            const {
              valueProp = "value",
              eventName = "change",
              initialTransform,
              afterTransform,
            } = item;
            const newItem: FormProps = {
              ...item,
              value: initialTransform ? initialTransform(value) : value,
              valueProp,
              eventName,
              events: {
                [eventName]: (e: unknown) => {
                  context.emit("change", {
                    key,
                    value: afterTransform ? afterTransform(e) : e,
                  });
                },
              },
            };
            result[newKey] = newItem;
          }
          return result;
        },
        {} as { [key: string]: FormProps }
      )
    );
    return { finalProps };
  },
});
</script>

<style scoped>
.prop-item {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}
.label {
  width: 28%;
}
.prop-component {
  width: 70%;
}
</style>
