import * as fs from 'node:fs/promises';

let file = await fs.open("input.txt");
let result = 0;

/**
 *
 * @param line {string}
 */
const getArrayOfNumbersForLine = (line) => {
    const result = [];
    const nrStrings = [{written: "one", simple: "1"},
        {written: "two", simple: "2"},
        {written: "three", simple: "3"},
        {written: "four", simple: "4"},
        {written: "five", simple: "5"},
        {written: "six", simple: "6"},
        {written: "seven", simple: "7"},
        {written: "eight", simple: "8"},
        {written: "nine", simple: "9"}];


    // first parse regular numbers
    for (let i = 0; i < line.length; i++) {

        let nr = parseInt(line[i]);
        if (!isNaN(nr)) {
            result.push({nrString: line[i], index: i}); // put the string equivalent in the arr
        }
    }

    // check if numbers written in letters are inside line
    nrStrings.forEach(el => {
        let index = line.indexOf(el.written);


        while (index > -1) {
            result.push({nrString: el.simple, index: index});
            index = line.indexOf(el.written, index + 1);
        }
    });

    // sort by occurrence
    result.sort((a, b) => {
        if (a.index > b.index) {
            return 1;
        } else {
            return -1;
        }
    });

    return result;
};


for await (const line of file.readLines()) {
    let stringArr = getArrayOfNumbersForLine(line);

    let first = stringArr.shift();
    let last = stringArr.pop();

    if (last === undefined) {
        last = first;
    }

    let firstAndLast = `${first.nrString}${last.nrString}`;

    result += parseInt(firstAndLast);
}


console.log("result: ", result);




