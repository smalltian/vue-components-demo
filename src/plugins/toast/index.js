import Vue from 'vue';

import Toast from './Toast.vue';

//扩展实例构造器
const ToastConstructor = Vue.extend(Toast);

/**
 * 显示toast
 * @param {*} msg 消息
 * @param {*} durition 时常
 */
function showToast(msg, duration = 2000) {

    //实例话 toast
    const toastDom = new ToastConstructor({
        el: document.createElement('div'),
        data() {
            return {
                msg: msg,
                show: true,
                animateClass: ''
            }
        }
    });

    //把实例添加到body中
    document.body.appendChild(toastDom.$el);
    toastDom.animateClass = 'fadeInDown';

    //隐藏
    setTimeout(() => {
        toastDom.animateClass = 'fadeOutDown'
        setTimeout(() => {
            toastDom.show = false;
        },1000);
    }, duration);
}

/**
 * 注册全局组件
 */
function registerToast() {
    Vue.prototype.$toast = showToast;
}

export default registerToast;