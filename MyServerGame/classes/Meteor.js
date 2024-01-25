const Lebewesen = require("./Lebewesen.js")
module.exports = class Meteor extends Lebewesen {
    constructor(x, y) {
        super(x, y);
        this.waterquelle = false;
        if (randomNumber(0, 2) === 1) {
            this.waterquelle = true;
        }
        this.colorCode = 5;
        // beinhaltete Felder
        this.fields = [
            [this.x, this.y],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],

            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2],

            [this.x + 2, this.y + 1],
            [this.x + 2, this.y - 1],
            [this.x + 3, this.y + 1],
            [this.x + 3, this.y - 1],
            [this.x + 3, this.y],

            [this.x - 2, this.y + 1],
            [this.x - 3, this.y - 1],
            [this.x - 3, this.y],
            [this.x - 3, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],

            [this.x - 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 3],
            [this.x, this.y - 3],
            [this.x + 1, this.y - 3],
            [this.x - 1, this.y + 3],
            [this.x + 1, this.y + 3],
            [this.x + 1, this.y + 3],

            [this.x + 1, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x + 1, this.y + 2],
            [this.x, this.y + 3],
        ];
    }

    einschlag() {
        for (let i = 0; i < this.fields.length; i++) {
            let pos = this.fields[i];
            let posX = pos[0];
            let posY = pos[1];
            if (posX >= 0 && posY >= 0 && posX < 100 && posY < 100) {
                matrix[posY][posX] = this.colorCode;
            }
        }

        if (waterArr.length !== 0) {
            for (let i = 0; i < waterArr.length; i++) {
                for (let j = 0; j < this.fields.length; j++) {
                    if (
                        waterArr[i] &&
                        waterArr[i].x === this.fields[j][0] &&
                        waterArr[i].y === this.fields[j][1]
                    ) {
                        waterArr.splice(i, 1);
                    }
                }
            }
        }

        if (grassArr.length !== 0) {
            for (let i = 0; i < grassArr.length; i++) {
                for (let j = 0; j < this.fields.length; j++) {
                    if (
                        grassArr[i] &&
                        grassArr[i].x === this.fields[j][0] &&
                        grassArr[i].y === this.fields[j][1]
                    ) {
                        grassArr.splice(i, 1);
                    }
                }
            }
        }

        if (fressArr.length !== 0) {
            for (let i = 0; i < fressArr.length; i++) {
                for (let j = 0; j < this.fields.length; j++) {
                    if (
                        fressArr[i] &&
                        fressArr[i].x === this.fields[j][0] &&
                        fressArr[i].y === this.fields[j][1]
                    ) {
                        fressArr.splice(i, 1);
                    }
                }
            }
        }

        if (predatorArr.length !== 0) {
            for (let i = 0; i < predatorArr.length; i++) {
                for (let j = 0; j < this.fields.length; j++) {
                    if (
                        predatorArr[i] &&
                        predatorArr[i].x === this.fields[j][0] &&
                        predatorArr[i].y === this.fields[j][1]
                    ) {
                        predatorArr.splice(i, 1);
                    }
                }
            }
        }

        if (
            randomNumber(0, 3) === 1 &&
            this.x >= 0 &&
            this.y >= 0 &&
            this.x < 100 &&
            this.y < 100
        ) {
            matrix[this.y][this.x] = 4;
            waterArr.push(new Water(this.x, this.y));
        }
    }
}