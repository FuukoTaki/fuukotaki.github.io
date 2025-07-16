import { facingDirections } from "./globalVariables.js";
import { ctx } from "./app.js";

/**
 * This is the core class to represent complex entities, like players or enemies.
 * It works as a set of tools, beign able to draw it on the screen and play
 * animations.
 * Extend any other class that needs animations to this.
*/
export class Entity {

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

    // -- CONSTRUCTOR --

    /**
     * @param {object} spritesheet - Contains all the spritesheets that will be used for an entity.
     * Make sure to add an IDLE animation, since it will be the default animation to play.
     * For example {IDLE: playerAnimationsSRC["IDLE", WALK: playerAnimationsSRC["WALK"}
     * @param {object} animationsMetadata - Contains all the metadata that will be used to play all the animations.
     * Match the metadata names with animations name. For example, IDLE animation: IDLE: new Animation(...args).
     * @param {number} x - Position X on the canvas.
     * @param {number} y  - Position Y on the canvas.
     * @param {number} width - Width that contains a single frame cropped from the spritesheet.
     * @param {number} height - Height that contains a single frame cropped from the spritesheet.
    */
    constructor(spritesheet, animationsMetadata, x, y, width, height) {
        this.spritesheet = spritesheet;
        this.animationsMetadata = animationsMetadata;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.positionY = 0; // Position Y of the animation being played in the spritesheet.
        this.direction = facingDirections.RIGHT; // Entity facing left or right.
        this.currentAnimation = this.animationsMetadata["IDLE"]; // Set default animation.
    }

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

    // -- SWITCH ANIMATION --

    /**
     * Switches current animation metadata being played with another one.
     * 
     * @param {string} name - New animation name. This value should be provided with
     * all the animationsAvailable object from an entity.
     * @returns - If the same animation is called when is already being played,
     * this code won't work.
    */
    switchAnimation(name) {
        // Prevent calling the same animation more than once.
        if (this.currentAnimation.name === name) return;
        this.currentAnimation.reset();
        this.currentAnimation = this.animationsMetadata[name];
    }

    // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

    // -- DRAW --

    /**
     * Draw the entity on the canvas and plays its current animation.
     * Call this code on the game loop.
    */
    draw() {
        // Tick the animation metadata to play the frames.
        this.currentAnimation.tick();

        // Prevent any decimal number when drawing the entity.
        const drawX = Math.floor(this.x);
        const drawY = Math.floor(this.y);

        // Get current spritesheet being drawn.
        const spriteSRC = this.spritesheet[this.currentAnimation.name];
        // Get the current crop in X position.
        const frameX = this.currentAnimation.currentFrame * this.width;

        // Draw the animation facing the right direction.
        if (this.direction === facingDirections.RIGHT)
            ctx.drawImage(spriteSRC, frameX, this.positionY, this.width, this.height, drawX, drawY, this.width, this.height);

        // Draw the animation facing the left direction.
        else if (this.direction === facingDirections.LEFT) {
            ctx.save();
            ctx.scale(-1, 1); // Invert scale to draw looking to left.
            ctx.drawImage(spriteSRC, frameX, this.positionY, this.width, this.height, -(drawX + this.width), drawY, this.width, this.height);
            ctx.restore();
        }
    }
}