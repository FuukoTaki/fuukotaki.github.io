export class TerrainObject {

    constructor(value, hitpoints, x, y, hitbox) {

        this.value = value;
        this.hitpoints = hitpoints;
        this.x = x * 64;
        this.y = y * 64;
        this.hitbox = hitbox;
        this.i = x;
        this.j = y;
    }
}