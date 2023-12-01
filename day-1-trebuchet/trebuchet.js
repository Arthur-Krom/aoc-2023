import * as fs from 'node:fs/promises';

let file = await fs.open("input.txt");

let result = 0;

for await (const line of file.readLines()) {
    let stringArr = [];

    for (const element of line) {
        let nr = parseInt(element);
        if (!isNaN(nr)) {
            stringArr.push(element); // put the string equivalent in the arr
        }
    }

    let first = stringArr.shift();
    let last = stringArr.pop();

    if (last === undefined) {
        last = first;
    }

    let firstAndLast = `${first}${last}`;

    result += parseInt(firstAndLast);
}


console.log("result: ", result);




