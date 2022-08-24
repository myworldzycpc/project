import * as Cookie from "./Cookie.js";
import {getCookie} from "./Cookie.js";

export const storage = Cookie.getCookie("data") ? JSON.parse(atob(getCookie("data"))) : {};
storage.screen = storage.screen || undefined;
storage.money = storage.money || 0;
storage.time = storage.time || new Date(2125, 10, 1, 10, 30, 0).getTime();
storage.prestige = storage.prestige || 100;
storage.speed = storage.speed || 1.0;
storage.noMusic = storage.speed || false;
storage.noSound = storage.speed || false;
