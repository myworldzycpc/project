export function NumberSticker() {

    /**
     *
     * @param {number}a
     * @param {number}b
     *
     * @return {number}
     */
    Number.prototype.clamp = function (a, b) {
        const min = Math.min(a, b);
        const max = Math.max(a, b);
        if (this <= min) {
            return min;
        }
        if (this >= max) {
            return max;
        }
        return this;
    }
}
