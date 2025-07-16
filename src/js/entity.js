// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

// -- ENTITY --

// Used to represent complex objects with plenty of animations.
export class Entity {

    constructor(spritesheet, animationsMetadata, x, y, width, height) {

        // Stores an object with all entity images, used for animations.
        this.spritesheet = spritesheet;
        // Stores all information about how should play the animation.
        this.animationsMetadata = animationsMetadata;

        // Entity coordinates and size.
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.positionY = 0;

        this.direction = "right"; // left or right.

        // Set animation being played.
        this.currentAnimation = this.animationsMetadata["IDLE"];
        // console.log(this.currentAnimation);
    }

    // Call this when animations changes.
    switchAnimation(name) {
        // Prevent calling the same animation more than once.
        if (this.currentAnimation.name === name) return;
        this.currentAnimation.reset();
        this.currentAnimation = this.animationsMetadata[name];
        // console.log(this.currentAnimation);
    }

    // Used to draw the entity and its animations.
    // Call this inside the game loop in order to work.
    draw(ctx) {

        this.currentAnimation.tick();

        // ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

        // -- DRAW ENTITY --

        // Prevent any decimal number when drawing the entity.
        const drawX = Math.floor(this.x);
        const drawY = Math.floor(this.y);

        if (this.direction === "right") {
            ctx.drawImage(
                this.spritesheet[this.currentAnimation.name], // Image SRC.
                this.currentAnimation.currentFrame * this.width, // Cut X.
                this.positionY, // Cut Y.
                this.width, this.height, // Cut width and height.
                drawX, drawY, // Canvas X and Y.
                this.width, this.height // Image width ang height.
            );
        }

        if (this.direction === "left") {
            ctx.save();
            ctx.scale(-1, 1); // Invert scale to draw looking to left.
            ctx.drawImage(
                this.spritesheet[this.currentAnimation.name],  // Image SRC.
                this.currentAnimation.currentFrame * this.width, // Cut X.
                this.positionY, // Cut Y.
                this.width, this.height, // Cut width and height.
                -(drawX + this.width), drawY, // Canvas reversed X and Y.
                this.width, this.height // Image width ang height.
            );
            ctx.restore();
        }
    }
}