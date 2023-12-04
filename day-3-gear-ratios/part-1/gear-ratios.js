import * as fs from 'node:fs/promises';

const maxLines = 139;
const maxCharacters = 141;

let file = await fs.open("input.txt");
let result = 0;
let lineCount = 0;

let symbolPositions = [];
let numbers = [];

// fill the symbol and the number positions
for await (const line of file.readLines()) {
    let characterIndex = lineCount * maxCharacters + 1;
    let nr = "";
    let foundNr = false; // indicates a number has been found and might be bigger than 1 character

    line.split("").forEach(character => {
        // check if its a symbol
        if (character === "#" || character === "$" || character === "*" ||
            character === "+" || character === "/" || character === "=" ||
            character === "%" || character === "&" || character === "@" ||
            character === "-"
        ) {
            symbolPositions.push(characterIndex);

            if (foundNr) { // if foundNr was previously true, it means the found number has come to an end
                // (because a symbol is at the current index)
                numbers.push({index: characterIndex - nr.length, length: nr.length, value: parseInt(nr)});
                foundNr = false;
                nr = "";
            }
        } else {
            let parsedNr = parseInt(character);

            if (!isNaN(parsedNr)) { // check if string contains a numeric
                nr = `${nr}${character}`;
                foundNr = true;
            } else { // if its not a numeric,
                if (foundNr) { // if foundNr was previously true, it means the found number has come to an end, so we can push
                    // the starting position and length of the value (which depends how big the number is)
                    numbers.push({index: characterIndex - nr.length, length: nr.length, value: parseInt(nr)});
                    foundNr = false;
                    nr = "";
                }
            }
        }
        characterIndex++;
    });

    if (foundNr) { // if foundNr was previously true, it means the found number ends at the end of the current line,
        numbers.push({index: characterIndex - nr.length, length: nr.length, value: parseInt(nr)});
    }

    lineCount++; // next line
}


/**
 * .....
 * .111.
 * .....
 * @param numberIndex {number}
 * @param length {number}
 * @return {boolean}
 */
function symbolHit(numberIndex, length) {
    let result = false;
    let symbolIndexesRequired = [];

    if (length === 1) {
        symbolIndexesRequired = [numberIndex - 1, numberIndex + 1,
            (numberIndex + maxCharacters),
            (numberIndex - maxCharacters),
            (numberIndex + maxCharacters) + 1,
            (numberIndex + maxCharacters) - 1,
            (numberIndex - maxCharacters) + 1,
            (numberIndex - maxCharacters) - 1,];
    } else if (length === 2) {
        symbolIndexesRequired = [numberIndex - 1, numberIndex + 2,
            (numberIndex + maxCharacters),
            (numberIndex - maxCharacters),
            (numberIndex + maxCharacters) + 1,
            (numberIndex + maxCharacters) + 2,
            (numberIndex + maxCharacters) - 1,
            (numberIndex - maxCharacters) + 1,
            (numberIndex - maxCharacters) - 1,
            (numberIndex - maxCharacters) + 2,];
    } else if (length === 3) {
        symbolIndexesRequired = [numberIndex - 1, numberIndex + 3,
            (numberIndex + maxCharacters),
            (numberIndex - maxCharacters),
            (numberIndex + maxCharacters) + 1,
            (numberIndex + maxCharacters) + 2,
            (numberIndex + maxCharacters) + 3,
            (numberIndex + maxCharacters) - 1,
            (numberIndex - maxCharacters) + 1,
            (numberIndex - maxCharacters) - 1,
            (numberIndex - maxCharacters) + 3,
            (numberIndex - maxCharacters) + 2,];
    } else {
        throw new Error("Too large a number");
    }

    symbolIndexesRequired.forEach(symbol => {
        if (symbolPositions.includes(symbol)) {
            result = true;
            return;
        }
    });
    return result;
}


/**
 * check all locations of the entire number
 *
 */
for (const nr of numbers) {
    if (symbolHit(nr.index, nr.length)) {
        result += nr.value;
    }
}


console.log(result);