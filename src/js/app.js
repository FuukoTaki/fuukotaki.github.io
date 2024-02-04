// ---- ---- ---- ---- ---- ---- ---- ----

// Wait until DOM is fully loaded.
window.addEventListener("DOMContentLoaded", (e) => {

    console.log("Ready to work with JS.");

    // ---- ---- ---- ---- ---- ---- ---- ----

    // -- ACCESS TO HTML ELEMENTS--
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    // Set canvas size.
    canvas.width = 256 * 2;
    canvas.height = 256 * 2;

    // ---- ---- ---- ---- ---- ---- ---- ----

    // -- BLOCKS SOURCES --

    let blocks = 6;

    // Blocks.
    let grass = new Image();
    let dirt = new Image();
    let stone = new Image();
    let bedrock = new Image();

    // Ores.
    let coal = new Image();
    let iron = new Image();
    let diamond = new Image();

    // Trees.
    let log = new Image();
    let leaves = new Image();

    grass.src = "./src/img/grass.png";
    dirt.src = "./src/img/dirt.png";
    stone.src = "./src/img/stone.png";
    bedrock.src = "./src/img/bedrock.png";

    coal.src = "./src/img/coal.png";
    iron.src = "./src/img/iron.png";
    diamond.src = "./src/img/diamond.png";

    log.src = "./src/img/log.png";
    leaves.src = "./src/img/leaves.png";

    grass.onload = () => {

        blocks--;
        if (blocks === 0) requestAnimationFrame(gameLoop);

        console.log("Grass ready.");
    };

    dirt.onload = () => {

        blocks--;
        if (blocks === 0) requestAnimationFrame(gameLoop);

        console.log("Dirt ready.");
    };

    stone.onload = () => {

        blocks--;
        if (blocks === 0) requestAnimationFrame(gameLoop);

        console.log("Stone ready.");
    };

    bedrock.onload = () => {

        blocks--;
        if (blocks === 0) requestAnimationFrame(gameLoop);

        console.log("Bedrock ready.");
    };

    log.onload = () => {

        blocks--;
        if (blocks === 0) requestAnimationFrame(gameLoop);

        console.log("Log ready.");
    };

    leaves.onload = () => {

        blocks--;
        if (blocks === 0) requestAnimationFrame(gameLoop);

        console.log("Leaves ready.");
    };

    // ---- ---- ---- ---- ---- ---- ---- ----

    // -- MINECRAFT MAP --
    let blockSize = 16;
    let mapWidth = 32;
    let mapHeight = 32;

    let map = [];
    let trees = [];

    for (let i = 0; i < mapWidth; i++) {

        let mapRow = [];

        for (let j = 0; j < mapHeight; j++) {

            mapRow.push(0);
        }

        map.push(mapRow);
    }

    console.log(map);

    // ---- ---- ---- ---- ---- ---- ---- ----

    // -- CREATE RANDOM ENVIROMENT --

    for (let i = 0; i < map.length; i++) {

        for (let j = 0; j < map[i].length; j++) {

            // ---- ---- ---- ---- ---- ---- ---- ----

            // -- GRASS GENERATION --

            // Grass. 1 Layer.
            if (j === 0) {

                map[i][j] = 0;

                // ---- ---- ---- ---- ---- ---- ---- ----

                // -- TREE GENERATION --
                
                if (Math.random() < 0.05) {
                    
                    let tree = {
                        x: i,
                        y: j,
                        height: 3 + Math.floor(Math.random() * 7)
                    }

                    console.log("Tree");
                    console.log(tree);

                    trees.push(tree);
                }

                // ---- ---- ---- ---- ---- ---- ---- ----
            }

            // ---- ---- ---- ---- ---- ---- ---- ----

            // -- DIRT AND STONE GENERATION --

            // Dirt. 2 Layers.
            if (j === 1 || j === 2) map[i][j] = 1;

            // Stone. Any other Layer.
            if (j >= 2) map[i][j] = 2;

            // ---- ---- ---- ---- ---- ---- ---- ----

            // -- ORE GENERATION --

            // Coal. From 2 and below.
            if (j >= 2 && Math.random() < 0.2) map[i][j] = 4;

            // Iron. From 10 and below.
            if (j >= 10 && Math.random() < 0.1) map[i][j] = 5;

            // Diamond. From 20 and below.
            if (j >= 20 && Math.random() < 0.05) map[i][j] = 6;

            // ---- ---- ---- ---- ---- ---- ---- ----

            // -- BEDROCK GENERATION --

            // Bedrock. Last layer.
            if (j >= map[i].length - 1) map[i][j] = 3;

            // ---- ---- ---- ---- ---- ---- ---- ----
        }
    }

    console.log(map);

    // ---- ---- ---- ---- ---- ---- ---- ----

    // -- EVENTS --

    let x = canvas.width / 2 - blockSize * mapWidth / 2;
    let y = canvas.height / 2;

    let up = false;
    let down = false;
    let right = false;
    let left = false;

    // Move VCAM.
    window.addEventListener("keydown", (e) => {

        let key = e.key;

        if (key === "w") up = true;
        if (key === "s") down = true;
        if (key === "d") right = true;
        if (key === "a") left = true;
    });

    window.addEventListener("keyup", (e) => {

        let key = e.key;

        if (key === "w") up = false;
        if (key === "s") down = false;
        if (key === "d") right = false;
        if (key === "a") left = false;
    });

    // ---- ---- ---- ---- ---- ---- ---- ----

    // -- GAME LOOP --

    function gameLoop() {

        if (up) y += 2;
        if (down) y -= 2;
        if (right) x -= 2;
        if (left) x += 2;

        // Clear canvas.
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw blocks.
        for (let i = 0; i < map.length; i++) {

            for (let j = 0; j < map[i].length; j++) {

                if (map[i][j] === 0) {

                    ctx.drawImage(grass, x + grass.width * i, y + grass.width * j);
                }

                if (map[i][j] === 1) {

                    ctx.drawImage(dirt, x + dirt.width * i, y + dirt.width * j);
                }

                if (map[i][j] === 2) {

                    ctx.drawImage(stone, x + stone.width * i, y + stone.width * j);
                }

                if (map[i][j] === 3) {

                    ctx.drawImage(bedrock, x + bedrock.width * i, y + bedrock.width * j);
                }

                if (map[i][j] === 4) {

                    ctx.drawImage(coal, x + coal.width * i, y + coal.width * j);
                }

                if (map[i][j] === 5) {

                    ctx.drawImage(iron, x + iron.width * i, y + iron.width * j);
                }

                if (map[i][j] === 6) {

                    ctx.drawImage(diamond, x + diamond.width * i, y + diamond.width * j);
                }
            }
        }

        // Draw trees.
        for (let i = 0; i < trees.length; i++) {

            let tree = trees[i];

            for (let j = 0; j < tree.height; j++) {

                // Draw trunk.
                ctx.drawImage(log, x + tree.x * blockSize, y + tree.y * blockSize - blockSize * j - blockSize);
            }

            let leavesSize = 7;

            for (let k = 0; k < leavesSize; k++) {

                for (let l = 0; l < leavesSize; l++) {

                    if (k === 0 && l === leavesSize - 1 ||
                        k === leavesSize - 1 && l === leavesSize - 1 ||
                        k === 0 && l === 0 ||
                        k === leavesSize - 1 && l === 0 ||
                        k === 1 && l === leavesSize - 1 ||
                        k === leavesSize - 2 && l === leavesSize - 1 ||
                        k === leavesSize - 1 && l === leavesSize - 2 ||
                        k === 0 && l === leavesSize - 2) {

                    } else {

                        ctx.drawImage(
                            leaves,
                            x + tree.x * blockSize - blockSize * k + blockSize * (Math.floor(leavesSize / 2)),
                            y - tree.height * blockSize - blockSize - blockSize * l
                        );
                    }

                    // Draw leaves.

                }
            }

            // Draw leaves.
            // ctx.drawImage(leaves, x + tree.x * blockSize, y + tree.y * blockSize - blockSize * tree.height - blockSize);
            // ctx.drawImage(leaves, x + tree.x * blockSize + blockSize, y + tree.y * blockSize - blockSize * tree.height - blockSize);
            // ctx.drawImage(leaves, x + tree.x * blockSize - blockSize, y + tree.y * blockSize - blockSize * tree.height - blockSize);
            // ctx.drawImage(leaves, x + tree.x * blockSize + blockSize * 2, y + tree.y * blockSize - blockSize * tree.height - blockSize);
            // ctx.drawImage(leaves, x + tree.x * blockSize - blockSize * 2, y + tree.y * blockSize - blockSize * tree.height - blockSize);
        }


        // Call next frame.
        requestAnimationFrame(gameLoop);
    }

    // ---- ---- ---- ---- ---- ---- ---- ----
});

// ---- ---- ---- ---- ---- ---- ---- ----