// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

// -- IMPORTS --

import { ctx } from "./app.js";
import { spritesSRC } from "./loader.js";
import { Hitbox } from "./hitbox.js";
import { mapCollisions, terrainDecorations } from "./globalVariables.js";

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

// -- VARIABLES --

// Set island size in X, Y and Z.
const islandW = 9;
const islandH = 10;
const islandD = 2;

// Set tiles size.
const tileWidth = 64;
const tileHeight = 64;

// Dictionary to draw water tiles.
const WATER_SPRITES = {
    0: [0, 448],   // Single
    1: [64, 448],  // Right
    2: [192, 448], // Left
    3: [128, 448], // Middle
};

// Dictionary to draw ground tiles.
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

// Create 3D array filled with 0.
export const island = new Array(islandW).fill(0).map(() =>
    new Array(islandH).fill(0).map(() =>
        new Array(islandD).fill(0)
    )
);

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

// -- MAP GENERATION --

/**
 * 0 = empty
 * 1 = water
 * 2 = ground
 * 3 = grass1
 * 4 = grass2
 * 5 = grass3
 * 6 = grass4
 * 7 = rock1
 * 8 = rock2
 * 9 = rock3
 * 10 = rock
 */

const waterChange = 1;
const grassChance = 0.02;
const rockChance = 0.02;
const bushChance = 0.02;
const flowerChance = 0.02;
const redFlowerChance = 0.02;
const whiteFlowerChancce = 0.02;
const mushroomChance = 0.02;

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

// -- ISLAND GENERATION --

// Ground.
generateEnviroment("ground", 2, 0, 0.88);
//Make sure middle tile is always ground.
island[Math.floor(islandW / 2)][Math.floor(islandH / 2 - 1)][0] = 2;

// Water.
generateEnviroment("water", 1, 0, waterChange, (i, j, k) => {
    return island[i][j][k] === 0 && getNeighbor(i, j, k, 0, -1, 2);
});

// Grass.
generateEnviroment("grass", 3, 1, grassChance, (i, j, k) => {
    return island[i][j][k] === 0 && island[i][j][0] === 2;
});
generateEnviroment("grass", 4, 1, grassChance, (i, j, k) => {
    return island[i][j][k] === 0 && island[i][j][0] === 2;
});
generateEnviroment("grass", 5, 1, grassChance, (i, j, k) => {
    return island[i][j][k] === 0 && island[i][j][0] === 2;
});
generateEnviroment("grass", 6, 1, grassChance, (i, j, k) => {
    return island[i][j][k] === 0 && island[i][j][0] === 2;
});

// Rock.
generateEnviroment("rock", 7, 1, rockChance, (i, j, k) => {
    return island[i][j][k] === 0 && island[i][j][0] === 2;
});
generateEnviroment("rock", 8, 1, rockChance, (i, j, k) => {
    return island[i][j][k] === 0 && island[i][j][0] === 2;
});
generateEnviroment("rock", 9, 1, rockChance, (i, j, k) => {
    return island[i][j][k] === 0 && island[i][j][0] === 2;
});
generateEnviroment("rock", 10, 1, rockChance, (i, j, k) => {
    return island[i][j][k] === 0 && island[i][j][0] === 2;
});

// Bush.
generateEnviroment("bush", 11, 1, bushChance, (i, j, k) => {
    return island[i][j][k] === 0 && island[i][j][0] === 2;
});

// Flower.
generateEnviroment("flower", 12, 1, flowerChance, (i, j, k) => {
    return island[i][j][k] === 0 && island[i][j][0] === 2;
});
generateEnviroment("flower", 13, 1, flowerChance, (i, j, k) => {
    return island[i][j][k] === 0 && island[i][j][0] === 2;
});
generateEnviroment("flower", 14, 1, flowerChance, (i, j, k) => {
    return island[i][j][k] === 0 && island[i][j][0] === 2;
});

