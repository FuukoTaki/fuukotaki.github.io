import { Animation } from "./animation.js";
import { Entity } from "./entity.js";
import { KeysInput } from "./keysController.js";
import { Hitbox } from "./hitbox.js";
import { isOverlapping, addPlayerAttackCollision } from "./collision.js";
import { cardinalDirectionsAvailable } from "./globalVariables.js";
import { mapLimits, terrainObjects } from "./mapDrawing.js";

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

// -- VARIABLES --

// Used to access all player animations availables.
const animationsAvailable = {
    IDLE: "IDLE",
    WALK: "WALK",
    ROLL: "ROLL",
    SLASH1: "SLASH1",
    SLASH2: "SLASH2",
};

// Contains all the metadata to play an animation.
const animationsMetadata = {
    IDLE: new Animation(animationsAvailable.IDLE, 6, 6, true),
    WALK: new Animation(animationsAvailable.WALK, 6, 6, true),
    ROLL: new Animation(animationsAvailable.ROLL, 10, 3, false),
    SLASH1: new Animation(animationsAvailable.SLASH1, 6, 4, false, 1),
    SLASH2: new Animation(animationsAvailable.SLASH2, 6, 4, false, 2),
};

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

export class Player extends Entity {

    constructor(spritesheet, x, y) {
        super(spritesheet, animationsMetadata, x, y, 256, 256);
        this.binary = 0; // Used to calculate cardinal direction.
        this.cardinalDirection = cardinalDirectionsAvailable.FRONT; // Initial direction.
        this.diagonalCurrentTime = 0; // Current time + diagonal tomeout for calculating.
        this.diagonalTimeout = 100; // Addsa timer to chance between cardinal movement.

        this.movementSpeed = 3;
        this.rollingSpeed = 6;
        this.isRolling = false;
        this.isSlashing = false;

        this.lockDefaultMovement = false; // Blocks WASD movement.

        this.hitbox = new Hitbox(0, 0, 24, 24);
        this.updateHitbox();
    }

    updateHitbox() {
        this.hitbox.x = this.x + this.width / 2 - 12;
        this.hitbox.y = this.y + this.height / 2 + 8;
    }

    // Calculates player direcion, left or right and all their 8 cardinal directions.
    getDirection() {
        // Get facing direction: left or right.
        if (KeysInput.a) this.direction = "left";
        if (KeysInput.d) this.direction = "right";

        // Ceates a binary when player is moving. 0 means is not moving.
        const up = KeysInput.w ? 1 : 0;
        const down = KeysInput.s ? 2 : 0;
        const left = KeysInput.a ? 4 : 0;
        const right = KeysInput.d ? 8 : 0;

        // Converts binary into a regular number.
        this.binary = up | down | left | right;

        // Check if there is a diagonal direection, then adds a timer to switch direction.
        if (this.binary === 6 || this.binary === 10 || this.binary === 5 || this.binary === 9) {
            this.diagonalCurrentTime = Date.now() + this.diagonalTimeout;
            if (this.binary === 6 || this.binary === 10) this.cardinalDirection = cardinalDirectionsAvailable.SIDE34;
            if (this.binary === 5 || this.binary === 9) this.cardinalDirection = cardinalDirectionsAvailable.BACK34;
        }

        // If there is no diagonal direction, adds a cardinal direction.
        if (this.binary === 0 || this.binary === 1 || this.binary === 2 || this.binary === 4 || this.binary === 8) {

            if (this.diagonalCurrentTime < Date.now()) {
                if (this.binary === 1) this.cardinalDirection = cardinalDirectionsAvailable.BACK;
                if (this.binary === 2) this.cardinalDirection = cardinalDirectionsAvailable.FRONT;
                if (this.binary === 4 || this.binary === 8) this.cardinalDirection = cardinalDirectionsAvailable.SIDE;
            }
        }

        // Set the player direction to the current animation.
        if (this.cardinalDirection === cardinalDirectionsAvailable.FRONT) this.positionY = 0;
        if (this.cardinalDirection === cardinalDirectionsAvailable.SIDE34) this.positionY = 256;
        if (this.cardinalDirection === cardinalDirectionsAvailable.SIDE) this.positionY = 512;
        if (this.cardinalDirection === cardinalDirectionsAvailable.BACK34) this.positionY = 768;
        if (this.cardinalDirection === cardinalDirectionsAvailable.BACK) this.positionY = 1024;
    }

