import {Badge, Button, Entry} from "./gui/util/GuiWidgets.js";
import {clearObject, creatElement} from "./util/Opera.js";
import {storage} from "./SavedData.js";
import {Dialog, DialogYesNo} from "./gui/util/GuiDialog.js";
import {screenData} from "./init/Init.js";
import {Floating} from "./gui/util/GuiFloating.js";
import {musics, sounds} from "./gui/util/Sound.js";

const dialog$clearAll = new DialogYesNo({
    content: "<span style='font-size: 60px'>是否清空所有数据？</span>",
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

// fixed: 此处出现问题，一直显示“开启”
const button$closeMusic = new Button({
    $parent: floating$settings.$floatingBox, content: storage.noMusic ? "开启音乐" : "关闭音乐", action: function () {
        storage.noMusic = !storage.noMusic;
        button$closeMusic.content = storage.noMusic ? "开启音乐" : "关闭音乐";
        for (const music of musics) {
            music.updateMuted()
        }
    }
})

floating$settings.$floatingBox.append(creatElement('br'));

// fixed: 此处出现问题，一直显示“开启”
const button$closeSound = new Button({
    $parent: floating$settings.$floatingBox, content: storage.noSound ? "开启声音" : "关闭声音", action: function () {
        storage.noSound = !storage.noSound;
        button$closeSound.content = storage.noSound ? "开启声音" : "关闭声音";
        for (const sound of sounds) {
            sound.updateMuted()
        }
    }
})

floating$settings.$floatingBox.append(creatElement('br'));

const badge$speed = new Badge({$parent: floating$settings.$floatingBox, content: "倍速："})

const dialogNotNumber = new Dialog({
    content: "<span style='font-size: 60px'>你输入的数字有误</span>",
    canBeClosed: true,
    color: [128, 128, 128],
});

const dialogTooBig = new Dialog({
    content: "<span style='font-size: 60px'>你输入的数字太大了，最大16</span>",
    canBeClosed: true,
    color: [128, 128, 128],
})

const dialogTooSmall = new Dialog({
    content: "<span style='font-size: 60px'>你输入的数字太小了，最小0.2</span>",
    canBeClosed: true,
    color: [128, 128, 128],
})

const dialogRestartGame = new DialogYesNo({
    content: "<span style='font-size: 60px'>需要重启游戏</span>",
    canBeClosed: false,
    color: [255, 101, 0],
    actionYes: function () {
        storage.speed = parseFloat(entry$speed.getValue());
        screenData.present.$screenBox.fadeOut(500, function () {
            window.location.reload();
        })
    },
    actionNo: function () {
        entry$speed.setValue(storage.speed)
    }
});

const entry$speed = new Entry({
    $parent: floating$settings.$floatingBox, content: storage.speed, action: function (entry) {
        const newSpeed = parseFloat(entry.getValue());
        if (isNaN(newSpeed)) {
            entry$speed.setValue(storage.speed)
            dialogNotNumber.show()
        } else if (newSpeed > 16) {
            entry$speed.setValue(storage.speed)
            dialogTooBig.show()
        } else if (newSpeed < 0.2) {
            entry$speed.setValue(storage.speed)
            dialogTooSmall.show()
        } else {
            dialogRestartGame.show()
        }
    }
})

export function showSettings() {
    floating$settings.show();
    // 更新按钮文本
    button$closeMusic.content = storage.noMusic ? "开启音乐" : "关闭音乐";
    button$closeSound.content = storage.noSound ? "开启声音" : "关闭声音";
}