import {JQueryRewriter} from "./JQueryRewriter.js";
import {JQuerySticker} from "./JQuerySticker.js";
import {WindowRewriter} from "./WindowRewriter.js";


export function AdditionalManager() {
    JQueryRewriter();
    JQuerySticker();
    WindowRewriter();
}