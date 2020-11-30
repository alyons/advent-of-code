function dataToImage(data, width, height) {
    let image = [];

    let arr = data.split('');

    do {
        let layer = [];
        for(let h = 0; h < height; h += 1) {
            let line = [];
            for(let w = 0; w < width; w += 1) {
                line.push(arr.shift());
            }
            layer.push(line);
        }
        image.push(layer);
    } while(arr.length > 0);

    return image;
}

module.exports = dataToImage;
