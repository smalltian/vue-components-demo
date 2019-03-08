import axios from 'axios';
import Vue from 'vue'
import { Toast } from 'mint-ui';


/**
 * 请求数据封装
 * @param url 请求地址
 * @param type 请求类型
 * @param params 请求参数
 */
export default async (url = "", type = "POST", params = {}) => {
    let response = await axios({
        url: Vue.prototype.BASEURL + url,
        method: type,
        data: JSON.stringify(params),
        headers: {
            'Content-Type': "application/json",
        },
        xhrFields: { withCredentials: true },

        dataType: "json"
    });
    console.log(JSON.stringify(response));
    if (response.status == 200) {
        let data = response.data;
        if (data.retCode != 'SUCCESS') {
            // Toast(data.retCode + data.retInfo);
            vm.$toast(data.retCode + data.retInfo);
        } else {
            return data;
        }
    } else {
        Toast(response.status + ":" + response.statusText)
    }

}