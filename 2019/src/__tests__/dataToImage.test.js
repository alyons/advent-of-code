const dataToImage = require('../dataToImage');

describe('Data to Image', () => {
    test('convert string to 3 by 2 image', () => {
        const expected = [
            [[1,2,3],[4,5,6]],
            [[7,8,9],[0,1,2]]
        ];
        let actual = dataToImage('123456789012', 3, 2);

        expect()
    });
});
