import { ctx } from "./app.js";

export class Hitbox {

    constructor(x, y, width, height, lifespan = undefined) {

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.lifespan = lifespan;
        this.enabled = true;
    }

    tick() {
        if (this.lifespan != undefined) {
            this.lifespan--;

            if (this.lifespan <= 0) {
                this.enabled = false;
                return;
            }
        }
    }

    draw() {
        if (this.enabled) ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}