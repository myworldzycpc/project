import {$body} from "../Init.js";
import {_speedTime} from "./Algorithm.js";

export function title(content, callback, timeIn = 500, timeDelay = 1000, timeOut = 500) {
    const $div = creatElement("div")
        .css({"text-align": "center", "z-index": maxZIndex++, "font-size": "2vw"})
        .addClass("divCenter")
        .html(content)
        .hide()
    $body.append($div);
    $div.fadeIn(_speedTime(timeIn), function () {
        setTimeout(function () {
            if (callback) {
                $div.fadeOut(_speedTime(timeOut), callback)
            } else {
                $div.fadeOut(_speedTime(timeOut))
            }
        }, _speedTime(timeDelay))
    })
}

export function creatElement(name) {
    return $(`<${name} />`);
}

/**
 * @param $element
 * @param {number} time
 */
export function slideAndFadeIn($element, time) {
    $element.hide().css({'opacity': '0'}).slideDown(_speedTime(time / 2), function () {
        $element.animate({"opacity": "1"}, _speedTime(time / 2))
    })
}

/**
 * @param $element
 * @param {number} time
 */
export function slideAndFadeOut($element, time) {
    $element.animate({"opacity": "0"}, _speedTime(time / 2), function () {
        $element.slideUp(_speedTime(time / 2), function () {
            $element.hide().css({'opacity': '1'})
        })
    })
}

export function clearObject(object) {
    for (const key in object) {
        delete object[key];
    }
}
