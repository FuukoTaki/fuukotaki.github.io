import { canvas, ctx, scale, gameLoop } from "./app.js";

const fps = 60;
const interval = 1000 / fps;
let deltaTime = 0;
let lastTime = 0;

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

// -- GAME LOOP CONTROLLER --

/**
 * Controls the time between frames, calling the next one
 * when it needs to be called.
 * Used to add a specific frame rate to the game and preventing
 * requestAnimationFrame from setting a frame rate based
 * on device refresh rate. This will ensure all devices work at
 * the same frame rate.
*/
export function gameLoopController(time) {
    deltaTime = time - lastTime;
    if (deltaTime > interval) {
        lastTime = time - (deltaTime % interval);
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas.
        ctx.scale(scale, scale); // Set scale if was modified.
        gameLoop(); // Call next frame.
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    requestAnimationFrame(gameLoopController);
}