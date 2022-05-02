import {createRouter, createWebHistory} from "vue-router";
import Home from "../view/Home.vue";
import TemplateDetail from "../view/TemplateDetail.vue";
import Editor from "../view/Editor.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
            meta: {withHeader: true}
        },
        {
            path: "/editor",
            name: "editor",
            component: Editor
        },
        {
            path: "/template/:id",
            name: "template",
            component: TemplateDetail,
            meta: {withHeader: true}
        }
    ]
});

export default router;
