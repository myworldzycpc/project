import { creatElement } from "../util/Opera.js";
import { AdditionalManager } from "./additional/AdditionalManager.js";
import { mainLoop } from "./loop/MainLoop.js";
import { initStorage } from "../SavedData.js";
import { initSounds, updateMutedAll } from "../gui/util/Sound.js";

/**
 *
 * @todo 记得 2022 1 21 晚上我们来玩Minecraft
 */
export const screenData = {
    dialogLevel: 0, // fixme: 出现多次hide
    present: undefined,
    all: [],
}

export const tickTasks = [];

export const ZIndexes = [];

export const gui = {}

export const $body = $("body");
export const $background = creatElement("div");
$background.addClass("background");
$body.append($background);

export function Init() {
    AdditionalManager();
    initStorage();
    initSounds();
    updateMutedAll();
    window.maxZIndex = 10;
    setInterval(function () {
        mainLoop();

    }, 50);
}
