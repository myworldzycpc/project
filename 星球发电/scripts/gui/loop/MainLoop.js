import * as Cookie from "../../Cookie.js";
import {storage} from "../../SavedData.js";
import {screenData, tickTasks} from "../../init/Init.js";
import {debugInfo} from "../../Debug.js";

export function mainLoop() {
    Cookie.setCookie("data", btoa(JSON.stringify(storage)));
    tickTasks.forEach(tickTask$item => {
        tickTask$item.trigger();
    });
    debugInfo(screenData.dialogLevel);
}