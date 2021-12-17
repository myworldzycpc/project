import {Button, Dialog} from "./gui/GuiScreen.js";
import {clearCookie} from "./Cookie.js";
import {storage} from "./Init.js";
import {clearObject, creatElement} from "./util/Opera.js";

export function showSettings() {
    const dialog$clearAll = new Dialog("", true);
    dialog$clearAll.$dialogBox.append(creatElement("span")
        .html("是否清空所有数据？")
        .css({
            "font-size": "3vw",
        })
    )
    dialog$clearAll.$dialogBox.append(creatElement("br"));
    const $divButtons = creatElement("div")
        .css({"text-align": "center"})
    const button$yes = new Button($divButtons, "确定", function () {
        clearObject(storage);
        dialog$clearAll.hide(function () {
            window.location.reload();
        })
    })
    const button$no = new Button($divButtons, "取消", function () {
        dialog$clearAll.hide()
    })
    dialog$clearAll.$dialogBox.append($divButtons);
    dialog$clearAll.show();
}