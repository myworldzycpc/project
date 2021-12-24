import * as Cookie from "./Cookie.js"
import {SoundPlayer} from "./gui/GuiScreen.js";
import {creatElement} from "./util/Opera.js";
import {_speedTime} from "./util/Algorithm.js";
import {storage} from "./SavedData.js";

window.maxZIndex = 10;

export const screenData = {
    present: undefined,
    all: [],
}

export const tickTasks = [];

setInterval(function () {
    Cookie.setCookie("data", btoa(JSON.stringify(storage)));
    tickTasks.forEach(tickTask$item => {
        tickTask$item.trigger();
    });

}, 50);

export const gui = {}

export const $body = $("body");
export const $background = creatElement("div");
$background.addClass("background");
$body.append($background);

export const soundPlayer$bigstar = new SoundPlayer("static/sounds/bigstar.mp3")
export const soundPlayer$nightClothes = new SoundPlayer("static/sounds/夜行衣.mp3")
export const soundPlayer$planetPower = new SoundPlayer("static/sounds/一开始的新闻（新版）.mp3")
