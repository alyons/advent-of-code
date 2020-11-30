const intCode = require('../src/intCode.v3');
const program = require('../inputs/thirteen.json');

let input = [];
let state = {
    output: [],
    index: 0,
    rIndex: 0
};

let c = 0, x = 0, y = 0;
let tiles = [];
let paddle, ball, score;

do {
    state = intCode(program, input, state.output, state.index, state.rIndex);
    if (state.output.length == 3) {
        let data = state.output.slice(0, 3);
        state.output = [];
        // console.log(data);
        switch(data[2]) {
            case 0:
            case 1:
            case 2:
                let tIndex = tiles.findIndex(t => t[0] == data[0] && t[1] == data[1]);
                if (tIndex > -1) {
                    tiles[tIndex][2] = data[2];
                } else {
                    tiles.push(data);
                }
                break;
            case 3: paddle = data; break;
            case 4: ball = data; break;
            default:
                if (data[0] == -1 && data[1] == 0) {
                    score = data[2];
                }
                break;
        }

        input = [];
        if (!!paddle && !!ball) {
            if (paddle[0] < ball[0]) input.push(1);
            else if (paddle[0] > ball[0]) input.push(-1);
            else input.push(0);
        } else {
            input.push(0);
        }

    }
    // let out = state.output.shift();
    // switch (c++ % 3) {
    //     case 1: x = out; break;
    //     case 2: y = out; break;
    //     case 0: {
    //         switch (out) {
    //             case 0:
    //             case 1:
    //             case 2:
    //                 let tIndex = tiles.findIndex(t => t[0] == x && t[1] == y);
    //                 if (tIndex > -1) {
    //                     tiles[tIndex][2] = out;
    //                 } else {
    //                     tiles.push([x, y, out]);
    //                 }
    //                 break;
    //             case 3: paddle = [x, y]; console.log(`Paddle: ${paddle}`); break;
    //             case 4: ball = [x, y]; console.log(`Ball: ${ball}`); break;
    //             default: if (x == -1 && y == 0) score = out; break;
    //         }
    //     }
    //     default:
    //         break;
    // }

    // input = [];
    // if (!!paddle && !!ball) {
    //     if (paddle[0] < ball[0]) input.push(1);
    //     else if (paddle[0] > ball[0]) input.push(-1);
    //     else input.push(0);
    // } else {
    //     input.push(0);
    // }

} while(state.index != 'HALT');

console.log(score);
