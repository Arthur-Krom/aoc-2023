const input = [{time: 47707566, distance: 282107911471062},];

let result = 0;
let count = 0;

for (const v of input) {
    if (count++ === 0) {
        result = calculate(v.time, v.distance);
    } else {
        result *= calculate(v.time, v.distance);
    }
}

/**
 *
 * @param time {number}
 * @param distance {number}
 */
function calculate(time, distance) {
    let result = 0;

    for (let i = 0; i < time; i++) {
        let hold = i;
        let distanceB = hold * (time - hold);

        if (distanceB > distance) {
            result++;
        }
    }

    return result;
}

console.log("result: ", result);

