<template>
  <div class="homepage-container">
    <a-layout :style="{ background: '#FFF' }">
      <a-layout-content class="home-layout">
        <div class="content-container">
          <TemplateList :list="testDate" />
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
// import { useRouter } from "vue-router";
import TemplateList from "../components/TemplateList.vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "@/store";

export default defineComponent({
  name: "Home",
  components: {
    TemplateList,
  },
  setup() {
    // const router = useRouter();
    // setTimeout(() => {
    //   router.push({ name: "template", params: { id: 1 } });
    // }, 2000);
    const store = useStore<GlobalDataProps>();
    const testDate = computed(() => store.state.templates.data);
    // const list = reactive([
    //   { title: "title1", image: "image1", author: "author", id: 1 },
    //   { title: "title2", image: "image2", author: "author", id: 2 },
    //   { title: "title3", image: "image3", author: "author", id: 3 },
    //   { title: "title4", image: "image4", author: "author", id: 4 },
    //   { title: "title5", image: "image5", author: "author", id: 5 },
    //   { title: "title6", image: "image6", author: "author", id: 6 },
    // ]);
    return { testDate };
  },
});
</script>

<style>
.page-title {
  color: #fff;
}
.content-container {
  background: #fff;
  padding: 0 24px 24px 30px;
  min-height: 85vh;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  margin-top: 60px;
}
</style>
