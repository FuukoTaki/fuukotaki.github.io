import { getNeighbor } from "./getNeighbor.js";

export let mapGeneration = [];

const mapWidth = 13;
const mapHeight = 13;
const mapDeep = 2;

const groundchance = 0.88;
const waterChance = 1;
const grassChance = 0.02;
const rockChance = 0.02;
const bushChance = 0.02;
const flowerChance = 0.02;
const redFlowerChance = 0.02;
const whiteFlowerChancce = 0.02;
const mushroomChance = 0.02;

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

function generateEnviroment(name, valueToAssign, layer, chance, callback = null) {

    for (let i = 0; i < mapGeneration.length; i++) {
        for (let j = 0; j < mapGeneration[i].length; j++) {

            if (Math.random() < chance) {
                if (callback && !callback(i, j, layer)) continue;
                mapGeneration[i][j][layer] = valueToAssign;
            }
        }
    }
};

function removeBorders() {
    for (let i = 0; i < mapGeneration.length; i++) {
        for (let j = 0; j < mapGeneration[i].length; j++) {
            if (i === 0 || j === 0 || i === mapGeneration.length - 1
                || j === mapGeneration[i].length - 1) mapGeneration[i][j][0] = 0;
        }
    }
}

export function generateMap() {

    mapGeneration = new Array(mapWidth).fill(0).map(() =>
        new Array(mapHeight).fill(0).map(() =>
            new Array(mapDeep).fill(0)
        )
    );

    // Ground.
    generateEnviroment("ground", 2, 0, groundchance);

    // Remove map borders. To add water and limits later.
    removeBorders();

    // Make middle tile always a ground tile.
    const centerX = Math.floor(mapWidth / 2);
    const centerY = Math.floor(mapHeight / 2);
    mapGeneration[centerX][centerY][0] = 2;

    // Water.
    generateEnviroment("water", 1, 0, waterChance, (i, j, k) => {
        return mapGeneration[i][j][k] === 0 && getNeighbor(i, j, k, 0, -1, 2);
    });
    // Grass.
    generateEnviroment("grass", 3, 1, grassChance, (i, j, k) => {
        return mapGeneration[i][j][k] === 0 && mapGeneration[i][j][0] === 2;
    });
    generateEnviroment("grass", 4, 1, grassChance, (i, j, k) => {
        return mapGeneration[i][j][k] === 0 && mapGeneration[i][j][0] === 2;
    });
    generateEnviroment("grass", 5, 1, grassChance, (i, j, k) => {
        return mapGeneration[i][j][k] === 0 && mapGeneration[i][j][0] === 2;
    });
    generateEnviroment("grass", 6, 1, grassChance, (i, j, k) => {
        return mapGeneration[i][j][k] === 0 && mapGeneration[i][j][0] === 2;
    });

    // Rock.
    generateEnviroment("rock", 7, 1, rockChance, (i, j, k) => {
        return mapGeneration[i][j][k] === 0 && mapGeneration[i][j][0] === 2;
    });
    generateEnviroment("rock", 8, 1, rockChance, (i, j, k) => {
        return mapGeneration[i][j][k] === 0 && mapGeneration[i][j][0] === 2;
    });
    generateEnviroment("rock", 9, 1, rockChance, (i, j, k) => {
        return mapGeneration[i][j][k] === 0 && mapGeneration[i][j][0] === 2;
    });
    generateEnviroment("rock", 10, 1, rockChance, (i, j, k) => {
        return mapGeneration[i][j][k] === 0 && mapGeneration[i][j][0] === 2;
    });

    // Bush.
    generateEnviroment("bush", 11, 1, bushChance, (i, j, k) => {
        return mapGeneration[i][j][k] === 0 && mapGeneration[i][j][0] === 2;
    });

    // Flower.
    generateEnviroment("flower", 12, 1, flowerChance, (i, j, k) => {
        return mapGeneration[i][j][k] === 0 && mapGeneration[i][j][0] === 2;
    });
    generateEnviroment("flower", 13, 1, flowerChance, (i, j, k) => {
        return mapGeneration[i][j][k] === 0 && mapGeneration[i][j][0] === 2;
    });
    generateEnviroment("flower", 14, 1, flowerChance, (i, j, k) => {
        return mapGeneration[i][j][k] === 0 && mapGeneration[i][j][0] === 2;
    });

    // Red flower.
    generateEnviroment("redFlower", 15, 1, redFlowerChance, (i, j, k) => {
        return mapGeneration[i][j][k] === 0 && mapGeneration[i][j][0] === 2;
    });
    generateEnviroment("redFlower", 16, 1, redFlowerChance, (i, j, k) => {
        return mapGeneration[i][j][k] === 0 && mapGeneration[i][j][0] === 2;
    });
    generateEnviroment("redFlower", 17, 1, redFlowerChance, (i, j, k) => {
        return mapGeneration[i][j][k] === 0 && mapGeneration[i][j][0] === 2;
    });

    // White flower.
    generateEnviroment("whiteFlower", 18, 1, whiteFlowerChancce, (i, j, k) => {
        return mapGeneration[i][j][k] === 0 && mapGeneration[i][j][0] === 2;
    });
    generateEnviroment("whiteFlower", 19, 1, whiteFlowerChancce, (i, j, k) => {
        return mapGeneration[i][j][k] === 0 && mapGeneration[i][j][0] === 2;
    });
    generateEnviroment("whiteFlower", 20, 1, whiteFlowerChancce, (i, j, k) => {
        return mapGeneration[i][j][k] === 0 && mapGeneration[i][j][0] === 2;
    });

    // Mushroom.
    generateEnviroment("mushroom", 21, 1, mushroomChance, (i, j, k) => {
        return mapGeneration[i][j][k] === 0 && mapGeneration[i][j][0] === 2;
    });
    generateEnviroment("mushroom", 22, 1, mushroomChance, (i, j, k) => {
        return mapGeneration[i][j][k] === 0 && mapGeneration[i][j][0] === 2;
    });
    generateEnviroment("mushroom", 23, 1, mushroomChance, (i, j, k) => {
        return mapGeneration[i][j][k] === 0 && mapGeneration[i][j][0] === 2;
    });
}