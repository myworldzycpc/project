import * as Reference from "../Reference.js";

export function _speedTime(time) {
    return time / Reference.TIME_SPEED;
}

/**
 * @param {number} speed
 * @return number
 */
export function _speed(speed) {
    return speed * Reference.TIME_SPEED;
}

/**
 *
 * @param a1
 * @param a2
 * @return {boolean}
 */
export function compare(a1, a2) {
    return JSON.stringify(a1) === JSON.stringify(a2);
}

Date.prototype.format = function (format) {
    const o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    const week = {
        "0": "一",
        "1": "二",
        "2": "三",
        "3": "四",
        "4": "五",
        "5": "六",
        "6": "日"
    };
    if (/(E+)/.test(format)) {
        format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期" : "周") : "") + week[this.getDay() + ""]);
    }

    for (const k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}