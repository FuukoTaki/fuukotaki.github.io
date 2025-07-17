import { addKeysListeners } from "./keysController.js";
import { Player } from "./player.js";
import { gameLoopController } from "./gameLoopController.js";
import { VCam } from "./vCam.js";
import { spritesSRC, loadSpritesheets } from "./loader.js";
import { generateMap, mapGeneration } from "./mapGeneration.js";
import { addTerrainLimits, addTerrainObjects, drawMapFirstFloor, drawMapSecondFloor, drawTerrainObjects } from "./mapDrawing.js";

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

// -- VARIABLES --

// Variables to access canvas and its context. Scale is used to zoom.
export let canvas, ctx, scale = 1;
const scaleMin = 1;
const scaleMax = 4;
const scaleIncrement = 1;

export let ground;
export let grass;
export let rock;

export let player;
let vCam;

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

// -- INITIAL CONFIGURATION --

// Triggered when HTML is loaded.
window.addEventListener("DOMContentLoaded", () => {

    // Set access to canvas and its context.
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    // Set canvas initial size.
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Listener to adjust canvas size to fit screen.
    window.addEventListener("resize", (e) => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Zoom in and out the entire game.
    window.addEventListener("wheel", (e) => {
        e.preventDefault();

        if (e.deltaY < 0 && scale < scaleMax) {
            scale += scaleIncrement;
            scale = Math.max(scaleMin, Math.min(scale, scaleMax));
            scale = parseFloat(scale.toFixed(1));
            vCam.setCentralPosition();
        }

        if (e.deltaY > 0 && scale > scaleMin) {
            scale -= scaleIncrement;
            scale = Math.max(scaleMin, Math.min(scale, scaleMax));
            scale = parseFloat(scale.toFixed(1));
            vCam.setCentralPosition();
        }
    }, { passive: false });

    // Start the loading of all spritesheets images.
    loadSpritesheets();
});

export function startGame() {

    generateMap();
    addTerrainLimits();
    addTerrainObjects();

    // Enable keys detection.
    addKeysListeners();

    player = new Player(loadPlayerSprites(),
        Math.floor(mapGeneration.length * 64 / 2 - 128),
        Math.floor(mapGeneration[0].length * 64 / 2 - 160));

    vCam = new VCam(player, 12);

    // Start game loop.
    requestAnimationFrame(gameLoopController);
}

function loadPlayerSprites() {

    const animationsAvailable = {
        IDLE: spritesSRC["princessIDLE"],
        WALK: spritesSRC["princessWALK"],
        ROLL: spritesSRC["princessROLL"],
        SLASH1: spritesSRC["princessSLASH1"],
        SLASH2: spritesSRC["princessSLASH2"],
    };

    return animationsAvailable;
}

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

// -- GAME LOOP --

export function gameLoop() {
    vCam.track(scale);
    drawMapFirstFloor();
    drawMapSecondFloor();
    drawTerrainObjects();
    player.tick(ctx);
};