import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import axios from 'axios'
//mint-ui组件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// toast插件
import toast from './plugins/toast'
//图片裁剪插件
import VueCropper from './plugins/vueCropper'

import { setPageTitle } from './utils/setPageTitle'


//错误提示
import './utils/errorLog'
//公用样式
import './styles/index.scss'

Vue.use(MintUI)
Vue.use(toast)
Vue.use(VueCropper)
Vue.config.productionTip = false

axios.default.withCredentials = true;


/**
 * 配置请求域名
 */
(function (para) {
    if (para === "https://healthai.jiankangyouyi.com") {
        Vue.prototype.BASEURL = "https://healthai.jiankangyouyi.com/health-ai-website";
    }  else {
        Vue.prototype.BASEURL = "https://healthai.hbox.jiankangyouyi.com/health-ai-website";
    }
})(location.hostname)

router.afterEach((transition) => {
    console.log(JSON.stringify(transition));
    let title = transition.meta.title;
    setPageTitle(title);
});



window.vm = new Vue({
    router,
    store,
    render: h => h(App),
    mounted() {
        console.log(this.BASEURL);
    }
}).$mount('#app')
