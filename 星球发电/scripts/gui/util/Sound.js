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
     * @param type{string}
     */
    constructor(src, startTime = 0.0, type = SoundType.SOUND) {
        super();
        const soundPlayer$this = this;
        soundPlayer$this.startTime = startTime;
        soundPlayer$this.soundType = type;
        soundPlayer$this.muted = false;
        soundPlayer$this.src = src;
        if (type === SoundType.SOUND) {
            sounds.push(soundPlayer$this)
        } else if (type === SoundType.MUSIC) {
            musics.push(soundPlayer$this)
        }
        soundPlayer$this.inited = false;
    }

    init() {
        const soundPlayer$this = this;
        // <video class="hide" id="sound" src="破苍穹.mp3" preload="auto"></video>
        soundPlayer$this.$video = creatElement("video")
            .addClass("hide")
            .attr("src", soundPlayer$this.src)
            .attr("preload", "auto")
        $body.append(soundPlayer$this.$video);
        soundPlayer$this.inited = true;
    }

    checkInit() {
        // 断言已inited
        if (!this.inited) {
            console.error("SoundPlayer未初始化");
        }
    }

    play(volume = 1.0, playbackRate = 1.0, startTime = 0, loop = false, callback) {
        this.checkInit();
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
        this.checkInit();
        const soundPlayer$this = this;
        soundPlayer$this.$video[0].pause();
    }

    get volume() {
        this.checkInit();
        return this.$video[0].volume;
    }

    set volume(value) {
        this.checkInit();
        this.$video[0].volume = value
    }

    updateMuted() {
        this.checkInit();
        if (this.muted) {
            this.$video[0].muted = true;
        } else {
            this.$video[0].muted = ((this.soundType === SoundType.SOUND && storage.noSound) || (this.soundType === SoundType.MUSIC && storage.noMusic));
        }
    }
}

/**
 * @enum
 */
export class SoundType {
    static MUSIC = "music";
    static SOUND = "sound";
}

export const sounds = [];
export const musics = [];

export const soundPlayer$bigstar = new SoundPlayer("static/sounds/bigstar.mp3", 0.3);
export const soundPlayer$nightClothes = new SoundPlayer("static/sounds/夜行衣.mp3", 0, SoundType.MUSIC);
export const soundPlayer$planetPower = new SoundPlayer("static/sounds/一开始的新闻（新版）.mp3");
export const soundPlayer$button = new SoundPlayer("static/sounds/button.mp3", 0.1);
export const soundPlayer$success = new SoundPlayer("static/sounds/success.mp3");

export function initSounds() {
    sounds.forEach(sound => sound.init());
    musics.forEach(music => music.init());
}

export function updateMutedAll() {
    sounds.forEach(sound => sound.updateMuted());
    musics.forEach(music => music.updateMuted());
}