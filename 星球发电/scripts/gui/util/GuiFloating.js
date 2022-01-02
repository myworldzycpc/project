import {creatElement} from "../../util/Opera.js";
import {$body, screenData} from "../../init/Init.js";
import {GuiBase} from "./GuiBase.js";
import {debugInfo} from "../../Debug.js";

/**
 * 此类可以实现一个悬浮屏幕，不计入{@link screenData.present present}，用于星图或设置等，类名{@link Floating}继承{@link GuiBase}，用show()和hide()，类似于{@link Dialog}但是是全屏的。
 * @todo
 */
export class Floating extends GuiBase {

    constructor(options = {}) {
        super();
        const floating$this = this;
        floating$this.$floatingBox = creatElement("div");
        $body.append(floating$this.$floatingBox);
        floating$this.$floatingBox.css({
            "position": "fixed",
            "height": "100%",
            "width": "100%",
            "background-color": "rgba(0, 0, 0, 0.5)",
        });
        floating$this.$floatingBox.hide();
    }

    show(callback) {
        const floating$this = this;
        screenData.dialogLevel++;
        floating$this.callback = callback;
        floating$this.$floatingBox.css({"z-index": maxZIndex++}).fadeIn(200, function () {

        });

    }

    hide(callback) {
        const floating$this = this;
        if (callback) {
            floating$this.callback = callback;
        }
        floating$this.$floatingBox.fadeOut(200, function () {
            screenData.dialogLevel--;
            if (floating$this.callback) {
                floating$this.callback();
            }
        });
    }

    destroy() {
        // todo
    }
}