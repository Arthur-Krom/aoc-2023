import * as fs from 'node:fs/promises';

console.log("---start---");

let file = await fs.open("input.txt");
let result = 0;
let cardNr = 0;

for await (const card of file.readLines()) {
    let cardStr = `Card  ${++cardNr}:`;

    if (cardNr < 10) {
        cardStr = `Card   ${cardNr}:`;
    }

    let data = card.slice(card.indexOf(cardStr) + cardStr.length);
    let winningNrs = data.slice(0, data.indexOf("|")).trim();
    let winningNrsArr = winningNrs.split(" ");

    let playerNrs = data.slice(data.indexOf("|") + 1).trim();
    let playerNrsArr = playerNrs.split(" ").filter((s) => {
        return s !== '';
    });

    let scoreCount = 0;

    for (const nr of playerNrsArr) {
        if (winningNrsArr.includes(nr)) {
            if (scoreCount === 0) {
                scoreCount = 1;
            } else {
                scoreCount *= 2;
            }
        }
    }

    result += scoreCount;
}


console.log(result);