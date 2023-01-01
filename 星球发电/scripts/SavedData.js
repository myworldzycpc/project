import * as Cookie from "./Cookie.js";
import {getCookie} from "./Cookie.js";

export const storage = {};

export function initStorage() {
    const storageJSON = Cookie.getCookie("data") ? JSON.parse(atob(getCookie("data"))) : {}
    storage.screen = storageJSON.screen || undefined;
    storage.money = storageJSON.money || 0;
    storage.time = storageJSON.time || new Date(2125, 10, 1, 10, 30, 0).getTime();
    storage.prestige = storageJSON.prestige || 100;
    storage.speed = (storageJSON.speed || 1.0).clamp(0.2, 16);
    storage.noMusic = storageJSON.noMusic || false;
    storage.noSound = storageJSON.noSound || false;
}