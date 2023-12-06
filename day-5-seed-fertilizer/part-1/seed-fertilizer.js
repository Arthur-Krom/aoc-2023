import * as fs from 'node:fs/promises';

const file = await fs.open("input.txt");

console.log("---start---");

let result = 0;
let seeds = [];
let soilMap = [];
let fertilizerMap = [];
let waterMap = [];
let lightMap = [];
let temperatureMap = [];
let humidityMap = [];
let locationMap = [];

let lineCounter = 0;

for await (const line of file.readLines()) {
    lineCounter++;

    if (lineCounter === 1) {
        const seedsStr = "seeds: ";
        let a = line.slice(line.indexOf(seedsStr) + seedsStr.length);
        seeds = a.trim().split(" ");
        seeds = seeds.map(s => {
            return parseInt(s);
        });
    }

    if (lineCounter > 3 && lineCounter < 35) {
        soilMap.push(line.trim().split(" ").map(s => {
            return parseInt(s);
        }));
    }

    if (lineCounter > 36 && lineCounter < 84) {
        fertilizerMap.push(line.trim().split(" ").map(s => {
            return parseInt(s);
        }));
    }

    if (lineCounter > 85 && lineCounter < 131) {
        waterMap.push(line.trim().split(" ").map(s => {
            return parseInt(s);
        }));
    }

    if (lineCounter > 132 && lineCounter < 176) {
        lightMap.push(line.trim().split(" ").map(s => {
            return parseInt(s);
        }));
    }

    if (lineCounter > 177 && lineCounter < 198) {
        temperatureMap.push(line.trim().split(" ").map(s => {
            return parseInt(s);
        }));
    }

    if (lineCounter > 199 && lineCounter < 217) {
        humidityMap.push(line.trim().split(" ").map(s => {
            return parseInt(s);
        }));
    }

    if (lineCounter > 218 && lineCounter < 237) {
        locationMap.push(line.trim().split(" ").map(s => {
            return parseInt(s);
        }));
    }
}

/**
 *
 * @param source {number[]}
 * @param converter {[number[]]}
 * @return {number[]}
 */
function convert(source, converter) {
    let result = [];

    for (const i of source) {
        let pushed = false;
        for (const c1 of converter) {
            let dest = c1[0];
            let source = c1[1];
            let range = c1[2];

            if (i >= source && i <= source + range) {
                let value = i - source + dest;
                result.push(value);
                pushed = true;
                break;
            }
        }

        if (pushed) {
            continue;
        }
        result.push(i);
    }

    return result;
}

let a1 = convert(seeds, soilMap);
let a2 = convert(a1, fertilizerMap);
let a3 = convert(a2, waterMap);
let a4 = convert(a3, lightMap);
let a5 = convert(a4, temperatureMap);
let a6 = convert(a5, humidityMap);
let a7 = convert(a6, locationMap);

result = a7.sort((a,b) =>{
    if(a > b){
        return 1;
    }else{
        return -1;
    }
});

console.log(result[0]);