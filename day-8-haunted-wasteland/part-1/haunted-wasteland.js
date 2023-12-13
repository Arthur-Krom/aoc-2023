import * as fs from 'node:fs/promises';

const file = await fs.open("input.txt");

let result = 0;
let lineCounter = 1;
let instructions = [];
let nodes = [];

for await (const line of file.readLines()) {
    if (lineCounter === 1) {
        lineCounter++;
        instructions = line.split("");
        continue;
    }

    if (lineCounter === 2) {
        lineCounter++;
        continue;
    }

    let name = line.slice(0, 3);
    let left = line.slice(7, 10);
    let right = line.slice(12, 15);

    nodes.push({name: name, left: left, right: right});
    lineCounter++;
}

let instructionIndex = 0;
let instructionCounter = 0;

let node = nodes.find(n =>{ return n.name === "AAA"})

while (node.name !== "ZZZ") {

    if (instructions[instructionIndex] === "L") {
        node = nodes.find(n => {
            return n.name === node.left;
        });
    }

    if (instructions[instructionIndex] === "R") {
        node = nodes.find(n => {
            return n.name === node.right;
        });
    }

    if (instructionIndex + 1 === instructions.length) {
        instructionIndex = 0;
    } else {
        instructionIndex++;
    }

    instructionCounter++;
}

result = instructionCounter;

console.log("result: ", result);
