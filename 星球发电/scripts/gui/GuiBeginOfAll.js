import {soundPlayer$nightClothes, soundPlayer$planetPower} from "../init/Init.js";
import {_speedTime} from "../util/Algorithm.js";
import {LONG_CONTENTS} from "../Reference.js";
import {screen$homeOfEarth} from "./GuiEarthHome.js";
import {title} from "../util/Opera.js";
import {storage} from "../SavedData.js";
import {Dialog} from "./util/GuiDialog.js";
import {Screen} from "./util/GuiScreen.js";

export const screen$beginOfAll = new Screen();

const dialog$television = new Dialog({content: LONG_CONTENTS.newsOfStart, canBeClosed: false})
dialog$television.$dialogBox.css({"font-size": "1.5vw"});

export function begin() {
    title("一切的开始<br>故事发生在2125年10月1日<br><span style='font-size: 1vw; line-height: 2vw'>（此故事纯属虚构）</span>", function () {
        setTimeout(function () {
            title("又是寻常的一天", function () {
                setTimeout(function () {
                    title("电视上传来了声音...", function () {
                        dialog$television.canBeClosed = false;
                        dialog$television.show();
                        soundPlayer$planetPower.play(undefined, undefined, undefined, undefined, function () {
                            dialog$television.callback = function () {
                                storage.screen = ["earth", "home"]
                                screen$homeOfEarth.changeTo();
                            }
                            dialog$television.canBeClosed = true;
                            dialog$television.update()
                        });
                    }, 1000, 2000, 1000)
                }, 2000)
            }, 1000, 2000, 1000,)
        }, 2000)
    }, undefined, 2000, undefined)
}