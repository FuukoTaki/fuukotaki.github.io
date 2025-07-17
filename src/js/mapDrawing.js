import { ctx } from "./app.js";
import { spritesSRC } from "./loader.js";
import { Hitbox } from "./hitbox.js";
import { getNeighbor } from "./getNeighbor.js";
import { mapGeneration } from "./mapGeneration.js";
import { TerrainObject } from "./terrainObject.js";
import { player } from "./app.js";
import { Player } from "./player.js";

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

// -- VARIABLES --

export const mapLimits = [];
export const terrainObjects = [];

const GROUND_SPRITES = {
    0: [0, 192],     // Single
    1: [0, 128],     // Bottom I
    2: [64, 192],    // Left -
    3: [512, 192],   // Bottom left corner
    4: [0, 0],       // Top I
    5: [0, 64],      // Middle I
    6: [512, 0],     // Top left corner
    7: [512, 64],    // T miss right
    8: [192, 192],   // Right -
    9: [704, 192],   // Bottom right corner
    10: [128, 192],  // Middle -
    11: [576, 192],  // T miss bottom
    12: [704, 0],    // Top right corner
    13: [704, 128],  // T miss left
    14: [640, 0],    // T miss top
    15: [576, 128],  // Center
};

const WATER_SPRITES = {
    0: [0, 448],   // Single
    1: [64, 448],  // Right
    2: [192, 448], // Left
    3: [128, 448], // Middle
};

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

export function addTerrainLimits() {
    for (let i = 0; i < mapGeneration.length; i++) {
        for (let j = 0; j < mapGeneration[i].length; j++) {

            const tile = mapGeneration[i][j][0];

            if (tile === 0 || tile === 1)
                mapLimits.push(new Hitbox(i * 64, j * 64, 64, 64));
        }
    }
}

export function addTerrainObjects() {
    for (let i = 0; i < mapGeneration.length; i++) {
        for (let j = 0; j < mapGeneration[i].length; j++) {

            const tile = mapGeneration[i][j][1];

            // Rocks. 3 hitpoins.
            if (tile >= 7 && tile <= 10) {

                const object = new TerrainObject(
                    tile, 3,
                    i, j,
                    new Hitbox(i * 64 + 16, j * 64 + 26, 32, 24)
                );

                terrainObjects.push(object);
            }

            // Bush. 2 hitpoints.
            if (tile === 11) {
                const object = new TerrainObject(
                    tile, 2,
                    i, j,
                    new Hitbox(i * 64 + 16, j * 64 + 24, 32, 24)
                );

                terrainObjects.push(object);
            }

            // Mushrooms. 1 hitpoint.
            if (tile === 21) {
                const object = new TerrainObject(
                    tile, 2,
                    i, j,
                    new Hitbox(i * 64 + 16, j * 64 + 24, 32, 24)
                );

                terrainObjects.push(object);
            }

            if (tile === 22) {
                const object = new TerrainObject(
                    tile, 2,
                    i, j,
                    new Hitbox(i * 64 + 20, j * 64 + 24, 24, 24)
                );

                terrainObjects.push(object);
            }

            if (tile === 23) {
                const object = new TerrainObject(
                    tile, 2,
                    i, j,
                    new Hitbox(i * 64 + 16, j * 64 + 16, 32, 32)
                );

                terrainObjects.push(object);
            }
        }
    }

    console.log(terrainObjects);
}

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

export function drawMapFirstFloor() {
    for (let i = 0; i < mapGeneration.length; i++) {
        for (let j = 0; j < mapGeneration[i].length; j++) {

            const tile = mapGeneration[i][j][0];

            if (tile === 1) drawWaterTile(i, j);
            if (tile === 2) drawGroundTile(i, j);
        }
    }

    drawMapLimits();
}

function drawMapLimits() {
    for (let i = 0; i < mapLimits.length; i++) {
        const limit = mapLimits[i];
        // limit.draw();
    }
}

export function drawMapSecondFloor() {
    for (let i = 0; i < mapGeneration.length; i++) {
        for (let j = 0; j < mapGeneration[i].length; j++) {

            const tile = mapGeneration[i][j][1];

            if (tile >= 3 && tile <= 6) drawGrassTile(i, j);
            // if (tile >= 7 && tile <= 10) drawRockTile(i, j);
            // if (tile === 11) drawBushTile(i, j);
            if (tile >= 12 && tile <= 14) drawFlowerTile(i, j);
            if (tile >= 15 && tile <= 17) drawRedFlowerTile(i, j);
            if (tile >= 18 && tile <= 20) drawWhiteFlowerTile(i, j);
            // if (tile >= 21 && tile <= 23) drawMushroomTile(i, j);
        }
    }
}

