<template>
  <div class="homepage-container" v-if="withHeader">
    <a-layout :style="{ background: '#FFF' }">
      <a-layout-header class="header">
        <router-link to="/">
          <div class="page-title">Header</div>
        </router-link>
      </a-layout-header>
      <a-layout-content class="home-layout">
        <router-view></router-view>
        <!-- <hello-world></hello-world> -->
      </a-layout-content>
      <a-layout-footer> Footer </a-layout-footer>
    </a-layout>
  </div>
  <div class="homepage-container" v-else>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  onMounted,
  getCurrentInstance,
  inject,
} from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  setup() {
    const route = useRoute();
    console.log("inject", inject("test"));
    onMounted(() => {
      getCurrentInstance()?.appContext.config.globalProperties.$echo();
    });

    const withHeader = computed(() => route.meta.withHeader);
    return { withHeader };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
.homepage-container {
  width: 100%;
  height: 100%;
}

.page-title {
  color: #fff;
}
/* .header {
  background-color: black;
  color: #fff;
}

.header {
  background-color: black;
} */
.content-container {
  background: #fff;
  padding: 0 24px 24px 30px;
  min-height: 85vh;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  margin-top: 60px;
  min-height: 85vh;
}
</style>
