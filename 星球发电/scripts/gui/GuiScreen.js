import {_speed, _speedTime} from "../util/Algorithm.js";
import {$background, $body, screenData, soundPlayer$bigstar, storage, tickTasks} from "../Init.js";
import {showTasks} from "../task/TaskManager.js";
import {showSettings} from "../Settings.js";
import {creatElement, slideAndFadeIn, slideAndFadeOut} from "../util/Opera.js";
import {TickTask} from "../Tick.js";

export class Dialog {
    constructor(content = "", canBeClosed = false) {
        const dialog$this = this;
        dialog$this.$dialogBox = creatElement("div")
        dialog$this.$dialogBoxBackground = creatElement("div")
        dialog$this.$dialogBoxContinue = creatElement("div")
            .css({"font-size": "2vw", "text-align": "center", "line-height": "10vw"})
            .html("点击空白处继续...")
            .hide()
        dialog$this.$dialogBox.addClass("dialogBox");
        dialog$this.$dialogBoxBackground.addClass("dialogBoxBackground");
        dialog$this.$dialogBox.html(content);
        dialog$this.$divCenter = creatElement("div")
            .append(dialog$this.$dialogBox)
            .append(dialog$this.$dialogBoxContinue)
            .addClass("divCenter")
        dialog$this.canBeClosed = canBeClosed;
        $body.append(dialog$this.$dialogBoxBackground);
        $body.append(dialog$this.$divCenter);
        dialog$this.$dialogBoxBackground.hide();
        dialog$this.$divCenter.hide()
    };

    show(callback) {
        const dialog$this = this;
        dialog$this.callback = callback;
        dialog$this.$dialogBoxBackground.css({"z-index": maxZIndex++}).fadeIn(_speedTime(200), function () {
            dialog$this.$divCenter.css({"z-index": maxZIndex++}).fadeIn(_speedTime(200), function () {
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
            dialog$this.$dialogBoxBackground.fadeOut(_speedTime(200), function () {
                dialog$this.$dialogBoxContinue.hide()
                if (dialog$this.callback) {
                    dialog$this.callback();
                }
            });
        });
    }

    update() {
        const dialog$this = this;
        if (dialog$this.canBeClosed) {
            slideAndFadeIn(dialog$this.$dialogBoxContinue, 500)
            dialog$this.$dialogBoxBackground.click(function () {
                dialog$this.hide();
            })
            dialog$this.$dialogBoxContinue.click(function () {
                dialog$this.hide();
            })
        } else {
            slideAndFadeOut(dialog$this.$dialogBoxContinue, 500)
        }
    }

}

export class Button {
    constructor($parent = $background, content = "", action = function () {
    }, color = [255, 0, 0]) {
        const button$this = this;
        button$this.$button = creatElement("button")
        button$this.$button.html(content);
        $parent.append(this.$button);
        button$this.$button.click(function () {
            soundPlayer$bigstar.play(undefined, undefined, 0.3);
            action();
        })
        button$this.color = color;
        button$this.pressed = false;
        button$this.hovered = false;

        button$this.#updateStyle()
        button$this.$button.hover(
            function () {
                button$this.hovered = true;
                button$this.#updateStyle()
            },
            function () {
                button$this.hovered = false;
                button$this.pressed = false;
                button$this.#updateStyle()
            }
        );
        button$this.$button.mousedown(function () {
            button$this.pressed = true;
            button$this.#updateStyle()

        });
        button$this.$button.mouseup(function () {
            button$this.pressed = false;
            button$this.#updateStyle()
        });
    };

    #updateStyle() {
        const button$this = this;
        const color = button$this.color;
        button$this.styles = {
            "normal": {
                "padding": "1vw",
                "border-radius": "1vw",
                "background-color": `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                "margin": "1vw",
                "color": "white",
                "font-size": "2vw",
                "border": "none",
                "filter": "none",
                "box-shadow": "none",
                "transition": `${_speedTime(0.2)}s`,
            },
            "hover": {
                "padding": "1vw",
                "border-radius": "1vw",
                "background-color": `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                "margin": "1vw",
                "color": "white",
                "font-size": "2vw",
                "border": "none",
                "filter": "none",
                "box-shadow": `0 0 1vw rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.5)`,
                "transition": `${_speedTime(0.2)}s`,
            },
            "active": {
                "padding": "1vw",
                "border-radius": "1vw",
                "background-color": `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                "margin": "1vw",
                "color": "white",
                "font-size": "2vw",
                "border": "none",
                "filter": "brightness(0.8)",
                "box-shadow": `0 0 1vw rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.5)`,
                "transition": `${_speedTime(0.2)}s`,
            }
        }
        if (button$this.pressed) {
            button$this.$button.css(button$this.styles.active);
        } else if (button$this.hovered) {
            button$this.$button.css(button$this.styles.hover);
        } else {
            button$this.$button.css(button$this.styles.normal);
        }
    }

    changeColor(color) {
        const button$this = this;
        button$this.color = color;
        button$this.#updateStyle();
    }

    click(action) {
        const button$this = this;
        if (action) {
            button$this.$button.click(action);
        } else {
            button$this.$button.click();
        }
    }
}

export class Screen {
    constructor() {
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
            screenData.present.$screenBox.fadeOut(_speedTime(500), function () {
                screen$this.$screenBox.css({"z-index": maxZIndex++}).fadeIn(_speedTime(500), function () {
                    if (callback) {
                        callback()
                    }
                });
            })
            screenData.present = screen$this;
        } else {
            screen$this.$screenBox.css({"z-index": maxZIndex++}).fadeIn(_speedTime(500), function () {
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
        const button$task = new Button($topLeft, "任务", function () {
            showTasks();
        })
        $topLeft.append(creatElement('br'));
        const button$personnelMatters = new Button($topLeft, "人事")
        $topLeft.append(creatElement('br'));
        const button$technology = new Button($topLeft, "技术")

        const $bottomLeft = creatElement("div").css({
            "position": "fixed",
            "bottom": "0",
            "left": "0"
        })
        const button$store = new Button($bottomLeft, "商店")
        const button$construct = new Button($bottomLeft, "建设")

        const $bottomRight = creatElement("div").css({
            "position": "fixed",
            "bottom": "0",
            "right": "0"
        })
        const button$celestialMap = new Button($bottomRight, "星图")
        const button$setting = new Button($bottomRight, "设置", function () {
            showSettings()
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
        const button$spaceship = new Button($topRight, "宇宙飞船")

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

export class SoundPlayer {
    constructor(src) {
        const soundPlayer$this = this;
        //<video class="hide" id="sound" src="破苍穹.mp3" preload="auto"></video>
        soundPlayer$this.$video = creatElement("video")
            .addClass("hide")
            .attr("src", src)
            .attr("preload", "auto")
        $body.append(soundPlayer$this.$video);
    }

    play(volume = 1.0, playbackRate = 1.0, startTime = 0, loop = false, callback) {
        const soundPlayer$this = this;
        soundPlayer$this.$video[0].volume = volume;
        soundPlayer$this.$video[0].playbackRate = _speed(playbackRate);
        soundPlayer$this.$video[0].currentTime = startTime;
        soundPlayer$this.$video[0].loop = loop;

        soundPlayer$this.$video[0].play();
        if (callback) {
            soundPlayer$this.$video.bind('ended', function () {
                callback();
            })
        } else {
            soundPlayer$this.$video.unbind('ended')
        }
    }

    stop() {
        const soundPlayer$this = this;
        soundPlayer$this.$video[0].pause();
    }
}