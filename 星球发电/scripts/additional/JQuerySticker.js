import {_speedTime} from "../util/Algorithm.js";

/**
 * @param {number} time
 */
$.prototype.slideAndFadeIn = function (time) {
    const $this = this;
    $this.hide().css({'opacity': '0'}).slideDown(time / 2, function () {
        $this.animate({"opacity": "1"}, time / 2)
    })
}

/**
 * @param {number} time
 */
$.prototype.slideAndFadeOut = function (time) {
    const $this = this;
    $this.animate({"opacity": "0"}, time / 2, function () {
        $this.slideUp(time / 2, function () {
            $this.hide().css({'opacity': '1'})
        })
    })
}

