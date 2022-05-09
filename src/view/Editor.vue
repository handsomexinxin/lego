<template>
  <div class="editor-container" id="editor-layout-main">
    <a-layout class="layout-container">
      <a-layout-sider width="300" :style="{ background: '#fff' }">
        <div class="sidebar-container">组件列表</div>
        <component-list :list="defaultTextTemplates" @on-tem-click="addItem" />
      </a-layout-sider>
      <a-layout style="padding: 0 24px">
        <a-layout-content class="preview-container">
          <p>画布区域</p>
          <div class="preview-list" id="canvas-area">
            <editor-wrapper
              v-for="component in components"
              :id="component.id"
              :key="component.id"
              @setActive="setActive"
              :active="component.id === currentElement?.id"
            >
              <!-- @click="delItem(component)" -->
              <component
                :is="component.name"
                v-bind="component.props"
              ></component>
            </editor-wrapper>
            <br />
          </div>
        </a-layout-content>
      </a-layout>
      <a-layout-sider
        width="300"
        style="background: #fff"
        class="settings-panel"
      >
        组件属性
        <PropsTable
          v-if="currentElement?.props"
          :props="currentElement.props"
          @change="handleChange"
        />
      </a-layout-sider>
      <uploader
        action="http://jsonplaceholder.typicode.com/posts"
        :accept="'image/*'"
        :auto-upload="false"
        :drag="true"
      />
    </a-layout>
  </div>
</template>
<script lang="ts">
import ComponentList from "@/components/ComponentList.vue";
import EditorWrapper from "@/components/EditorWrapper.vue";
import LText from "@/components/LText.vue";
import PropsTable from "@/components/PropsTable.vue";
import Uploader from "@/components/Uploader.vue";
import { TextComponentProps } from "@/defaultProps";
import { GlobalDataProps } from "@/store";
import { ComponentData } from "@/store/editor";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { defaultTextTemplates } from "../defaultTemplates";
export default defineComponent({
  name: "TemplateDetail",
  components: { LText, ComponentList, EditorWrapper, PropsTable, Uploader },
  setup() {
    const store = useStore<GlobalDataProps>();
    const components = computed(() => store.state.editor.components);
    const currentElement = computed<ComponentData | null>(
      () => store.getters.getCurrentElement
    );
    const addItem = (props: Partial<TextComponentProps>) => {
      store.commit("addComponent", props);
    };
    const delItem = (props: ComponentData) => {
      store.commit("delComponent", props);
    };
    const setActive = (id: string) => {
      store.commit("setActive", id);
    };
    const handleChange = (e: {
      key: keyof TextComponentProps;
      value: unknown;
    }) => {
      store.commit("updateCurrentComponent", e);
    };
    return {
      components,
      defaultTextTemplates,
      addItem,
      delItem,
      setActive,
      handleChange,
      currentElement,
    };
  },
});
</script>
<style  scoped>
.editor-container {
  width: 100%;
  height: 100%;
}
.layout-container {
  width: 100%;
  height: 100%;
}
.editor-spinner {
  position: fixed;
  right: 50%;
  top: 10px;
}
.preview-container {
  padding: 24px;
  margin: 0;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.preview-list {
  padding: 0;
  margin: 0;
  min-width: 375px;
  min-height: 200px;
  border: 1px solid #efefef;
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  margin-top: 50px;
  max-height: 80vh;
}
.preview-list.active {
  border: 1px solid #1890ff;
}
.preview-list.canvas-fix .l-text-component,
.preview-list.canvas-fix .l-image-component,
.preview-list.canvas-fix .l-shape-component {
  box-shadow: none !important;
}
.preview-list.canvas-fix {
  position: absolute;
  max-height: none;
}
.sidebar-container {
  padding: 20px;
}
.body-container {
  width: 100%;
  height: 100%;
  background-size: cover;
}
.page-settings {
  padding: 16px;
}
.settings-panel .ant-tabs-top-content {
  max-height: calc(100vh - 68px - 56px);
  overflow-y: auto;
}
.final-preview {
  position: absolute;
  width: calc(100% - 400px);
  height: 100%;
  background: transparent;
  top: 0;
  left: 0;
  z-index: 1500;
  display: flex;
  align-items: center;
  justify-content: center;
}
.final-preview-inner {
  width: 430px;
  height: 870px;
  padding: 60px 28px;
  position: relative;
  /* background: url("~@/assets/phone-back.png") no-repeat; */
  background-size: cover;
}
.final-preview-inner .preview-title {
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-weight: bold;
}
.iframe-container {
  width: 100%;
  height: 706px;
  overflow-y: auto;
  overflow-x: hidden;
}
.iframe-placeholder {
  /* background: url("~@/assets/loading.svg") 50% 50% no-repeat; */
  background-size: 50px;
}
.settings-panel .ant-list-bordered {
  border-radius: 0;
}
.settings-panel .ant-collapse {
  border-radius: 0;
}
.ant-collapse-header,
.ant-collapse-item {
  border-radius: 0 !important;
}
.settings-panel .ant-tabs-tab {
  border-radius: 0 !important;
}
</style>
