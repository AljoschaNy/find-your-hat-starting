const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

const testArray = [
  [pathCharacter, fieldCharacter, hole],
  [fieldCharacter, hole, fieldCharacter],
  [fieldCharacter, hat, fieldCharacter],
];

class Field {
  constructor(array) {
    this.array = array;
    this.maxPositionX = array[0].length - 1;
    this.maxPositionY = array.length - 1;
  }

  print() {
    this.array.forEach((line) => {
      let fieldLine = "";
      line.forEach((item) => (fieldLine += item));

      console.log(fieldLine);
    });
  }
}

const getField = (arr) => {
  const myField = new Field(arr);
  myField.print();

  return myField;
};

const isValidInput = (input) => {
  const directionRegex = /[DLRU]/gi;
  return input.length === 1 && directionRegex.test(input);
};

const getUserDirection = () => {
  let validUserInput = false;

  while (!validUserInput) {
    let direction = prompt(
      "Choose a direction (u=up, r=right, d=down, l=left)"
    );

    if (isValidInput(direction)) {
      return direction.toLowerCase();
    }
  }
};

const getInitialPlayerPosition = (arr) => {
  const initialPosition = {};

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === pathCharacter) {
        initialPosition.x = j;
        initialPosition.y = i;
      }
    }
  }

  return initialPosition;
};

// const checkSurroundings = (arr, position) => {
//     if(arr[position.y][position.x] ===  0)
// }

const changePosition = (position, direction) => {
  switch (direction) {
    case "u":
      position.y -= 1;
      break;
    case "d":
      position.y += 1;
      break;
    case "r":
      position.x += 1;
      break;
    case "l":
      position.x -= 1;
      break;
    default:
      break;
  }

  return position;
};

const playGame = (arr) => {
  let currentField = getField(arr);
  let currentArr = arr;
  let playerPosition = getInitialPlayerPosition(arr);
  let gameover = false;
  let message = "";

  while (!gameover) {
    playerPosition = changePosition(playerPosition, getUserDirection());

    if (
      playerPosition.x < 0 ||
      playerPosition.x > currentField.maxPositionX ||
      playerPosition.y < 0 ||
      playerPosition.y > currentField.maxPositionY
    ) {
      message = "You felt from the edge of the field! Maybe next time!";
      gameover = true;
      break;
    }

    switch (currentArr[playerPosition.y][playerPosition.x]) {
      case hole:
        message = "You felt into the hole! Maybe next time!";
        gameover = true;
        break;
      case hat:
        message = "You found the hat!";
        gameover = true;
        break;
      default:
        currentArr[playerPosition.y][playerPosition.x] = pathCharacter;
        currentField = getField(currentArr);
    }
  }

  console.log(message);
  console.log("The game has finished");
};

playGame(testArray);
