import { mapGeneration } from "./mapGeneration.js";

export function getNeighbor(x, y, z, dx, dy, targetValue = undefined) {
    // Get neighbor offset position.
    const nx = x + dx;
    const ny = y + dy;

    // Make sure the neighbor is on the array limits.
    if (nx < 0 || nx >= mapGeneration.length ||
        ny < 0 || ny >= mapGeneration[0].length ||
        z < 0 || z >= mapGeneration[0][0].length
    ) return false;

    // Get the neighbor value.
    const value = mapGeneration[nx][ny][z];
    // Check if exist a tile there, (any value above 0).
    if (targetValue === undefined) return value > 0;
    // Check if the value is the desired one.
    return value === targetValue;
}