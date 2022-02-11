import {creatElement} from "../../util/Opera.js";
import {$body, screenData} from "../../init/Init.js";
import {GuiBase} from "./GuiBase.js";
import {debugInfo} from "../../Debug.js";

/**
 * 此类可以实现一个悬浮屏幕，不计入{@link screenData.present present}，用于星图或设置等，类名{@link Floating}继承{@link GuiBase}，用{@link Floating.show show()}和{@link Floating.hide hide()}，类似于{@link Dialog}但是是全屏的。
 * @todo 按esc关闭
 */
export class Floating extends GuiBase {

    /**
     * @param {*}options
     * @param {boolean}options.canBeClosed 此Floating是否可以被关闭（通过按esc关闭，即使为false也可以通过hide()方法关闭。
     */
    constructor(options = {}) {
        super();
        const floating$this = this;
        options = $.extend({content: "", canBeClosed: false, color: [0, 0, 255]}, options);
        floating$this.canBeClosed = options.canBeClosed;
        floating$this.$floatingBox = creatElement("div");
        $body.append(floating$this.$floatingBox);
        floating$this.$floatingBox.css({
            "position": "fixed",
            "height": "100%",
            "width": "100%",
            "background-color": "rgba(0, 0, 0, 0.5)",
        });
        floating$this.$floatingBox.hide();
        floating$this.update();
    }

    /**
     * 显示这个{@link Floating}
     * @param callback
     */
    show(callback) {
        const floating$this = this;
        screenData.dialogLevel++;
        floating$this.callback = callback;
        floating$this.$floatingBox.css({"z-index": maxZIndex++}).fadeIn(200, function () {

        });
        if (floating$this.canBeClosed) {
            $body.keydown(function (event) {
                if (event.keyCode === 27) {
                    floating$this.hide();
                    $body.unbind("keydown");
                }
            });
        } else {
            $body.unbind("keydown");
        }

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

    update() {
        // todo
        const floating$this = this;
        if (floating$this.canBeClosed) {
            $body.keydown(function (event) {
                if (event.keyCode === 27) {
                    floating$this.hide();
                    $body.unbind("keydown");
                }
            });
        } else {
            $body.unbind("keydown");
        }
    }
}