// Red flower.
generateEnviroment("redFlower", 15, 1, redFlowerChance, (i, j, k) => {
    return island[i][j][k] === 0 && island[i][j][0] === 2;
});
generateEnviroment("redFlower", 16, 1, redFlowerChance, (i, j, k) => {
    return island[i][j][k] === 0 && island[i][j][0] === 2;
});
generateEnviroment("redFlower", 17, 1, redFlowerChance, (i, j, k) => {
    return island[i][j][k] === 0 && island[i][j][0] === 2;
});

// White flower.
generateEnviroment("whiteFlower", 18, 1, whiteFlowerChancce, (i, j, k) => {
    return island[i][j][k] === 0 && island[i][j][0] === 2;
});
generateEnviroment("whiteFlower", 19, 1, whiteFlowerChancce, (i, j, k) => {
    return island[i][j][k] === 0 && island[i][j][0] === 2;
});
generateEnviroment("whiteFlower", 20, 1, whiteFlowerChancce, (i, j, k) => {
    return island[i][j][k] === 0 && island[i][j][0] === 2;
});

// Mushroom.
generateEnviroment("mushroom", 21, 1, mushroomChance, (i, j, k) => {
    return island[i][j][k] === 0 && island[i][j][0] === 2;
});
generateEnviroment("mushroom", 22, 1, mushroomChance, (i, j, k) => {
    return island[i][j][k] === 0 && island[i][j][0] === 2;
});
generateEnviroment("mushroom", 23, 1, mushroomChance, (i, j, k) => {
    return island[i][j][k] === 0 && island[i][j][0] === 2;
});

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

// -- COLLISIONS --

// Terrain.
for (let i = 0; i < island.length; i++) {
    for (let j = 0; j < island[i].length; j++) {

        const tile = island[i][j][0];

        if (tile === 0) mapCollisions.push(new Hitbox(i * 64, j * 64, 64, 64));
        if (tile === 1) mapCollisions.push(new Hitbox(i * 64, j * 64, 64, 64));
    }
}

// Terrain decorations.
for (let i = 0; i < island.length; i++) {
    for (let j = 0; j < island[i].length; j++) {

        const tile = island[i][j][1];

        const x = 16;
        const y = 16;
        const width = 36;
        const height = 36;

        if (tile === 7) terrainDecorations.push(new Hitbox(i * 64 + x, j * 64 + y, width, height));
        if (tile === 8) terrainDecorations.push(new Hitbox(i * 64 + x, j * 64 + y, width, height));
        if (tile === 9) terrainDecorations.push(new Hitbox(i * 64 + x, j * 64 + y, width, height));
        if (tile === 10) terrainDecorations.push(new Hitbox(i * 64 + x, j * 64 + y, width, height));
        if (tile === 11) terrainDecorations.push(new Hitbox(i * 64 + x, j * 64 + y, width, height));
    }
}

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

/**
 * Generates a desired number on a random location in the island map,
 * when a certain codition meets, like the chance to generate it and
 * a callback function with extra requirements.
 */
function generateEnviroment(name, valueToAssign, layer, chance, callback = null) {

    // Check if ground is being generated to avoid last Y row.
    let islandY = island[0].length;
    if (name === "ground") islandY--;

    // Loop through the array items.
    for (let i = 0; i < island.length; i++) {
        for (let j = 0; j < islandY; j++) {

            // Check if the chance meets to create a tile.
            if (Math.random() < chance) {
                // Check extra requirements.
                if (callback && !callback(i, j, layer)) continue;
                // Add value to the tile.
                island[i][j][layer] = valueToAssign;
            }
        }
    }
};

// Check if a tile has a neighbor on a desired location.
function getNeighbor(x, y, z, dx, dy, targetValue = undefined) {
    // Get neighbor offset position.
    const nx = x + dx;
    const ny = y + dy;

    // Make sure the neighbor is on the array limits.
    if (nx < 0 || nx >= island.length ||
        ny < 0 || ny >= island[0].length ||
        z < 0 || z >= island[0][0].length
    ) return false;

    // Get the neighbor value.
    const value = island[nx][ny][z];
    // Check if exist a tile there, (any value above 0).
    if (targetValue === undefined) return value > 0;
    // Check if the value is the desired one.
    return value === targetValue;
}

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

