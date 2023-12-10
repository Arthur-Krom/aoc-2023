import * as fs from 'node:fs/promises';

const file = await fs.open("input.txt");
const HAND_INDEX = 0;
const BID_INDEX = 1;

let hands = [];
let result = 0;

for await (const line of file.readLines()) {
    let hand = line.split(" ")[HAND_INDEX];
    let bid = line.split(" ")[BID_INDEX];

    hands.push({hand: hand, bid: bid, strength: calculateHandStrength(hand)});
}

let index = 1;
hands.sort(determineRank).forEach((hand) => {
    result += hand.bid * index;
    index++;
});

console.log("result: ", result);

/**
 *
 * @param handA
 * @param handA.hand {string}
 * @param handA.bid {number}
 * @param handA.strength {number}
 * @param handB
 * @param handB.hand {string}
 * @param handB.bid {number}
 * @param handB.strength {number}
 * @return {number}
 */
function determineRank(handA, handB) {
    const ranks = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2", "1"];

    if (handA.strength > handB.strength) {
        return 1;
    } else if (handA.strength === handB.strength) {
        let index = 0;

        let handAArr = handA.hand.split("");
        let handBArr = handB.hand.split("");

        let a = ranks.indexOf(handAArr[index]);
        let b = ranks.indexOf(handBArr[index]);

        while (a === b) {
            index++;
            a = ranks.indexOf(handAArr[index]);
            b = ranks.indexOf(handBArr[index]);
        }

        // lower index means higher card value
        if (a < b) {
            return 1;
        } else if (a > b) {
            return -1;
        } else {
            return 0;
        }
    } else {
        return -1;
    }
}

/**
 *
 * @param hand {string}
 * @return {number}
 */
function calculateHandStrength(hand) {
    let result = 1;
    let cards = hand.split("");
    let cardsWithAmount = [];

    cards.forEach(c => {
        if (cardsWithAmount.find(b => b.card === c) !== undefined) {
            cardsWithAmount.find(b => b.card === c).amount += 1;
        } else {
            cardsWithAmount.push({card: c, amount: 1});
        }
    });

    // 5 different cards, so must be high card
    if (cardsWithAmount.length === 5) {
        result = 1;
    }

    // must be a pair
    if (cardsWithAmount.length === 4) {
        result = 2;
    }

    // three of a kind or two pair
    if (cardsWithAmount.length === 3) {
        result = 3; // two pair
        cardsWithAmount.forEach((cwa) => {
            if (cwa.amount === 3) {
                result = 4; // three of a kind
            }
        });
    }

    // four of a kind or full house
    if (cardsWithAmount.length === 2) {
        if (cardsWithAmount[0].amount === 3 || cardsWithAmount[1].amount === 3) {
            result = 5;
        } else {
            result = 6;
        }
    }

    // five of a kind
    if (cardsWithAmount.length === 1) {
        result = 7;
    }

    return result;
}