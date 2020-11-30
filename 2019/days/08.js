const dataToImage = require('../src/dataToImage');
const input = require('../inputs/eight.json').value;

const width = 25;
const height = 6;

let image = dataToImage(input, width, height);

// let minZeroes = Number.MAX_SAFE_INTEGER;
// let index = -1;

// for(let i = 0; i < image.length; i += 1) {
//     let sumZeroes = 0;
//     for(let l = 0; l < image[i].length; l += 1) {
//         for(let p = 0; p < image[i][l].length; p += 1){
//             if (image[i][l][p] == '0') {
//                 sumZeroes += 1;
//             }
//         }
//     }

//     if (sumZeroes < minZeroes) {
//         index = i;
//         minZeroes = sumZeroes;
//     }
// }

// if (index != -1) {
//     let ones = 0, twos = 0;
//     for(let a = 0; a < image[index].length; a += 1) {
//         for(let b = 0; b < image[index][a].length; b += 1) {
//             if (image[index][a][b] == '1') ones += 1;
//             if (image[index][a][b] == '2') twos += 1;
//         }
//     }

//     console.log(ones * twos);
// } else {
//     console.log('Layer not found...');
// }

let finalImage = [];
for(let h = 0; h < height; h++) {
    let line = [];
    for(let w = 0; w < width; w++) {
        line.push(9);
    }
    finalImage.push(line);
}

for(let h = 0; h < height; h++) {
    for(let w = 0; w < width; w++) {
        for(let l = 0; l < image.length; l++) {
            if (image[l][h][w] != '2') {
                finalImage[h][w] = image[l][h][w];
                break;
            }
        }
    }
}

for(let h = 0; h < height; h++) {
    let output = '';
    for(let w = 0; w < width; w++) {
        output += (finalImage[h][w] == '0') ? ' ' : '#';
    }
    console.log(output);
}
