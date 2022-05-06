import {shallowMount, VueWrapper} from "@vue/test-utils";
import Uploader from "../components/Uploader.vue";
import axios from "axios";
import {flushPromises} from "@vue/test-utils";
jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;
let wrapper: VueWrapper<any>;
describe("uploader Component", () => {
    beforeAll(() => {
        wrapper = shallowMount(Uploader, {
            props: {
                action: "test.url"
            }
        });
    });
    it("basic layout before uploading", () => {
        expect(1 + 1).toBe(2);
    });
});
