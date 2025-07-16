export const KeysInput = {
    w: false,
    s: false,
    a: false,
    d: false,
    spacebar: false,
    j: false,
};

const keysValues = {
    w: "w",
    s: "s",
    a: "a",
    d: "d",
    " ": "spacebar",
    j: "j"
}

export function addKeysListeners() {
    window.addEventListener("keydown", (e) => {
        updateKey(e.key.toLowerCase(), true);
    });

    window.addEventListener("keyup", (e) => {
        updateKey(e.key.toLowerCase(), false);
    });
};

function updateKey(key, value) {
    const checkKey = keysValues[key];
    if (checkKey in KeysInput) KeysInput[checkKey] = value;
}