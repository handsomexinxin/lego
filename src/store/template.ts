import {Module} from "vuex";
import {GlobalDataProps} from "./index";

export interface TemplateProps {
    id: number;
    title: string;
    coverImg: string;
    author: string;
    copiedCount: number;
}

export interface TemplatesProps {
    data: TemplateProps[];
}

export const testData: TemplateProps[] = [
    {title: "title1", coverImg: "https://static.imooc-lego.com/upload-files/screenshot-677311.png", author: "author", id: 1, copiedCount: 10},
    {title: "title2", coverImg: "https://static.imooc-lego.com/upload-files/screenshot-677311.png", author: "author", id: 2, copiedCount: 198},
    {title: "title3", coverImg: "https://static.imooc-lego.com/upload-files/screenshot-677311.png", author: "author", id: 3, copiedCount: 16},
    {title: "title4", coverImg: "https://static.imooc-lego.com/upload-files/screenshot-677311.png", author: "author", id: 4, copiedCount: 145},
    {title: "title5", coverImg: "https://static.imooc-lego.com/upload-files/screenshot-677311.png", author: "author", id: 5, copiedCount: 11},
    {title: "title6", coverImg: "https://static.imooc-lego.com/upload-files/screenshot-677311.png", author: "author", id: 6, copiedCount: 15},
];


const templates: Module<TemplatesProps, GlobalDataProps> = {
    state: {
        data: testData,
    },
    getters: {
        getTemplateById: (state) => (id: number) => {
            return state.data.find(t => t.id === id);
        }
    },
};

export default templates;
