import { startGame } from "./app.js";

// Object to store all loaded sprites.
export const spritesSRC = {};

// Object that contains all sprites URL.
const spritesURL = {

    // -- PRINCESS --
    princessIDLE: "./src/img/princess/idle.png",
    princessWALK: "./src/img/princess/walk.png",
    princessROLL: "./src/img/princess/roll.png",
    princessSLASH1: "./src/img/princess/slash1.png",
    princessSLASH2: "./src/img/princess/slash2.png",

    // -- ENVIROMENT --
    ground: "./src/img/map/ground.png",

    grass1: "./src/img/map/grass1.png",
    grass2: "./src/img/map/grass2.png",
    grass3: "./src/img/map/grass3.png",
    grass4: "./src/img/map/grass4.png",

    rock1: "./src/img/map/rock1.png",
    rock2: "./src/img/map/rock2.png",
    rock3: "./src/img/map/rock3.png",
    rock4: "./src/img/map/rock4.png",

    bush: "./src/img/map/bush.png",

    flower1: "./src/img/map/flower1.png",
    flower2: "./src/img/map/flower2.png",
    flower3: "./src/img/map/flower3.png",

    redFlower1: "./src/img/map/redFlower1.png",
    redFlower2: "./src/img/map/redFlower2.png",
    redFlower3: "./src/img/map/redFlower3.png",

    whiteFlower1: "./src/img/map/whiteFlower1.png",
    whiteFlower2: "./src/img/map/whiteFlower2.png",
    whiteFlower3: "./src/img/map/whiteFlower3.png",

    mushroom1: "./src/img/map/mushroom1.png",
    mushroom2: "./src/img/map/mushroom2.png",
    mushroom3: "./src/img/map/mushroom3.png",
};

/**
 * Star loading all spritesheets. 
 * When all of them are loaded, call a function to start the game
 * configuration.
 */
export function loadSpritesheets() {

    // Debug.
    // console.log("Loading spritesheets...");

    // Loop through the URL's.
    for (let spritesheet in spritesURL) {

        // Check if the item exists.
        if (spritesURL.hasOwnProperty(spritesheet)) {

            // Debug.
            // console.log("Spritesheet found.");
            // console.log(`${spritesheet}: ${spritesURL[spritesheet]}`);

            // Create spritesheet image.
            let image = new Image();
            image.src = spritesURL[spritesheet];

            // Wait until image is loaded.
            image.onload = () => {

                // Save image on spritesSRC.
                spritesSRC[spritesheet] = image;

                // Debug.
                // console.log("Spritesheet loaded.");
                // console.log(spritesSRC);

                // Check if spritesSRC has the same length than spritesURL,
                // which means all images are loaded.
                if (Object.keys(spritesSRC).length
                    === Object.keys(spritesURL).length) {

                    // Debug.
                    // console.log("All spritesheets loaded.");
                    // console.log(spritesSRC);

                    // Call setup to start game config and gameloop.
                    startGame();
                }
            };
        }
    }
}