import { canvas, ctx, scale } from "./app.js";

/**
 * Virtual Camera. It's used to track and follow the position of an object in the canvas.
 * To make it work, the object must have x, y, width and height in their properties, since
 * the camera will try to center the object on the screen.
*/
export class VCam {

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

    // -- CONSTRUCTOR --

    /**
     * @param {object} target - Target of the camera that will be tracked and followed. 
     * Make sure the object has X, Y, width and height on their properties. 
     * @param {number} delay - Adds a delay in the tracking speed of the camera. 
     * When delay is set to 1, the camera won't add delay.
    */
    constructor(target, delay = 1) {
        this.target = target;
        this.delay = delay;

        this.setCentralPosition();
    }

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

    // -- REMOVE DECIMALS --

    /**
     * Remove decimal numbers in the camera movement,
     * preventing aliasing. Call this function whenever 
     * the camera changes its position.
    */
    removeDecimals() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
    }

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

    // -- SET CENTRAL POSITION --

    /**
     * Set camera coordinates, centering with the object.
    */
    setCentralPosition() {
        this.x = (canvas.width / 2 - this.target.x * scale - this.target.width / 2 * scale) / scale;
        this.y = (canvas.height / 2 - this.target.y * scale - this.target.height / 2 * scale) / scale;
        this.removeDecimals();
    }

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

    // -- SWITCH TARGET --

    /**
     * Switch current target being tracked with another one.
     * @param {object} target - New target that will be tracked.
    */
    switchTarget(target) {
        this.target = target;
    }

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

    // -- SET RUMBLE --

    /**
     * Adds a rumble effect in the camera.
     * @param {number} intensity - Intensity in the rumble movement.
     * @param {number} duration - How many frames the rumble will last.
    */
    setRumble(intensity, duration) {
        this.rumbleIntensity = intensity;
        this.rumbleDuration = duration;
    }

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

    // -- TRACK --

    /**
     * Update camera position and move it towards the target being tracked.
     * Call this on the game loop.
    */
    track() {
        // Get destination coordinates.
        const targetX = (canvas.width / 2 - this.target.x * scale - this.target.width / 2 * scale) / scale;
        const targetY = (canvas.height / 2 - this.target.y * scale - this.target.height / 2 * scale) / scale;

        // Move camera towards destination coordinates.
        this.x += (targetX - this.x) / this.delay;
        this.y += (targetY - this.y) / this.delay;

        // Add a rumble effect when duration is above 0.
        if (this.rumbleDuration > 0) {
            this.x += (Math.random() - 0.5) * this.rumbleIntensity;
            this.y += (Math.random() - 0.5) * this.rumbleIntensity;
            this.rumbleDuration--;
        }

        this.removeDecimals();

        // Apply camera movement to the canvas.
        ctx.translate(this.x, this.y);
    }
}