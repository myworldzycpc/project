import {calculatedSpeedTime} from "../../util/Algorithm.js";
import {$background} from "../../init/Init.js";
import {creatElement} from "../../util/Opera.js";
import {GuiBase} from "./GuiBase.js";
import {soundPlayer$bigstar} from "./Sound.js";

//todo

/**
 * 此类可以实现一个按钮。
 */
export class Button extends GuiBase {
    /**
     *
     * @param {*|{$parent: *|HTMLElement|jQuery, action: function|undefined, color: number[], content: string, soundEffect: SoundPlayer}}options
     */
    constructor(options = {}) {
        super();
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
                "padding": "20px",
                "border-radius": "20px",
                "background-color": `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                "margin": "20px",
                "color": "white",
                "font-size": "40px",
                "border": "none",
                "filter": "none",
                "box-shadow": "none",
                "transition": `${calculatedSpeedTime(0.2)}s`,
            },
            "hover": {
                "padding": "20px",
                "border-radius": "20px",
                "background-color": `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                "margin": "20px",
                "color": "white",
                "font-size": "40px",
                "border": "none",
                "filter": "none",
                "box-shadow": `0 0 20px rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.5)`,
                "transition": `${calculatedSpeedTime(0.2)}s`,
            },
            "active": {
                "padding": "20px",
                "border-radius": "20px",
                "background-color": `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                "margin": "20px",
                "color": "white",
                "font-size": "40px",
                "border": "none",
                "filter": "brightness(0.8)",
                "box-shadow": `0 0 20px rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.5)`,
                "transition": `${calculatedSpeedTime(0.2)}s`,
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

    get content() {
        return this.$button.html()
    }

    set content(value) {
        return this.$button.html(value)
    }

}

export class Entry extends GuiBase {

    constructor(options = {}) {
        super();
        const entry$this = this;
        options = $.extend({
            $parent: $background,
            action: undefined,
            color: [255, 255, 255],
            content: "",
            soundEffect: soundPlayer$bigstar
        }, options);

        entry$this.$input = creatElement("input")
        entry$this.$input.attr("spellcheck", "false")
        entry$this.setValue(options.content);
        options.$parent.append(this.$input);
        entry$this.$input.change(function () {
            options.soundEffect.play();
            if (options.action) {
                options.action(entry$this);
            }
        })
        entry$this.color = options.color;
        entry$this.pressed = false;
        entry$this.hovered = false;

        entry$this.#updateStyle()
        entry$this.$input.hover(
            function () {
                entry$this.hovered = true;
                entry$this.#updateStyle()
            },
            function () {
                entry$this.hovered = false;
                entry$this.pressed = false;
                entry$this.#updateStyle()
            }
        );
        entry$this.$input.mousedown(function () {
            entry$this.pressed = true;
            entry$this.#updateStyle()

        });
        entry$this.$input.mouseup(function () {
            entry$this.pressed = false;
            entry$this.#updateStyle()
        });
    };

    #updateStyle() {
        const entry$this = this;
        const color = entry$this.color;
        entry$this.styles = {
            "normal": {
                "padding": "20px",
                "border-radius": "20px",
                "background-color": `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                "margin": "20px",
                "color": "black",
                "font-size": "40px",
                "border": "none",
                "filter": "none",
                "box-shadow": "none",
                "transition": `${calculatedSpeedTime(0.2)}s`,
            },
            "hover": {
                "padding": "20px",
                "border-radius": "20px",
                "background-color": `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                "margin": "20px",
                "color": "black",
                "font-size": "40px",
                "border": "none",
                "filter": "none",
                "box-shadow": `0 0 20px rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.5)`,
                "transition": `${calculatedSpeedTime(0.2)}s`,
            },
            "active": {
                "padding": "20px",
                "border-radius": "20px",
                "background-color": `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                "margin": "20px",
                "color": "black",
                "font-size": "40px",
                "border": "none",
                "filter": "brightness(0.8)",
                "box-shadow": `0 0 20px rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.5)`,
                "transition": `${calculatedSpeedTime(0.2)}s`,
            }
        }
        if (entry$this.pressed) {
            entry$this.$input.css(entry$this.styles.active);
        } else if (entry$this.hovered) {
            entry$this.$input.css(entry$this.styles.hover);
        } else {
            entry$this.$input.css(entry$this.styles.normal);
        }
    }

    getValue() {
        return this.$input.val()
    }

    setValue(value) {
        return this.$input.val(value)
    }
}

export class Badge extends GuiBase {

    /**
     *
     * @param {*|{$parent: *|HTMLElement|jQuery, color: number[], backgroundColor: number[], content: string}}options
     */
    constructor(options = {}) {
        super();
        const button$this = this;
        options = $.extend({
            $parent: $background,
            color: [255, 255, 255],
            backgroundColor: [128, 128, 128],
            content: "",
        }, options);

        button$this.$span = creatElement("span")
        button$this.$span.html(options.content);
        options.$parent.append(this.$span);

        button$this.color = options.color;
        button$this.backgroundColor = options.backgroundColor;

        button$this.#updateStyle()

    };

    #updateStyle() {
        const badge$this = this;
        const color = badge$this.color;
        const backgroundColor = badge$this.backgroundColor;
        badge$this.styles = {
            "normal": {
                "padding": "20px",
                "border-radius": "20px",
                "background-color": `rgb(${backgroundColor.join(",")})`,
                "margin": "20px",
                "color": `rgb(${color.join(",")})`,
                "font-size": "40px",
                "border": "none",
                "filter": "none",
                "box-shadow": "none",
            }
        }

        badge$this.$span.css(badge$this.styles.normal);

    }

    changeColor(color) {
        const button$this = this;
        button$this.color = color;
        button$this.#updateStyle();
    }

    get content() {
        return this.$span.html()
    }

    set content(value) {
        return this.$span.html(value)
    }
}