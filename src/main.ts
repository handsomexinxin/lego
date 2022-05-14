import {createApp} from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import install from "puteng-component";
import router from "./router";
import store from "./store";
import testPlugin from "./testPlugin";

import "ant-design-vue/dist/antd.css";
const app = createApp(App);


app.use(Antd).use(router).use(store).use(testPlugin)
    .use(install);
app.mount("#app");
