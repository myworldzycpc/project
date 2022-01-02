import * as Init from "./init/Init.js";
import * as Cookie from "./Cookie.js"
import * as GuiStartGame from "./gui/GuiStartGame.js";

window.Init = Init;
window.Cookie = Cookie;

function main() {
    Init.Init();
    GuiStartGame.screen$startGame.changeTo();
}

$(function () {
    main();
    try {
    } catch (err) {
        let txt = "出现了一个错误。\n";
        txt += "错误描述：" + err.message + "\n";
        alert(txt);
    }

});