
/**
 * 设置标题
 * @param {*} title 
 */
const setPageTitle = (title) => {
    document.title = title;
    // 如果是 iOS 设备，则使用如下 hack 的写法实现页面标题的更新
    if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        const hackIframe = document.createElement('iframe');
        hackIframe.style.display = 'none';
        hackIframe.src = '../templete/title.html?r=' + Math.random();
        document.body.appendChild(hackIframe);
        setTimeout(_ => {
            document.body.removeChild(hackIframe)
        }, 300)
    }
}

export {
    setPageTitle
}