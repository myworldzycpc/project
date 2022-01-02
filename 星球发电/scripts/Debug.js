import {DEBUG_MODE} from "./Reference.js";

export function debugInfo(...data) {
    if (DEBUG_MODE) {
        console.log(...data);
    }
}