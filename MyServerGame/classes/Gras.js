function randomNumber(min = 0, max) {
    kommazahl = Math.random();
    return Math.floor(kommazahl * max);
}
const Lebewesen = require("./Lebewesen.js")
module.exports = class Grass extends Lebewesen {
    constructor(x, y) {
        super(x, y);
        this.colorCode = 1;
        this.rounds = 0;
    }

    mul() {
        this.rounds += 1;
        if (this.rounds >= 6) {
            let emptyFields = this.findFields(0, 5);
            if (emptyFields.length > 0) {
                let pos = emptyFields[randomNumber(0, emptyFields.length)]
                let newX = pos[0];
                let newY = pos[1];
                if (newX >= 0 && newY >= 0 && newX < 100 && newY < 100) {
                    matrix[newY][newX] = this.colorCode;
                    grassArr.push(new Grass(newX, newY));
                }
            }
            this.rounds = 0;
        }
    }
}
