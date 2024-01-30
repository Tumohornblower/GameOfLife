function randomNumber(min = 0, max) {
    kommazahl = Math.random();
    return Math.floor(kommazahl * max);
  }

const Lebewesen = require("./Lebewesen.js")
module.exports = class Predator extends Lebewesen {
    constructor(x, y) {
        super(x, y);
        this.eaten = 0;
        this.notEaten = 0;
        this.colorCode = 3;
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
            let pos = emptyFields[randomNumber(0, emptyFields.length)]
            let newX = pos[0];
            let newY = pos[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.colorCode;
            this.x = newX;
            this.y = newY;
        }
    }
    eat() {
        let fresserfields = this.findFields(2);
        if (fresserfields.length > 0) {
            let pos = fresserfields[randomNumber(0, fresserfields.length)];
            let newX = pos[0];
            let newY = pos[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.colorCode;
            this.x = newX;
            this.y = newY;
            for (let i = 0; i < fressArr.length; i++) {
                let fressObj = fressArr[i];
                if (fressObj.x === this.x && fressObj.y === this.y) {
                    fressArr.splice(i, 1);
                    break;
                }
            }
            this.plusEat();
            return true;
        } else {
            this.resetEat();
            this.move();
            if (this.notEaten >= 8) {
                this.die();
            }
            return false;
        }
    }
    mul() {
        if (this.eaten >= 5) {
            let emptyFields = this.findFields(0, 5);
            if (emptyFields.length > 0) {
                let pos = emptyFields[randomNumber(0, emptyFields.length)]
                let newX = pos[0];
                let newY = pos[1];
                fressArr.push(new Predator(newX, newY));
                matrix[newY][newX] = this.colorCode;
                this.eaten = 0;
            }
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
    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < predatorArr.length; i++) {
            let preObj = predatorArr[i];
            if (preObj.x === this.x && preObj.y === this.y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
    }
}