import * as fs from 'node:fs/promises';

let file = await fs.open("input.txt");
let gameCount = 0;
let result = 0;

// every line is one game
for await (const line of file.readLines()) {
    let str = `Game ${++gameCount}:`;
    let data = line.slice(line.indexOf(str) + str.length);
    let sets = data.split(";");
    let isImpossible = false;


    for (const element of sets) {
        if (isImpossible) { // quit when an impossible set has already been found
            break;
        }
        isImpossible = setContainsImpossible(element);
    }

    if (isImpossible) {
        console.log("Impossible: ", line);
    } else {
        console.log("Possible: ", line);
        result += gameCount;
    }
}

console.log(result)

/**
 *
 * set can be "
 * @param set {string}
 * @return {boolean}
 */
function setContainsImpossible(set) {
    console.log(set)
    const COLOR_AMOUNT_INDEX = 0;
    const COLOR_NAME_INDEX = 1;
    const LIMITS = [{color: "red", limit: 12}, {color: "green", limit: 13}, {color: "blue", limit: 14}];

    let result = false;

    let balls = set.split(",");

    balls.forEach(ball => {
        let valAndColor = ball.trim().split(" ");
        let found = LIMITS.find((l) => {
            return l.color === valAndColor[COLOR_NAME_INDEX];
        });
        if (valAndColor[COLOR_AMOUNT_INDEX] > found.limit) {
            result = true;
        }
    });

    return result;
};
