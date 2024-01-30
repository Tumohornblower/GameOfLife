const Grass = require("./classes/Gras")
const Fresser = require("./classes/Fresser")
const Predator = require("./classes/Fleischfresser")
const Meteor = require("./classes/Meteor")
const Water = require("./classes/Water")


const express = require("express")
const app = express()

app.listen(3000, function () {
  console.log("Der Server läuft auf Port 3000")

  initGame()
  console.log(matrix)
  intervalId = setInterval(function () {
    console.log("update Game")
    updateGame()
  }, 1000)
})

app.use(function (req, res, next) {
  res.status(404).send("<h3>Error 404 </h3> <p> Bitter kontaktieren sie den ServerHost Theodor </p>")
})





function randomNumber(min, max) {
  kommazahl = Math.random();
  return Math.round(kommazahl * max - kommazahl * min + min);
}

function getRandomMatrix(breite, höhe) {
  let matrix = [];
  let array = [];
  for (let x = 0; x <= breite; x++) {
    for (let y = 0; y <= höhe; y++) {
      if (randomNumber(0, 100) > 90) {
        array.push(3);
      } else if (randomNumber(0, 100) > 90) {
        array.push(2);
      } else if (randomNumber(0, 100) > 70) {
        array.push(4);
      } else {
        array.push(1);
      }
    }
    array = [];
    matrix.push(array);
  }
  return matrix;
}

matrix = [
  [0, 0, 1, 0, 0],
  [1, 0, 0, 0, 0],
  [0, 1, 0, 0, 4],
  [0, 0, 1, 0, 0],
  [1, 1, 0, 0, 0],
  [1, 1, 0, 0, 0],
  [1, 1, 1, 0, 0],
];

grassArr = [];
fressArr = [];
predatorArr = [];
waterArr = [];


function initGame() {
  matrix = getRandomMatrix(100, 100);

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === 1) {
        grassArr.push(new Grass(x, y));
      } else if (matrix[y][x] === 2) {
        fressArr.push(new Fresser(x, y));
      } else if (matrix[y][x] === 3) {
        predatorArr.push(new Predator(x, y));
      } else if (matrix[y][x] === 4) {
        waterArr.push(new Water(x, y));
      }
    }
  }
}



function updateGame() {
  for (let i = 0; i < grassArr.length; i++) {
    grassArr[i].mul();
  }

  for (let i = 0; i < fressArr.length; i++) {
    let fresser = fressArr[i];
    fresser.eat();
    fresser.mul();
  }



  for (let i = 0; i < waterArr.length; i++) {
    waterArr[i].mul();
  }

  for (let i = 0; i < predatorArr.length; i++) {
    let pred = predatorArr[i];
    pred.eat();
    pred.mul();
  }

  if (randomNumber(0, 7) === 1) {
    let meteor = new Meteor(randomNumber(0, 100), randomNumber(0, 100));
    meteor.einschlag();
  }

  // Damit die Fleischfressere nicht so schnell aussterben:

  if (predatorArr.length === 0 && fressArr.length > 49) {
    for (let i = 0; i < 11; i++) {
      predatorArr.push(
        new Predator(randomNumber(0, 100), randomNumber(0, 100))
      );
    }
  }
}
