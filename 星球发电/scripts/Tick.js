export class TickTask {
    constructor(action, active = true, loop = true) {
        const tickTask$this = this;
        tickTask$this.action = action;
        tickTask$this.loop = loop;
        tickTask$this.active = active;
    }

    trigger() {
        const tickTask$this = this;
        if (tickTask$this.active) {
            tickTask$this.action();
            if (!tickTask$this.loop) {
                tickTask$this.active = false;
            }
        }
    }

}