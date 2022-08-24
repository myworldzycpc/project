import {calculatedSpeedTime} from "../../util/Algorithm.js";
import {calculatedSpeed} from "../../util/Algorithm.js";

export function JQueryRewriter() {
    $.prototype._fadeOut = $.prototype.fadeOut;
    /**
     *
     * @param {number}time
     * @param args
     */
    $.prototype.fadeOut = function (time, ...args) {
        const $this = this;
        return $this._fadeOut(calculatedSpeedTime(time), ...args);
    }

    $.prototype._fadeIn = $.prototype.fadeIn;
    /**
     *
     * @param {number}time
     * @param args
     */
    $.prototype.fadeIn = function (time, ...args) {
        const $this = this;
        return $this._fadeIn(calculatedSpeedTime(time), ...args);
    }

    $.prototype._slideUp = $.prototype.slideUp;
    /**
     *
     * @param {number}time
     * @param args
     */
    $.prototype.slideUp = function (time, ...args) {
        const $this = this;
        return $this._slideUp(calculatedSpeedTime(time), ...args);
    }

    $.prototype._slideDown = $.prototype.slideDown;
    /**
     *
     * @param {number}time
     * @param args
     */
    $.prototype.slideDown = function (time, ...args) {
        const $this = this;
        return $this._slideDown(calculatedSpeedTime(time), ...args);
    }

    $.prototype._animate = $.prototype.animate;
    /**
     * 请用{@link calculatedSpeedTime _speedTime()}函数封装你的css中的transition属性
     * @param prop
     * @param {number}speed
     * @param args
     */
    $.prototype.animate = function (prop, speed, ...args) {
        const $this = this;
        return $this._animate(prop, calculatedSpeedTime(speed), ...args);

    }
}
