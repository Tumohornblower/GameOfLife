function randomNumber(min = 0, max) {
    kommazahl = Math.random();
    return Math.floor(kommazahl * max);
}

const Lebewesen = require("./Lebewesen.js")
const Grass = require("./Gras")

module.exports = class Water extends Lebewesen {
    constructor(x, y) {
        super(x, y);
        this.colorCode = 4;
        this.rounds = 0;
    }
    mul() {
        this.rounds += 1;
        let grasfields = this.findFields(1);
        if (this.rounds >= 6 && grasfields.length > 0) {
            this.giessen(grasfields);
            this.rounds = 0;
        } else if (this.rounds >= 6) {
            let emptyFields = this.findFields(0, 5);
            for (let i = 0; i < emptyFields.length; i++) {
                if (emptyFields.length >= 3 && i >= 3) {
                    break;
                }
                let pos = emptyFields[randomNumber(0, emptyFields.length)]
                emptyFields.splice(emptyFields.indexOf(pos));
                let newX = pos[0];
                let newY = pos[1];
                waterArr.push(new Water(newX, newY));
                matrix[newY][newX] = this.colorCode;
            }
            this.rounds = 0;
        }
    }
    giessen(grassfields) {
        let newX = this.x;
        let newY = this.y;

        let removeIndex = waterArr.indexOf(this);
        if (removeIndex > -1) {
            waterArr.splice(removeIndex, 1);
            matrix[newY][newX] = 1;
            grassArr.push(new Grass(newX, newY));
        }

        let grassPos = grassfields[randomNumber(0, grassfields.length)]

        for (let i = 0; i < grassArr.length; i++) {
            let grass = grassArr[i];
            if (grass.x === grassPos[0] && grass.y === grassPos[1]) {
                grass.rounds = 6;
                grass.mul();
            }
        }

    }
}
