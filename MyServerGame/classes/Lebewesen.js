function randomNumber(min = 0, max) {
    kommazahl = Math.random();
    return Math.floor(kommazahl * max);
}

module.exports = class Lebewesen {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.neighbors = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
        ];
    }
    findFields(symbol, symbol2 = 100) {
        let found = [];
        for (let i = 0; i < this.neighbors.length; i++) {
            let pos = this.neighbors[i];
            let posX = pos[0];
            let posY = pos[1];
            if (
                posX >= 0 &&
                posY >= 0 &&
                posX < matrix[0].length &&
                posY < matrix.length
            ) {
                if (matrix[posY][posX] === symbol || matrix[posY][posX] === symbol2) {
                    found.push(pos);
                }
            }
        }
        return found;
    }
}
