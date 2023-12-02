import * as fs from 'node:fs/promises';

let file = await fs.open("input.txt");
let gameCount = 0;
let result = 0;

// every line is one game
for await (const line of file.readLines()) {
    let str = `Game ${++gameCount}:`;
    let data = line.slice(line.indexOf(str) + str.length);
    let sets = data.split(";");

    // highest nrs per game
    let highestRed = 0;
    let highestGreen = 0;
    let highestBlue = 0;


    sets.forEach(set => {
        let [r, g, b] = calculateLowestPerSet(set);

        if(r > highestRed){
            highestRed = r;
        }

        if(g > highestGreen){
            highestGreen = g;
        }

        if(b > highestBlue){
            highestBlue = b;
        }
    });
    result += highestRed * highestGreen * highestBlue;
}

console.log(result);

/**
 * set can be 5 red, 3 green, 4 blue]
 * @param set
 * @return {number[]}
 */
function calculateLowestPerSet(set) {
    let highestRed = 0;
    let highestGreen = 0;
    let highestBlue = 0;

    const COLOR_AMOUNT_INDEX = 0;
    const COLOR_NAME_INDEX = 1;

    let balls = set.split(",");

    balls.forEach(ball => {
        let valAndColor = ball.trim().split(" ");

        if(valAndColor[COLOR_NAME_INDEX] === "red"){
            highestRed = parseInt(valAndColor[COLOR_AMOUNT_INDEX]);
        }

        if(valAndColor[COLOR_NAME_INDEX] === "green"){
            highestGreen = parseInt(valAndColor[COLOR_AMOUNT_INDEX]);
        }

        if(valAndColor[COLOR_NAME_INDEX] === "blue"){
            highestBlue = parseInt(valAndColor[COLOR_AMOUNT_INDEX]);
        }
    });

    return [highestRed, highestGreen, highestBlue];
}
