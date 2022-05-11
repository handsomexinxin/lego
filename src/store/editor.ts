import {Module} from "vuex";
import {GlobalDataProps} from "./index";
import {v4 as uuidv4} from "uuid";
import {ImageComponentProps, TextComponentProps} from "@/defaultProps";

export interface ComponentData {
    props: Partial<TextComponentProps> & Partial<ImageComponentProps>;
    id: string;
    // 业务组件名称 l-text l-image
    name: string;
}

export interface EditorProps {
    components: ComponentData[];
    currentElement: string;
}

export const testComponents: ComponentData[] = [
    {id: uuidv4(), name: "l-text", props: {text: "hello", fontSize: "14px", color: "red", lineHeight: "1"}},
    {id: uuidv4(), name: "l-text", props: {text: "hello2", fontSize: "18px", fontWeight: "bold", lineHeight: "2"}},
    {id: uuidv4(), name: "l-text", props: {text: "hello3", fontSize: "20px", textAlign: "left", fontFamily: "\"SimSun\",\"STSong\""}},
];

const editor: Module<EditorProps, GlobalDataProps> = {
    state: {
        components: testComponents,
        currentElement: ""
    },
    getters: {
        getCurrentElement(state) {
            return state.components.find((item) => item.id === state.currentElement);
        }
    },
    mutations: {
        addComponent(state, component: ComponentData) {
            // const newComponent: ComponentData = {
            //     id: uuidv4(),
            //     name: "l-text",
            //     props
            // };
            state.components.push(component);
        },
        delComponent(state, props: ComponentData) {
            state.components = state.components.filter((item) => item.id !== props.id);
        },
        setActive(state, id: string) {
            state.currentElement = id;
        },
        updateCurrentComponent(state, {key, value}) {
            const updateComponent = state.components.find((item) => item.id === state.currentElement);
            if (updateComponent !== undefined) {
                updateComponent.props[key as keyof TextComponentProps] = value;
            }
        }
    }
};

export default editor;
