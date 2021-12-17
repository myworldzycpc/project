import * as Init from "./Init.js";
import * as Cookie from "./Cookie.js"
import * as GuiStartGame from "./gui/GuiStartGame.js";
import "./gui/Screens.js";

window.Init = Init;
window.Cookie = Cookie;

function main() {
    GuiStartGame.screen$startGame.changeTo();
}

$(function () {
    main();
});