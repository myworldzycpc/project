import {compare} from "../util/Algorithm.js";
import {Button, Dialog, Screen} from "./GuiScreen.js";
import {soundPlayer$nightClothes, storage} from "../Init.js";
import {begin, screen$beginOfAll} from "./GuiBeginOfAll.js";
import {screen$homeOfEarth} from "./GuiEarthHome.js";
import {showSettings} from "../Settings.js";
import {creatElement} from "../util/Opera.js";

export const screen$startGame = new Screen();

const $divStartGame = creatElement("div")
    .css({"text-align": "center"})
    .addClass("divCenter")
    .append(creatElement("span").html("星球发电").css({"font-size": "10vw"}))
    .append(creatElement('br'))
    .append(creatElement("span").html("Planetary Power Generation").css({"font-size": "2vw"}))
    .append(creatElement('br'))

const dialog$hasError = new Dialog("", true)
dialog$hasError.$dialogBox
    .css({"text-align": "center"})
    .html("出了一点错误，无法把你定位到目标行星")

const button$backToEarth = new Button(dialog$hasError.$dialogBox, "回到地球", function () {
    storage.screen = ["earth", 'home']
    dialog$hasError.hide(function () {
        button$startGame.click();
    })
})

const button$startGame = new Button($divStartGame, "开始游戏", function () {
    if (!storage.screen) {
        screen$beginOfAll.changeTo(function () {
            soundPlayer$nightClothes.play(0.2, undefined, undefined, true);
            begin();
        })
    } else if (compare(storage.screen, ["earth", 'home'])) {
        screen$homeOfEarth.changeTo(function () {
            soundPlayer$nightClothes.play(0.2, undefined, undefined, true);
        })
    } else {
        dialog$hasError.show();
    }

});

screen$startGame.addChildren(button$startGame);

const button$settings = new Button(screen$startGame.$screenBox, "设置", function () {
    showSettings()
})

button$settings.$button.css({
    "position": "fixed",
    "right": "0",
    "bottom": "0",
})

screen$startGame.addChildren(button$settings);

$divStartGame.append(creatElement('br'))
    .append(
        creatElement("div")
            .html("作者：myworldzycpc, TheRedMaker_")
            .css({
                "text-align": "right",
                "font-size": "1vw"
            })
    )
screen$startGame.$screenBox.append($divStartGame);

