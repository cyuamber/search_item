const Utils = {};

/**
 * 从url中获取参数值
 * @param {string} 参数名
 * @return {string} 参数值
 */
Utils.getQueryString = (name) =>  {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return '';
}

export default Utils;