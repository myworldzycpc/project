import {GuiBase} from "./GuiBase.js";
import {creatElement} from "../../util/Opera.js";
import {$body} from "../../init/Init.js";
import {calculatedSpeed} from "../../util/Algorithm.js";
import {storage} from "../../SavedData.js";

export class SoundPlayer extends GuiBase {
    /**
     *
     * @param src{string}
     * @param startTime{number}
     * @param type{SoundType}
     */
    constructor(src, startTime = 0.0, type = SoundType.SOUND) {
        super();
        const soundPlayer$this = this;
        soundPlayer$this.startTime = startTime;
        soundPlayer$this.soundType = type;
        soundPlayer$this.muted = false;
        // <video class="hide" id="sound" src="破苍穹.mp3" preload="auto"></video>
        soundPlayer$this.$video = creatElement("video")
            .addClass("hide")
            .attr("src", src)
            .attr("preload", "auto")
        $body.append(soundPlayer$this.$video);
        if (type === SoundType.SOUND) {
            sounds.push(soundPlayer$this)
        } else if (type === SoundType.MUSIC) {
            musics.push(soundPlayer$this)
        }
        this.updateMuted()
    }

    play(volume = 1.0, playbackRate = 1.0, startTime = 0, loop = false, callback) {
        const soundPlayer$this = this;
        soundPlayer$this.$video[0].volume = volume;
        soundPlayer$this.$video[0].playbackRate = calculatedSpeed(playbackRate);
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

    get volume() {
        return this.$video[0].volume;
    }

    set volume(value) {
        this.$video[0].volume = value
    }

    updateMuted() {
        if (this.muted) {
            this.$video[0].muted = true
        } else {
            if (this.soundType === SoundType.SOUND && storage.noSound) {
                this.$video[0].muted = true
            } else if (this.soundType === SoundType.MUSIC && storage.noMusic) {
                this.$video[0].muted = true
            } else {
                this.$video[0].muted = false
            }
        }
    }
}

export class SoundType {
    static MUSIC;
    static SOUND;
}

export const sounds = [];
export const musics = [];

export const soundPlayer$bigstar = new SoundPlayer("static/sounds/bigstar.mp3", 0.3)
export const soundPlayer$nightClothes = new SoundPlayer("static/sounds/夜行衣.mp3")
export const soundPlayer$planetPower = new SoundPlayer("static/sounds/一开始的新闻（新版）.mp3")
export const soundPlayer$button = new SoundPlayer("static/sounds/button.mp3", 0.1)
export const soundPlayer$success = new SoundPlayer("static/sounds/success.mp3")