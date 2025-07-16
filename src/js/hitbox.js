import { ctx } from "./app.js";

/**
 * Hitbox is used to add to objects a collision area, which it's used later
 * to check if it's colliding with another hitbox. Since most objects, like
 * players or enemies will have larger images with empty space in their
 * spritesheets drawings, it's better to add and set a separated hitbox to
 * calculate attacks or when they receive damage.
*/
export class Hitbox {

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

    // -- CONSTRUCTOR --

    /**
     * @param {number} x - Hitbox X position.
     * @param {number} y - Hitbox Y position.
     * @param {number} width - Hitbox width.
     * @param {number} height - Hitbox height.
     * @param {number} lifespan - This is used as a timer, checking how many
     * frames the hitbox will be enabled for collisions.
     * For example, lifespan = 10, means the hibox will be working 10 frames
     * and then it will be disabled. If no value is specified, the hitbox
     * will be permanent.
    */
    constructor(x, y, width, height, lifespan = undefined) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.lifespan = lifespan;

        this.enabled = true; // Value that will check if the hitbox it's still working.
    }

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

    // -- TICK --

    /**
     * Tick through the hitbox lifespan.
     * When lifespan gets 0 or below, the hitbox will be disabled.
    */
    tick() {
        if (this.lifespan != undefined) {
            this.lifespan--;
            if (this.lifespan <= 0) this.enabled = false;
        }
    }

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

    // -- DRAW --

    /**
     * Draw the hitbox on the canvas as long as is enabled.
    */
    draw() {
        if (this.enabled) ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}