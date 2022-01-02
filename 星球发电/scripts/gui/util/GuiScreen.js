import {creatElement} from "../../util/Opera.js";
import {$body, screenData, tickTasks} from "../../init/Init.js";
import {showTasks} from "../../task/TaskManager.js";
import {showSettings} from "../../Settings.js";
import {TickTask} from "../../Tick.js";
import {storage} from "../../SavedData.js";
import {Button} from "./GuiOther.js";
import {GuiBase} from "./GuiBase.js";

export class Screen extends GuiBase {
    constructor() {
        super();
        const screen$this = this;
        screen$this.$screenBox = creatElement("div");
        $body.append(screen$this.$screenBox);
        screen$this.children = [];
        screen$this.$screenBox.addClass("screenBox");
        screen$this.$screenBox.hide();
        screenData.all.push(screen$this);
    };

    changeTo(callback) {
        const screen$this = this;
        if (screenData.present) {
            screenData.present.$screenBox.fadeOut(500, function () {
                screen$this.$screenBox.css({"z-index": maxZIndex++}).fadeIn(500, function () {
                    if (callback) {
                        callback()
                    }
                });
            })
            screenData.present = screen$this;
        } else {
            screen$this.$screenBox.css({"z-index": maxZIndex++}).fadeIn(500, function () {
                if (callback) {
                    callback()
                }
            });
            screenData.present = screen$this;
        }
    }

    addChildren($$children) {
        const screen$this = this;
        screen$this.children.push($$children);
    }
}

export class ScreenMap extends Screen {

    constructor() {
        super();
        const screenMap$this = this;
        screenMap$this.name = undefined;

        const $topLeft = creatElement("div").css({
            "position": "fixed",
            "top": "0",
            "left": "0"
        })
        const button$task = new Button({
            $parent: $topLeft, content: "任务", action: function () {
                showTasks();
            }
        })
        $topLeft.append(creatElement('br'));
        const button$personnelMatters = new Button({$parent: $topLeft, content: "人事"})
        $topLeft.append(creatElement('br'));
        const button$technology = new Button({$parent: $topLeft, content: "技术"})

        const $bottomLeft = creatElement("div").css({
            "position": "fixed",
            "bottom": "0",
            "left": "0"
        })
        const button$store = new Button({$parent: $bottomLeft, content: "商店"})
        const $bottomRight = creatElement("div").css({
            "position": "fixed",
            "bottom": "0",
            "right": "0"
        })

        const button$construct = new Button({$parent: $bottomLeft, content: "建设"})
        const button$celestialMap = new Button({$parent: $bottomRight, content: "星图"})
        const button$setting = new Button({
            $parent: $bottomRight, content: "设置", action: function () {
                showSettings()
            }
        })

        const $topRight = creatElement("div").css({
            "position": "fixed",
            "top": "0",
            "right": "0"
        })
        screenMap$this.$infos = creatElement("span").css({
            "padding": "1vw",
            "border-radius": "1vw",
            "background-color": `gray`,
            "margin": "1vw",
            "color": "black",
            "font-size": "2vw",
        })
        $topRight.append(screenMap$this.$infos);
        const button$spaceship = new Button({$parent: $topRight, content: "宇宙飞船"})

        screenMap$this.$screenBox
            .append($topLeft)
            .append($bottomLeft)
            .append($bottomRight)
            .append($topRight)

        tickTasks.push(new TickTask(function () {
            screenMap$this.tick();
        }))

        // todo: 顶部标题，地图，信息栏
    }

    setMap(data) {

    }

    tick() {
        const screenMap$this = this;
        screenMap$this.$infos.text(`${screenMap$this.name ? `当前位置：${screenMap$this.name}` : ""} 金钱：${storage.money} 时间：${new Date(storage.time).format("yyyy年MM月dd日 hh:mm:ss")}`)
        if (screenData.present === screenMap$this) {
            storage.time += 3600;
        }
    }

}