    // Tick is called on game loop, and works as a controller for all actions available.
    tick(ctx) {
        this.slash();
        this.roll();
        this.movement();

        // Remove decimals.
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);

        this.updateHitbox();
        // this.hitbox.draw();
    }

    slash() {

        if (KeysInput.j && !this.isSlashing) {

            this.isSlashing = true;
            this.isRolling = false;
            this.lockDefaultMovement = true;
            this.getDirection();
            this.switchAnimation(animationsAvailable.SLASH1);
        }

        if (this.isSlashing) {

            if (this.currentAnimation.checkActivationFrame()) {
                addPlayerAttackCollision(
                    this.x + this.width / 2 - 64,
                    this.y + this.height / 2 - 64,
                    128, 128);
            }

            if (KeysInput.j && this.currentAnimation.animationFinished
                && this.currentAnimation.name
                === animationsAvailable.SLASH1) {

                this.getDirection();
                this.switchAnimation(animationsAvailable.SLASH2);
            }

            if (KeysInput.j && this.currentAnimation.animationFinished
                && this.currentAnimation.name
                === animationsAvailable.SLASH2) {

                this.getDirection();
                this.switchAnimation(animationsAvailable.SLASH1);
            }

            if (!KeysInput.j && this.currentAnimation.animationFinished) {
                this.isSlashing = false;
                this.lockDefaultMovement = false;
            }
        }
    }

    roll() {
        if (this.isSlashing) return;

        // Inicia el roll
        if (KeysInput.spacebar && !this.isRolling) {
            this.isRolling = true;
            this.lockDefaultMovement = true;
            this.getDirection();
            this.switchAnimation(animationsAvailable.ROLL);
        }

        // Ejecuta el roll frame a frame
        if (this.isRolling) {
            let dx = 0;
            let dy = 0;
            const s = this.rollingSpeed;
            const diagonalSpeed = s / Math.sqrt(2);

            // Calcular dirección de desplazamiento
            if (this.cardinalDirection === cardinalDirectionsAvailable.FRONT) {
                dy += s;
            }

            if (this.cardinalDirection === cardinalDirectionsAvailable.BACK) {
                dy -= s;
            }

            if (this.cardinalDirection === cardinalDirectionsAvailable.BACK34) {
                dy -= diagonalSpeed;
                if (this.direction === "left") dx -= diagonalSpeed;
                if (this.direction === "right") dx += diagonalSpeed;
            }

            if (this.cardinalDirection === cardinalDirectionsAvailable.SIDE34) {
                dy += diagonalSpeed;
                if (this.direction === "left") dx -= diagonalSpeed;
                if (this.direction === "right") dx += diagonalSpeed;
            }

            if (this.cardinalDirection === cardinalDirectionsAvailable.SIDE) {
                if (this.direction === "left") dx -= s;
                if (this.direction === "right") dx += s;
            }

            const maxCorrection = 16;
            let moved = false;

            // Solo aplicar corner correction en cardinales
            const isCardinal = (
                this.cardinalDirection === cardinalDirectionsAvailable.FRONT ||
                this.cardinalDirection === cardinalDirectionsAvailable.BACK ||
                this.cardinalDirection === cardinalDirectionsAvailable.SIDE
            );

            if (this.canMove(this.x + dx, this.y + dy)) {
                this.x += dx;
                this.y += dy;
                moved = true;
            }

            if (!moved && isCardinal) {
                // Movimiento vertical puro
                if (dx === 0 && dy !== 0) {
                    for (let i = 1; i <= maxCorrection; i++) {
                        if (this.canMove(this.x + i, this.y + dy)) {
                            this.x += i;
                            this.y += dy;
                            moved = true;
                            break;
                        }
                        if (this.canMove(this.x - i, this.y + dy)) {
                            this.x -= i;
                            this.y += dy;
                            moved = true;
                            break;
                        }
                    }
                }

                // Movimiento horizontal puro
                if (dy === 0 && dx !== 0) {
                    for (let i = 1; i <= maxCorrection; i++) {
                        if (this.canMove(this.x + dx, this.y + i)) {
                            this.x += dx;
                            this.y += i;
                            moved = true;
                            break;
                        }
                        if (this.canMove(this.x + dx, this.y - i)) {
                            this.x += dx;
                            this.y -= i;
                            moved = true;
                            break;
                        }
                    }
                }
            }

            if (!moved) {
                // Último intento por ejes separados
                if (this.canMove(this.x + dx, this.y)) this.x += dx;
                else if (this.canMove(this.x, this.y + dy)) this.y += dy;
            }

            this.updateHitbox();

            // Termina el roll cuando acaba la animación
            if (this.currentAnimation.animationFinished) {
                this.isRolling = false;
                this.lockDefaultMovement = false;
            }
        }
    }


    // Performs WASD movement.

    movement() {
        if (this.lockDefaultMovement) return;

        this.getDirection();

        if (this.binary === 0) {
            this.switchAnimation(animationsAvailable.IDLE);
            return;
        }

        this.switchAnimation(animationsAvailable.WALK);

        const speed = this.binary === 1 || this.binary === 2 || this.binary === 4 || this.binary === 8
            ? this.movementSpeed
            : this.movementSpeed / Math.sqrt(2);

        let dx = 0;
        let dy = 0;

        if (KeysInput.w) dy -= speed;
        if (KeysInput.s) dy += speed;
        if (KeysInput.a) dx -= speed;
        if (KeysInput.d) dx += speed;

        const maxCorrection = 12;
        let moved = false;

        // Movimiento libre
        if (this.canMove(this.x + dx, this.y + dy)) {
            this.x += dx;
            this.y += dy;
            moved = true;
        }

        // Movimiento cardinal con corner correction
        if (!moved) {
            // Movimiento horizontal puro (A o D)
            if (dx !== 0 && dy === 0) {
                if (this.canMove(this.x + dx, this.y)) {
                    this.x += dx;
                    moved = true;
                } else {
                    for (let i = 1; i <= maxCorrection; i++) {
                        if (this.canMove(this.x + dx, this.y + i)) {
                            this.x += dx;
                            this.y += i;
                            moved = true;
                            break;
                        }
                        if (this.canMove(this.x + dx, this.y - i)) {
                            this.x += dx;
                            this.y -= i;
                            moved = true;
                            break;
                        }
                    }
                }
            }

            // Movimiento vertical puro (W o S)
            if (dy !== 0 && dx === 0) {
                if (this.canMove(this.x, this.y + dy)) {
                    this.y += dy;
                    moved = true;
                } else {
                    for (let i = 1; i <= maxCorrection; i++) {
                        if (this.canMove(this.x + i, this.y + dy)) {
                            this.x += i;
                            this.y += dy;
                            moved = true;
                            break;
                        }
                        if (this.canMove(this.x - i, this.y + dy)) {
                            this.x -= i;
                            this.y += dy;
                            moved = true;
                            break;
                        }
                    }
                }
            }

            // Movimiento diagonal: sin corrección, solo probar ejes por separado
            if (!moved && dx !== 0 && dy !== 0) {
                if (this.canMove(this.x + dx, this.y)) {
                    this.x += dx;
                    moved = true;
                } else if (this.canMove(this.x, this.y + dy)) {
                    this.y += dy;
                    moved = true;
                }
            }
        }

        this.updateHitbox();
    }

    canMove(newX, newY) {

        this.hitbox.x = newX + this.width / 2 - 12;
        this.hitbox.y = newY + this.height / 2 + 8;

        for (let i = 0; i < mapLimits.length; i++) {
            if (isOverlapping(this.hitbox, mapLimits[i])) return false;
        }

        for (let i = 0; i < terrainObjects.length; i++) {
            if (isOverlapping(this.hitbox, terrainObjects[i].hitbox)) return false;
        }

        return true;
    }
}