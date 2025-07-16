import { Hitbox } from "./hitbox.js";
import { mapCollisions, terrainDecorations } from "./globalVariables.js";
import { island } from "./map.js";

// This is used to limit the player and entities movement.
// Prevents them from moving to a non desired place.

export const playerAttackCollisions = [];

export function drawMapCollisions() {

    for (let i = 0; i < mapCollisions.length; i++) {
        const hitbox = mapCollisions[i];
        hitbox.draw();
    }

    for (let i = 0; i < terrainDecorations.length; i++) {
        const hitbox = terrainDecorations[i];
        hitbox.draw();
    }
}

export function drawPlayerAttackCollisions() {
    for (let i = 0; i < playerAttackCollisions.length; i++) {
        const hitbox = playerAttackCollisions[i];
        hitbox.draw();
    }
}

export function addPlayerAttackCollision(x, y, width, height) {
    const hitbox = new Hitbox(x, y, width, height, 1);
    playerAttackCollisions.push(hitbox);
    console.log("Collision added.");
}

export function checkPlayerAttackCollisionsAndTerrainDecorationsCollisions() {

    let i = terrainDecorations.length - 1;

    while (i > - 1) {

        let j = playerAttackCollisions.length - 1;
        const terrainHitbox = terrainDecorations[i];

        while (j > - 1) {

            const attackHitbox = playerAttackCollisions[j];

            if (isOverlapping(terrainHitbox, attackHitbox)
                && attackHitbox.enabled && terrainHitbox.enabled) {

                console.log("HIT!");

                terrainHitbox.enabled = false;

                const x = Math.floor(terrainHitbox.x / 64);
                const y = Math.floor(terrainHitbox.y / 64);
                island[x][y][1] = 0;
                terrainDecorations.splice(i, 1);
            }

            j--;
        }

        i--;
    }

    // Tick player collisions and removes the disabled ones.
    let l = playerAttackCollisions.length - 1;

    while (l > - 1) {
        const hitbox = playerAttackCollisions[l];
        hitbox.tick();
        if (!hitbox.enabled) playerAttackCollisions.splice(i, 1);
        l--;
    }
}

export function isOverlapping(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}