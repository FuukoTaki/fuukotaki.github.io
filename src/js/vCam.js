// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

// -- VIRTUAL CAMERA --

// Follows a entity in the game.
export class VCam {

    constructor(canvas, ctx, scale, target, delay = 1) {
        this.delay = delay; // Used to add a delay in the tracking speed.
        this.canvas = canvas;
        this.ctx = ctx;
        this.scale = scale;
        this.target = target; // Target being tracked.
        this.targetX = target.x;
        this.targetY = target.y;
        this.setCoords(scale);
    }

    // Set camera position.
    setCoords(scale) {
        // This will center the entity.
        this.x = (this.canvas.width / 2 - this.target.x * scale - this.target.width / 2 * scale) / scale;
        this.y = (this.canvas.height / 2 - this.target.y * scale - this.target.height / 2 * scale) / scale;

        // Remove decimals.
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
    }

    // Switch target.
    setTarget(target) {
        this.target = target;
    }

    // Add a rumble effect.
    setRumble(intensity, duration) {
        this.rumbleIntensity = intensity;
        this.rumbleDuration = duration;
    }

    // Updates camera position. Call this on the game loop.
    track(scale) {
        // Get destination coordinates.
        this.targetX = (this.canvas.width / 2 - this.target.x * scale - this.target.width / 2 * scale) / scale;
        this.targetY = (this.canvas.height / 2 - this.target.y * scale - this.target.height / 2 * scale) / scale;

        // Update camera coordinates baased on destination coordinates.
        this.x += (this.targetX - this.x) / this.delay;
        this.y += (this.targetY - this.y) / this.delay;

        // Add a rumble if was needed.
        if (this.rumbleDuration > 0) {
            this.x += (Math.random() - 0.5) * this.rumbleIntensity;
            this.y += (Math.random() - 0.5) * this.rumbleIntensity;
            this.rumbleDuration--;
        }

        // Remove decimals.
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);

        // Update camera position.
        this.scale = scale;
        this.ctx.translate(this.x, this.y);
    }
}