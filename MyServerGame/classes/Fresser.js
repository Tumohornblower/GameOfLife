const Lebewesen = require("./Lebewesen.js")
module.exports = class Fresser extends Lebewesen {
    constructor(x, y) {
        super(x, y);
        this.eaten = 0;
        this.notEaten = 0;
        this.colorCode = 2;
        this.rounds = 0;
    }

    findFields(symbol, symbol2 = 100) {
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
        return super.findFields(symbol, symbol2);
    }

    move() {
        let emptyFields = this.findFields(0, 5);
        if (emptyFields.length > 0) {
            let pos = random(emptyFields);
            let newX = pos[0];
            let newY = pos[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.colorCode;
            this.x = newX;
            this.y = newY;
        }
    }
    eat() {
        let grassFields = this.findFields(1);
        if (grassFields.length > 0) {
            let pos = random(grassFields);
            let newX = pos[0];
            let newY = pos[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.colorCode;
            this.x = newX;
            this.y = newY;
            for (let i = 0; i < grassArr.length; i++) {
                let grassObj = grassArr[i];
                if (grassObj.x === this.x && grassObj.y === this.y) {
                    grassArr.splice(i, 1);
                }
            }
            this.plusEat();
            return true;

        } else {
            this.resetEat();
            this.move();
            if (this.notEaten >= 5) {
                this.die();
            }
            return false;
        }
    }
    resetEat() {
        this.eaten = 0;
        this.notEaten++;
    }
    plusEat() {
        this.eaten++;
        this.notEaten = 0;
    }

    mul() {
        if (this.eaten >= 5) {
            let emptyFields = this.findFields(0, 5);
            if (emptyFields.length > 0) {
                let pos = random(emptyFields);
                let newX = pos[0];
                let newY = pos[1];
                fressArr.push(new Fresser(newX, newY));
                matrix[newY][newX] = this.colorCode;
                this.eaten = 0;
            }
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < fressArr.length; i++) {
            let fressObj = fressArr[i];
            if (fressObj.x === this.x && fressObj.y === this.y) {
                fressArr.splice(i, 1);
                break;
            }
        }
    }
}