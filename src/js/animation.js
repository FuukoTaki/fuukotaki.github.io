/**
 * This class provides all the metadata needed to play an animation.
 * It needs Entity class to check whick animation must be played.
*/
export class Animation {

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

    // -- CONSTRUCTOR --

    /**
     * @param {string} name - The animation name. Default animation is IDLE.
     * @param {number} totalFrames - All the frames the animation (spritesheet) contains, from left to right.
     * @param {number} delay - How many frames each animation is shown. For example, 4 delay = 4 frames on screen.
     * @param {boolean} loop - Make the animation loop. If set to false, it stops at last frame.
     * @param {number} activationFrame - Triggers a special action when the animation reaches this frame.
     * For example, activationFrame = 4 will trigger a special action when it reaches frame 4.
     * Once is called, it's disabled, preventing multiple calls when delay is too long.
    */
    constructor(name, totalFrames, delay, loop, activationFrame = 1) {
        this.name = name;
        this.totalFrames = totalFrames;
        this.delay = delay;
        this.loop = loop;
        this.activationFrame = activationFrame;

        this.delayTimer = 0;
        this.currentFrame = 0;
        this.animationFinished = false;
        this.wasActivationFrameCalled = false;
    }

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

    // -- CHECK ACTIVATION FRAME --

    /**
     * @returns True when the activationFrame has been reached and not triggered yed.
     * False if the activationFrame was already triggered or not reached yed.
    */
    checkActivationFrame() {
        if (this.currentFrame === this.activationFrame
            && !this.wasActivationFrameCalled) {
            this.wasActivationFrameCalled = true;
            return true;
        }

        return false;
    }

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

    // -- RESET --

    /**
     * Restore the animation values to their default state.
     * Call this before switching animations.
    */
    reset() {
        this.currentFrame = 0;
        this.delayTimer = 0;
        this.animationFinished = false;
        this.wasActivationFrameCalled = false;
    }

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

    // -- TICK --

    /**
     * This must be called on the game loop in order to play the animation.
    */
    tick() {
        // Check if needs to call next frame.
        this.delayTimer++;
        if (this.delayTimer >= this.delay) {

            this.delayTimer = 0; // Reset delay timer.
            this.currentFrame++; // Call next frame.

            // Check if last frame is reached.
            if (this.currentFrame >= this.totalFrames) {

                // Check if loop is enabled. If not, the animation stops at last frame.
                // Otherwise, returns to frame 0 to play it again.
                if (this.loop) this.currentFrame = 0;
                if (!this.loop) {
                    this.currentFrame = this.totalFrames - 1;
                    this.animationFinished = true;
                }
            }
        }
    }
}