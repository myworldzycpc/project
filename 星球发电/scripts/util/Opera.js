import {$body} from "../Init.js";
import {_speedTime} from "./Algorithm.js";

export function title(content, callback, timeIn = 500, timeDelay = 1000, timeOut = 500) {
    const $div = creatElement("div")
        .css({"text-align": "center", "z-index": maxZIndex++, "font-size": "2vw"})
        .addClass("divCenter")
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

export function creatElement(name) {
    return $(`<${name} />`);
}
export function clearObject(object) {
    for (const key in object) {
        delete object[key];
    }
}
