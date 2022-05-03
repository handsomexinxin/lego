import {Module} from "vuex";
import {GlobalDataProps} from "./index";
import {v4 as uuidv4} from "uuid";
import {TextComponentProps} from "@/defaultProps";

export interface ComponentData {
    props: {[key: string]: unknown};
    id: string;
    // 业务组件名称 l-text l-image
    name: string;
}

export interface EditorProps {
    components: ComponentData[];
    currentElement: string;
}

export const testComponents: ComponentData[] = [
    {id: uuidv4(), name: "l-text", props: {text: "hello", fontSize: "14px", color: "red"}},
    {id: uuidv4(), name: "l-text", props: {text: "hello2", fontSize: "18px", fontWeight: "bold"}},
    {id: uuidv4(), name: "l-text", props: {text: "hello3", fontSize: "20px"}},
];

const editor: Module<EditorProps, GlobalDataProps> = {
    state: {
        components: testComponents,
        currentElement: ""
    },
    mutations: {
        addComponent(state, props: Partial<TextComponentProps>) {
            const newComponent: ComponentData = {
                id: uuidv4(),
                name: "l-text",
                props
            };
            state.components.push(newComponent);
        },
        delComponent(state, props: ComponentData) {
            state.components = state.components.filter((item) => item.id !== props.id);

        }
    }
};

export default editor;
