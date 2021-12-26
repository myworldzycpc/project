import {Button} from "./gui/util/GuiScreen.js";
import {clearCookie} from "./Cookie.js";
import {clearObject, creatElement} from "./util/Opera.js";
import {storage} from "./SavedData.js";
import {Dialog} from "./gui/util/GuiDialog.js";

export function showSettings() {
    const dialog$clearAll = new Dialog({content: "", canBeClosed: true, color: [255, 101, 0]});
    dialog$clearAll.$dialogBox.append(creatElement("span")
        .html("是否清空所有数据？")
        .css({
            "font-size": "3vw",
        })
    )
    dialog$clearAll.$dialogBox.append(creatElement("br"));
    const $divButtons = creatElement("div")
        .css({"text-align": "center"})
    const button$yes = new Button({
        $parent: $divButtons, content: "确定", action: function () {
            clearObject(storage);
            dialog$clearAll.hide(function () {
                window.location.reload();
            })
        }
    })
    const button$no = new Button({
        $parent: $divButtons, content: "取消", color: [127, 127, 127], action: function () {
            dialog$clearAll.hide()
        }
    })
    dialog$clearAll.$dialogBox.append($divButtons);
    dialog$clearAll.show();
}