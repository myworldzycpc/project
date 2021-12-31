import * as Cookie from "../Cookie.js"
import {SoundPlayer} from "../gui/util/GuiBase.js";
import {creatElement} from "../util/Opera.js";
import {_speedTime} from "../util/Algorithm.js";
import {storage} from "../SavedData.js";
import {AdditionalManager} from "./additional/AdditionalManager.js";


export const screenData = {
    present: undefined,
    all: [],
}

export const tickTasks = [];


export const gui = {}

export const $body = $("body");
export const $background = creatElement("div");
$background.addClass("background");
$body.append($background);

export const soundPlayer$bigstar = new SoundPlayer("static/sounds/bigstar.mp3", 0.3)
export const soundPlayer$nightClothes = new SoundPlayer("static/sounds/夜行衣.mp3")
export const soundPlayer$planetPower = new SoundPlayer("static/sounds/一开始的新闻（新版）.mp3")
export const soundPlayer$button = new SoundPlayer("static/sounds/button.mp3", 0.1)
export const soundPlayer$success = new SoundPlayer("static/sounds/success.mp3")

export function Init() {
    AdditionalManager();
    window.maxZIndex = 10;
    setInterval(function () {
        Cookie.setCookie("data", btoa(JSON.stringify(storage)));
        tickTasks.forEach(tickTask$item => {
            tickTask$item.trigger();
        });

    }, 50);
}
