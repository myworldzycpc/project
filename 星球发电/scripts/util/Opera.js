import {$body} from "../init/Init.js";
import {calculatedSpeedTime} from "./Algorithm.js";

export function title(content, callback, timeIn = 500, timeDelay = 1000, timeOut = 500) {
    const $div = creatElement("div")
        .css({"text-align": "center", "z-index": maxZIndex++, "font-size": "40px"})
        .css({
            "position": "fixed",
            "left": "50%",
            "top": "50%",
            "transform": "translate(-50%, -50%)",
        })
        .html(content)
        .hide()
    $body.append($div);
    $div.fadeIn(timeIn, function () {
        setTimeout(function () {
            if (callback) {
                $div.fadeOut(timeOut, callback)
            } else {
                $div.fadeOut(timeOut)
            }
        }, timeDelay)
    })
}

/**
 *
 * @param name 元素标签名称
 * @return {jQuery|*}
 */
export function creatElement(name) {
    return $(`<${name} />`);
}

export function clearObject(object) {
    for (const key in object) {
        delete object[key];
    }
}
