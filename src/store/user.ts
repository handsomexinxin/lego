import {Module} from "vuex";
import {GlobalDataProps} from ".";

export interface UserProps {
    isLogin: boolean;
    username?: string;
}
const user: Module<UserProps, GlobalDataProps> = {
    state: {
        isLogin: false,
    },
    mutations: {
        login(state) {
            state.isLogin = true;
            state.username = "xinxin";
        },
        logOut(state) {
            state.isLogin = false;
        }
    }
};

export default user;
