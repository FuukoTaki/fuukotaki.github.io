// Used to loop through entity animations.
export class Animation {

    constructor(name, totalFrames, delay, loop, activationFrame = 1) {
        this.name = name;
        this.currentFrame = 0; // Frame being drawed.
        this.totalFrames = totalFrames; // Animation total frames.
        this.delay = delay;// Delay between frames.
        this.delayTimer = 0; // Timer to call next frame.
        this.loop = loop; // Controls animation loop. If false, stops at last frame.
        this.activationFrame = activationFrame;
        this.wasActivationFrameCalled = false;

        // This is set to true when loop is true and animation reachs last frame.
        this.animationFinished = false;
    }

    checkActivationFrame() {
        if (this.currentFrame === this.activationFrame
            && !this.wasActivationFrameCalled) {
            this.wasActivationFrameCalled = true;
            return true;
        }

        return false;
    }

    tick() {
        // Check if needs to call next frame.
        this.delayTimer++;
        if (this.delayTimer >= this.delay) {
            this.delayTimer = 0;
            // Call next frame.
            this.currentFrame++;
            // Reset to frame 0 when last frame is reached.
            if (this.currentFrame >= this.totalFrames) {

                // Check if loop is enabled. If not, the animation stops at last frame.
                if (this.loop) this.currentFrame = 0;
                if (!this.loop) {
                    this.currentFrame = this.totalFrames - 1;
                    this.animationFinished = true;
                }
            }
        }
    }

    // Restore animation to initial state.
    reset() {
        this.currentFrame = 0;
        this.delayTimer = 0;
        this.animationFinished = false;
        this.wasActivationFrameCalled = false;
    }
}