export function drawTerrainObjects() {

    const auxTerrainObjects = terrainObjects.slice();
    auxTerrainObjects.push(player);
    auxTerrainObjects.sort((a, b) => a.hitbox.y - b.hitbox.y);

    for (let i = 0; i < auxTerrainObjects.length; i++) {

        const object = auxTerrainObjects[i];

        if (object instanceof Player) {

            player.draw();
        }

        if (object.value >= 7 && object.value <= 10) {
            drawRockTile(object.i, object.j);
            // object.hitbox.draw();
        }

        if (object.value === 11) {
            drawBushTile(object.i, object.j);
            // object.hitbox.draw();
        }

        if (object.value >= 21 && object.value <= 23) {
            drawMushroomTile(object.i, object.j);
            // object.hitbox.draw();
        }

        // object.hitbox.draw();

        // if (tile >= 7 && tile <= 10) drawRockTile(i, j);
        // if (tile === 11) drawBushTile(i, j);
        // if (tile >= 21 && tile <= 23) drawMushroomTile(i, j);
    }
}

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

function drawGroundTile(x, y) {

    const up = getNeighbor(x, y, 0, 0, -1, 2);
    const right = getNeighbor(x, y, 0, 1, 0, 2);
    const down = getNeighbor(x, y, 0, 0, 1, 2);
    const left = getNeighbor(x, y, 0, -1, 0, 2);

    const mask = (up ? 1 : 0) | (right ? 2 : 0) | (down ? 4 : 0) | (left ? 8 : 0);
    const [sx, sy] = GROUND_SPRITES[mask];

    ctx.drawImage(spritesSRC["ground"], sx, sy, 64, 64, 64 * x, 64 * y, 64, 64);
}

function drawWaterTile(x, y) {
    const right = getNeighbor(x, y, 0, 1, 0, 1);
    const left = getNeighbor(x, y, 0, -1, 0, 1);

    const mask = (right ? 1 : 0) | (left ? 2 : 0);
    const [sx, sy] = WATER_SPRITES[mask];

    ctx.drawImage(spritesSRC["ground"], sx, sy, 64, 64, 64 * x, 64 * y, 64, 64);
}

function drawGrassTile(x, y) {

    let grassTile;

    if (mapGeneration[x][y][1] === 3) grassTile = "grass1";
    if (mapGeneration[x][y][1] === 4) grassTile = "grass2";
    if (mapGeneration[x][y][1] === 5) grassTile = "grass3";
    if (mapGeneration[x][y][1] === 6) grassTile = "grass4";

    ctx.drawImage(spritesSRC[grassTile], 0, 0, 64, 64, 64 * x, 64 * y, 64, 64);
}

function drawRockTile(x, y) {

    let rockTile;

    if (mapGeneration[x][y][1] === 7) rockTile = "rock1";
    if (mapGeneration[x][y][1] === 8) rockTile = "rock2";
    if (mapGeneration[x][y][1] === 9) rockTile = "rock3";
    if (mapGeneration[x][y][1] === 10) rockTile = "rock4";

    ctx.drawImage(spritesSRC[rockTile], 0, 0, 64, 64, 64 * x, 64 * y, 64, 64);
}

function drawBushTile(x, y) {
    ctx.drawImage(spritesSRC["bush"], 0, 0, 64, 64, 64 * x, 64 * y, 64, 64);
}

function drawFlowerTile(x, y) {

    let flowerTile;

    if (mapGeneration[x][y][1] === 12) flowerTile = "flower1";
    if (mapGeneration[x][y][1] === 13) flowerTile = "flower2";
    if (mapGeneration[x][y][1] === 14) flowerTile = "flower3";

    ctx.drawImage(spritesSRC[flowerTile], 0, 0, 64, 64, 64 * x, 64 * y, 64, 64);
}

function drawRedFlowerTile(x, y) {

    let redFlowerTile;

    if (mapGeneration[x][y][1] === 15) redFlowerTile = "redFlower1";
    if (mapGeneration[x][y][1] === 16) redFlowerTile = "redFlower2";
    if (mapGeneration[x][y][1] === 17) redFlowerTile = "redFlower3";

    ctx.drawImage(spritesSRC[redFlowerTile], 0, 0, 64, 64, 64 * x, 64 * y, 64, 64);
}

function drawWhiteFlowerTile(x, y) {

    let whiteFlowerTile;

    if (mapGeneration[x][y][1] === 18) whiteFlowerTile = "whiteFlower1";
    if (mapGeneration[x][y][1] === 19) whiteFlowerTile = "whiteFlower2";
    if (mapGeneration[x][y][1] === 20) whiteFlowerTile = "whiteFlower3";

    ctx.drawImage(spritesSRC[whiteFlowerTile], 0, 0, 64, 64, 64 * x, 64 * y, 64, 64);
}

function drawMushroomTile(x, y) {

    let mushroomTile;

    if (mapGeneration[x][y][1] === 21) mushroomTile = "mushroom1";
    if (mapGeneration[x][y][1] === 22) mushroomTile = "mushroom2";
    if (mapGeneration[x][y][1] === 23) mushroomTile = "mushroom3";

    ctx.drawImage(spritesSRC[mushroomTile], 0, 0, 64, 64, 64 * x, 64 * y, 64, 64);
}