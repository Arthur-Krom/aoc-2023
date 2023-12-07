const input = [{time: 47, distance: 282},
    {time: 70, distance: 1079}, {time: 75, distance: 1147}, {time: 66, distance: 1062}];

let result = 0;
let count = 0;

for(const v of input){
    if(count++ === 0){
         result = calculate(v.time, v.distance);
    }else{
        result *= calculate(v.time, v.distance);
    }
}

/**
 *
 * @param time {number}
 * @param distance {number}
 */
function calculate(time, distance) {
    let a = [];

    for (let i = 0; i < time; i++) {
        let hold = i;
        let distance = hold * (time - hold);
        a.push({hold: hold, distance: distance});
    }

    return a.filter((x) =>{ return x.distance > distance}).length
}

