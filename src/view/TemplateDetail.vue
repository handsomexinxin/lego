<template>
  <div class="work-detail-container">
    <a-row type="flex" justify="center">
      <a-col :span="8" class="cover-img">
        <img
          src="http://static-dev.imooc-lego.com/imooc-test/sZHlgv.png"
          alt=""
        />
      </a-col>
      <a-col :span="8">
        <h2>{{ "currentTemplate.title" }}</h2>
        <p>{{ "currentTemplate.desc" }}</p>
        <div class="author">
          <a-avatar src="currentTemplate.user.picture" v-if="false"> </a-avatar>
          <a-avatar v-else>
            <template v-slot:icon><UserOutlined /></template>
          </a-avatar>
          该模版由 <b>{{ "currentTemplate.user.nickName " }}</b> 创作
        </div>
        <div class="bar-code-area">
          <span>扫一扫，手机预览</span>
          <div ref="container"></div>
        </div>
        <div class="use-button">
          <router-link to="/editor">
            <a-button type="primary" size="large">
              <!-- @click="onCopy(currentTemplate.id)"
            :loading="isCreating" -->
              <!-- {{ isCreating ? "创建中..." : "使用模版" }} -->
              sss
            </a-button>
          </router-link>
          <a-button size="large" :style="{ marginLeft: '20px' }">
            下载图片海报
          </a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { UserOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  name: "TemplateDetail",
  components: {
    UserOutlined,
  },
  // setup() {},
});
</script>

<style scoped>
.work-detail-container {
  margin-top: 50px;
}
.cover-img {
  margin-right: 30px;
}
.cover-img img {
  width: 100%;
}
.use-button {
  margin: 30px 0;
}
.ant-avatar {
  margin-right: 10px;
}
.bar-code-area {
  margin: 20px 0;
}
</style>
