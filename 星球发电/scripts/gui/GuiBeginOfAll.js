import {calculatedSpeedTime} from "../util/Algorithm.js";
import {LONG_CONTENTS} from "../Reference.js";
import {screen$homeOfEarth} from "./GuiEarthHome.js";
import {title} from "../util/Opera.js";
import {storage} from "../SavedData.js";
import {Dialog} from "./util/GuiDialog.js";
import {Screen} from "./util/GuiScreen.js";
import {soundPlayer$nightClothes, soundPlayer$planetPower} from "./util/Sound.js";

export const screen$beginOfAll = new Screen();

const dialog$television = new Dialog({content: LONG_CONTENTS.newsOfStart, canBeClosed: false})
dialog$television.$dialogBox.css({"font-size": "30px"});

export function begin() {
    title("一切的开始<br>故事发生在2125年10月1日<br><span style='font-size: 20px; line-height: 40px'>（此故事纯属虚构）</span>", function () {
        setTimeout(function () {
            title("又是寻常的一天", function () {
                setTimeout(function () {
                    title("电视上传来了声音...", function () {
                        dialog$television.canBeClosed = false;
                        dialog$television.show();
                        dialog$television.callback = function () {
                            storage.screen = ["earth", "home"]
                            screen$homeOfEarth.changeTo();
                            soundPlayer$planetPower.stop()
                        }
                        dialog$television.canBeClosed = true;
                        dialog$television.update()
                        soundPlayer$planetPower.play(undefined, undefined, undefined, undefined, undefined);
                    }, 1000, 2000, 1000)
                }, 2000)
            }, 1000, 2000, 1000,)
        }, 2000)
    }, undefined, 2000, undefined)
}