import {calculatedSpeedTime} from "../../util/Algorithm.js";

export function WindowRewriter() {
    window._setInterval = window.setInterval;
    window.setInterval = function (handler, timeout, ...args) {
        return window._setInterval(handler, calculatedSpeedTime(timeout), ...args);
    }

    window._setTimeout = window.setTimeout;
    window.setTimeout = function (handler, timeout, ...args) {
        window._setTimeout(handler, calculatedSpeedTime(timeout), ...args);
    }
}