import axiosRequest from '@/utils/request';

/**
 * 登陆
 */
export const requestLoginByName = (userName, password) => {
    let params = {
        "userName": userName,
        "password": password
    }
    return axiosRequest("/manage/login.do", "POST", params);
}

/**
 * 账户交易金额统计API
 * @param {*} startTime 开始时间
 * @param {*} endTime 结束时间
 */
export const requestAccountTrade = (startTime, endTime) => {
    var params = {
        "startTime": startTime,
        "endTime": endTime
    }
    return axiosRequest("/manage/account/statistics/trade/query.do", "POST", params);
}