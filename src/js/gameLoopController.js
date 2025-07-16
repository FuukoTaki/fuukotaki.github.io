// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

// -- IMPORTS --

import { canvas, ctx, scale, gameLoop } from "./app.js";

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

// -- VARIABLES --

// Used to control game loop frame rate and tick update.
const fps = 60;
const interval = 1000 / fps;
let lastTime = 0;

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

// -- GAME LOOP CONTROLLER --

// Check if needs to load next frame, then it calls gameLoop().
export function gameLoopController(time) {
    const deltaTime = time - lastTime;
    if (deltaTime > interval) {
        lastTime = time - (deltaTime % interval);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.scale(scale, scale);
        gameLoop();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    requestAnimationFrame(gameLoopController);
}

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----