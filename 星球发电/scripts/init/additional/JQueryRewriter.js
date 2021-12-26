import {_speedTime} from "../../util/Algorithm.js";
import {_speed} from "../../util/Algorithm.js";

export function JQueryRewriter() {
    $.prototype._fadeOut = $.prototype.fadeOut;
    /**
     *
     * @param {number}time
     * @param args
     */
    $.prototype.fadeOut = function (time, ...args) {
        const $this = this;
        return $this._fadeOut(_speedTime(time), ...args);
    }

    $.prototype._fadeIn = $.prototype.fadeIn;
    /**
     *
     * @param {number}time
     * @param args
     */
    $.prototype.fadeIn = function (time, ...args) {
        const $this = this;
        return $this._fadeIn(_speedTime(time), ...args);
    }

    $.prototype._slideUp = $.prototype.slideUp;
    /**
     *
     * @param {number}time
     * @param args
     */
    $.prototype.slideUp = function (time, ...args) {
        const $this = this;
        return $this._slideUp(_speedTime(time), ...args);
    }

    $.prototype._slideDown = $.prototype.slideDown;
    /**
     *
     * @param {number}time
     * @param args
     */
    $.prototype.slideDown = function (time, ...args) {
        const $this = this;
        return $this._slideDown(_speedTime(time), ...args);
    }

    $.prototype._animate = $.prototype.animate;
    /**
     * 请用{@link _speedTime _speedTime()}函数封装你的css中的transition属性
     * @param prop
     * @param {number}speed
     * @param args
     */
    $.prototype.animate = function (prop, speed, ...args) {
        const $this = this;
        return $this._animate(prop, _speedTime(speed), ...args);

    }
}
