import {clearObject, creatElement} from "../../util/Opera.js";
import {$body, screenData} from "../../init/Init.js";
import {Button} from "./GuiOther.js";
import {storage} from "../../SavedData.js";
import {debugInfo} from "../../Debug.js";
import {GuiBase} from "./GuiBase.js";

/**
 * 此类可以实现一个居中悬浮的对话框。
 */
export class Dialog extends GuiBase {
    /**
     *
     * @param {*|{content: string, canBeClosed: boolean, color: number[]}}options
     * @param options.content 对话框显示的内容
     * @param options.canBeClosed 此对话框是否可以被关闭（通过点击空白处关闭，即使为false也可以通过{@link hide hide()}方法关闭。
     */
    constructor(options = {}) {
        super();
        //content = "", canBeClosed = false
        const dialog$this = this;
        options = $.extend({content: "", canBeClosed: false, color: [0, 0, 255]}, options);

        dialog$this.color = options.color;
        dialog$this.$dialogBox = creatElement("div")
        dialog$this.$dialogBoxBackground = creatElement("div")
        dialog$this.$dialogBoxContinue = creatElement("div")
            .css({"font-size": "2vw", "text-align": "center", "line-height": "10vw"})
            .html("点击空白处继续...")
            .hide()
        dialog$this.#updateStyle();
        dialog$this.$dialogBoxBackground.addClass("dialogBoxBackground");
        dialog$this.$dialogBox.html(options.content);
        dialog$this.$divCenter = creatElement("div")
            .append(dialog$this.$dialogBox)
            .append(dialog$this.$dialogBoxContinue)
            .addClass("divCenter")
        dialog$this.canBeClosed = options.canBeClosed;
        $body.append(dialog$this.$dialogBoxBackground);
        $body.append(dialog$this.$divCenter);
        dialog$this.$dialogBoxBackground.hide();
        dialog$this.$divCenter.hide()
    };

    show(callback) {
        const dialog$this = this;
        screenData.dialogLevel++;
        dialog$this.callback = callback;
        dialog$this.$dialogBoxBackground.css({"z-index": maxZIndex++}).fadeIn(200, function () {
            dialog$this.$divCenter.css({"z-index": maxZIndex++}).fadeIn(200, function () {
                dialog$this.update()
            });
        });
    };

    hide(callback) {
        const dialog$this = this;
        if (callback) {
            dialog$this.callback = callback;
        }
        dialog$this.$divCenter.fadeOut(200, function () {
            dialog$this.$dialogBoxBackground.fadeOut(200, function () {
                dialog$this.$dialogBoxContinue.hide()
                debugInfo("hide")
                screenData.dialogLevel--;
                if (dialog$this.callback) {
                    dialog$this.callback();
                }
            });
        });
    }

    update() {
        const dialog$this = this;
        if (dialog$this.canBeClosed) {
            if (dialog$this.$dialogBoxContinue.is(":hidden")) {
                dialog$this.$dialogBoxContinue.slideAndFadeIn(500);
            }
            dialog$this.$dialogBoxBackground.click(function () {
                dialog$this.hide();
            })
            dialog$this.$dialogBoxContinue.click(function () {
                dialog$this.hide();
            })
        } else {
            if (dialog$this.$dialogBoxContinue.is(":visible")) {
                dialog$this.$dialogBoxContinue.slideAndFadeOut(500);
            }
            dialog$this.$dialogBoxContinue.unbind("click");
            dialog$this.$dialogBoxBackground.unbind("click");
        }

    }

    #updateStyle() {
        const dialog$this = this;
        const color = dialog$this.color;
        dialog$this.styles = {
            "padding": "5vw",
            "border-radius": "5vw",
            "background-color": `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
            "color": "white",
            "font-size": "2vw",
            "box-shadow": `1vw 1vw 1vw rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.5)`,
        }
        dialog$this.$dialogBox.css(dialog$this.styles);

    }

    changeColor(color) {
        const button$this = this;
        button$this.color = color;
        button$this.#updateStyle();
    }

}

export class DialogYesNo extends Dialog {
    /**
     *
     * @param {*|{content: string, canBeClosed: boolean, color: number[], actionYes: function|undefined, actionNo: function|undefined}}options
     */
    constructor(options = {}) {
        const content = options.content;
        options.content = "";

        super(options);

        const dialog$this = this;
        dialog$this.$dialogBox.append(creatElement("span").html(content))
        dialog$this.$dialogBox.append(creatElement("br"));
        const $divButtons = creatElement("div")
            .css({"text-align": "center"})
        const button$yes = new Button({
            $parent: $divButtons, content: "确定", action: function () {
                dialog$this.hide(function () {
                    if (options.actionYes) {
                        options.actionYes();
                    }
                })
            }
        })
        const button$no = new Button({
            $parent: $divButtons, content: "取消", color: [127, 127, 127], action: function () {
                dialog$this.hide()
                if (options.actionNo) {
                    options.actionNo();
                }
            }
        })
        dialog$this.$dialogBox.append($divButtons);
    }
}