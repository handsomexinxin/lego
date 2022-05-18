import {App} from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
const plugins = {
    install: (app: App) => {
        app.config.globalProperties.$echo = () => {
            console.log("test plugins $echo");

        };
        app.component("hello-world", HelloWorld);
        app.provide("test", {message: "test plugin provider message"});
    }
};

export default plugins;
