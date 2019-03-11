const basic = {
    state: {
        userInfo: {}, // 当前登录人信息
    },
    getters: {
        getUserInfo(state) {
            return state.userInfo;
        }
    },
    actions: {
        updateUserInfo(context, userInfo) {
            context.commit('setUserInfo', userInfo);
        }
    },
    mutations: {
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        }
    }
};

export default basic;