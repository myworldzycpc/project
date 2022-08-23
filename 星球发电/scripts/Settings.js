import {Button, Entry} from "./gui/util/GuiOther.js";
import {clearCookie} from "./Cookie.js";
import {clearObject, creatElement} from "./util/Opera.js";
import {storage} from "./SavedData.js";
import {Dialog, DialogYesNo} from "./gui/util/GuiDialog.js";
import {screenData} from "./init/Init.js";
import {Floating} from "./gui/util/GuiFloating.js";

const dialog$clearAll = new DialogYesNo({
    content: "<span style='font-size: 3vw'>是否清空所有数据？</span>",
    canBeClosed: true,
    color: [255, 101, 0],
    actionYes: function () {
        clearObject(storage);
        screenData.present.$screenBox.fadeOut(500, function () {
            window.location.reload();
        })
    }
});

const floating$settings = new Floating({canBeClosed: true});
const button$clearAll = new Button({
    $parent: floating$settings.$floatingBox, content: "清空所有数据", action: function () {
        dialog$clearAll.show();
    }
})

floating$settings.$floatingBox.append(creatElement('br'));

const button$closeMusic = new Button({
    $parent: floating$settings.$floatingBox, content: "关闭音乐", action: function () {
    }
})

floating$settings.$floatingBox.append(creatElement('br'));

const button$closeSound = new Button({
    $parent: floating$settings.$floatingBox, content: "关闭声音", action: function () {
    }
})

floating$settings.$floatingBox.append(creatElement('br'));

const entry$speed = new Entry({
    $parent: floating$settings.$floatingBox, content: "2", action: function () {
    }
})

export function showSettings() {
    floating$settings.show();
}