// -- MAP DRAWING --

// Call this on the game loop.
export function drawMap() {
    for (let i = 0; i < island.length; i++) {
        for (let j = 0; j < island[i].length; j++) {
            for (let k = 0; k < island[i][j].length; k++) {

                // Get tile value.
                const tile = island[i][j][k];

                // Draw tile based on its value.
                if (tile === 2) drawGroundTile(i, j);
                if (tile === 1) drawWaterTile(i, j);
                if (tile >= 3 && tile <= 6) drawGrassTile(i, j);
                if (tile >= 7 && tile <= 10) drawRockTile(i, j);
                if (tile === 11) drawBushTile(i, j);
                if (tile >= 12 && tile <= 14) drawFlowerTile(i, j);
                if (tile >= 15 && tile <= 17) drawRedFlowerTile(i, j);
                if (tile >= 18 && tile <= 20) drawWhiteFlowerTile(i, j);
                if (tile >= 21 && tile <= 23) drawMushroomTile(i, j);
            }
        }
    }
}

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

    if (island[x][y][1] === 3) grassTile = "grass1";
    if (island[x][y][1] === 4) grassTile = "grass2";
    if (island[x][y][1] === 5) grassTile = "grass3";
    if (island[x][y][1] === 6) grassTile = "grass4";

    ctx.drawImage(spritesSRC[grassTile], 0, 0, 64, 64, 64 * x, 64 * y, 64, 64);
}

function drawRockTile(x, y) {

    let rockTile;

    if (island[x][y][1] === 7) rockTile = "rock1";
    if (island[x][y][1] === 8) rockTile = "rock2";
    if (island[x][y][1] === 9) rockTile = "rock3";
    if (island[x][y][1] === 10) rockTile = "rock4";

    ctx.drawImage(spritesSRC[rockTile], 0, 0, 64, 64, 64 * x, 64 * y, 64, 64);
}

function drawBushTile(x, y) {
    ctx.drawImage(spritesSRC["bush"], 0, 0, 64, 64, 64 * x, 64 * y, 64, 64);
}

function drawFlowerTile(x, y) {

    let flowerTile;

    if (island[x][y][1] === 12) flowerTile = "flower1";
    if (island[x][y][1] === 13) flowerTile = "flower2";
    if (island[x][y][1] === 14) flowerTile = "flower3";

    ctx.drawImage(spritesSRC[flowerTile], 0, 0, 64, 64, 64 * x, 64 * y, 64, 64);
}

function drawRedFlowerTile(x, y) {

    let redFlowerTile;

    if (island[x][y][1] === 15) redFlowerTile = "redFlower1";
    if (island[x][y][1] === 16) redFlowerTile = "redFlower2";
    if (island[x][y][1] === 17) redFlowerTile = "redFlower3";

    ctx.drawImage(spritesSRC[redFlowerTile], 0, 0, 64, 64, 64 * x, 64 * y, 64, 64);
}

function drawWhiteFlowerTile(x, y) {

    let whiteFlowerTile;

    if (island[x][y][1] === 18) whiteFlowerTile = "whiteFlower1";
    if (island[x][y][1] === 19) whiteFlowerTile = "whiteFlower2";
    if (island[x][y][1] === 20) whiteFlowerTile = "whiteFlower3";

    ctx.drawImage(spritesSRC[whiteFlowerTile], 0, 0, 64, 64, 64 * x, 64 * y, 64, 64);
}

function drawMushroomTile(x, y) {

    let mushroomTile;

    if (island[x][y][1] === 21) mushroomTile = "mushroom1";
    if (island[x][y][1] === 22) mushroomTile = "mushroom2";
    if (island[x][y][1] === 23) mushroomTile = "mushroom3";

    ctx.drawImage(spritesSRC[mushroomTile], 0, 0, 64, 64, 64 * x, 64 * y, 64, 64);
}