import * as Cookie from "./Cookie.js"
import {getCookie} from "./Cookie.js"
import {SoundPlayer} from "./gui/GuiScreen.js";
import {creatElement} from "./util/Opera.js";
import {_speedTime} from "./util/Algorithm.js";

window.maxZIndex = 10;

export const screenData = {
    present: undefined,
    all: [],
}

export const storage = Cookie.getCookie("data") ? JSON.parse(atob(getCookie("data"))) : {};
storage.screen = storage.screen || undefined;
storage.money = storage.money || 0;
storage.time = storage.time || new Date(2125, 10, 1, 10, 30, 0).getTime();
storage.prestige = storage.prestige || 100;

export const tickTasks = [];

setInterval(function () {
    Cookie.setCookie("data", btoa(JSON.stringify(storage)));
    tickTasks.forEach(tickTask$item => {
        tickTask$item.trigger();
    });

}, _speedTime(50));

export const gui = {}

export const $body = $("body");
export const $background = creatElement("div");
$background.addClass("background");
$body.append($background);

export const soundPlayer$bigstar = new SoundPlayer("static/sounds/bigstar.mp3")
export const soundPlayer$nightClothes = new SoundPlayer("static/sounds/夜行衣.mp3")
export const soundPlayer$planetPower = new SoundPlayer("static/sounds/一开始的新闻（新版）.mp3")
