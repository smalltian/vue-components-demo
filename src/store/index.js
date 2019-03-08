import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'

Vue.use(Vuex);

const store = new Vuex.Store({
    //模块化store，每个模块有自己的 state，mutation，action，getter
    modules: {
        app,
    },
})

export default store;