import {_speedTime} from "../../util/Algorithm.js";

export function WindowRewriter() {
    window._setInterval = window.setInterval;
    window.setInterval = function (handler, timeout, ...args) {
        return window._setInterval(handler, _speedTime(timeout), ...args);
    }

    window._setTimeout = window.setTimeout;
    window.setTimeout = function (handler, timeout, ...args) {
        window._setTimeout(handler, _speedTime(timeout), ...args);
    }
}