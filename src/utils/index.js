/**
 * 是否被10整除
 * @param {*} number 
 */
const isTenMutiple = (number) => {
    let isTen = number % 10;
    if (isTen === 0) {
        return true;
    } else {
        return false;
    }
}

/**
 * 判断是否为空
 */
const isEmpty = (keys) => {
    if (typeof keys === "string") {
        keys = keys.replace(/\"|&nbsp;|\\/g, '').replace(/(^\s*)|(\s*$)/g, "");
        if (keys == "" || keys == null || keys == "null" || keys === "undefined") {
            return true;
        } else {
            return false;
        }
    } else if (typeof keys === "undefined") { // 未定义
        return true;
    } else if (typeof keys === "number") {
        return false;
    } else if (typeof keys === "boolean") {
        return false;
    } else if (typeof keys == "object") {
        if (JSON.stringify(keys) == "{}") {
            return true;
        } else if (keys == null) { // null
            return true;
        } else {
            return false;
        }
    }
    if (keys instanceof Array && keys.length == 0) { // 数组
        return true;
    }
}

/**
 * 获取字符串长度
 * @param {*} str
 */
const getSLen = value => {
    let str = value.toString();
    let cArr = str.match(/[^\x00-\xff]/ig);
    return str.length + (cArr == null ? 0 : cArr.length);
}

/**
 * 删除数组第一个元素
 * @param {*} arr 
 */
const delArr = (arr) => {
    arr.shift();
    return arr;
}


export {
    isTenMutiple,
    isEmpty,
    getSLen,
    delArr
}