import {_speed, _speedTime} from "../../util/Algorithm.js";
import {$background, $body, soundPlayer$bigstar} from "../../init/Init.js";
import {creatElement} from "../../util/Opera.js";

//todo

/**
 * 此类可以实现一个按钮。
 */
export class Button {
    /**
     *
     * @param {*|{$parent: *|HTMLElement|jQuery, action: function|undefined, color: number[], content: string, soundEffect: SoundPlayer}}options
     */
    constructor(options = {}) {
        const button$this = this;
        options = $.extend({
            $parent: $background,
            action: undefined,
            color: [255, 0, 0],
            content: "",
            soundEffect: soundPlayer$bigstar
        }, options);

        button$this.$button = creatElement("button")
        button$this.$button.html(options.content);
        options.$parent.append(this.$button);
        button$this.$button.click(function () {
            options.soundEffect.play();
            if (options.action) {
                options.action();
            }
        })
        button$this.color = options.color;
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

export class SoundPlayer {
    constructor(src, startTime = 0.0) {
        const soundPlayer$this = this;
        soundPlayer$this.startTime = startTime;
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
        soundPlayer$this.$video[0].currentTime = soundPlayer$this.startTime + startTime;
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

