import {createStore} from "vuex";
import editor, {EditorProps} from "./editor";
import templates, {TemplatesProps} from "./template";
import user, {UserProps} from "./user";




export interface GlobalDataProps {
    user: UserProps;
    templates: TemplatesProps;
    editor: EditorProps;
}


const store = createStore<GlobalDataProps>({
    modules: {templates, user, editor},
});

export default store;
