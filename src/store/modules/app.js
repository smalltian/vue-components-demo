
const app = {
    state: {
        appName: '健康有益',
    },
    mutations: {
        SET_APPNAME: (state, appName) => {
            state.appName = appName
        }
    },
    /**
     * 提交mutations行为，异步
     */
    actions: {
        setAppName({ commit }, appName) {
            commit('SET_APPNAME', appName)
        }
    },
    /**
     * 计算属性，派生state值
     */
    getters: {
        appName: state => {
            return state.appName;
        }
    }
}

export default app
