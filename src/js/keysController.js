// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----

// -- KEYS CONTROLLER --

// Stores a list of all available keys for player movement
// or their attacks.
export const KeysInput = {

    // -- Movement --
    w: false,
    s: false,
    a: false,
    d: false,
    spacebar: false,
    j: false,

    // -- Attacks --

};

// Enable keyboard detection.
// Call this function in order to work.
export function addKeysListeners() {

    // Check is a key is being pressed.
    window.addEventListener("keydown", (e) => {
        const key = e.key.toLowerCase();
        if (key === "w") KeysInput.w = true;
        if (key === "s") KeysInput.s = true;
        if (key === "a") KeysInput.a = true;
        if (key === "d") KeysInput.d = true;
        if (key === " ") KeysInput.spacebar = true;
        if (key === "j") KeysInput.j = true;
    });

    // Check if a key is released.
    window.addEventListener("keyup", (e) => {
        const key = e.key.toLowerCase();
        if (key === "w") KeysInput.w = false;
        if (key === "s") KeysInput.s = false;
        if (key === "a") KeysInput.a = false;
        if (key === "d") KeysInput.d = false;
        if (key === " ") KeysInput.spacebar = false;
        if (key === "j") KeysInput.j = false;
    });
};

// ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----