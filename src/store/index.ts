import {createStore} from "vuex";
import templates, {TemplatesProps} from "./template";
import user, {UserProps} from "./user";




export interface GlobalDataProps {
    user: UserProps;
    templates: TemplatesProps;
}


const store = createStore<GlobalDataProps>({
    modules: {templates, user},
});

export default store;
