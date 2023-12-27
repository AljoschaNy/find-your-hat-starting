const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const directionRegex = /[DLRU]/gi;

const testArray = [
    [pathCharacter, fieldCharacter, hole],
    [fieldCharacter, hole, fieldCharacter],
    [fieldCharacter, hat, fieldCharacter]
]

class Field {
    constructor(fieldArray) {
        this.fieldArray = fieldArray;
        this.maxPositionX = fieldArray[0].length -1;
        this.maxPositionY = -(fieldArray.length -1);
    }

    print() {
        this.fieldArray.forEach(line => {
            let fieldLine = "";
            line.forEach(item => fieldLine += item);

            console.log(fieldLine);
        });
    }
}

const getField = (arr) => {
    const myField = new Field(arr)
    myField.print();

    return myField;
}

const isValidInput = input => {
    if(input.length === 1) {
        return directionRegex.test(input)
    }

    return false;
}

const getUserDirection = () => {
    let validUserInput = false;

    while(!validUserInput) {
        let direction = prompt('Choose a direction (u=up, r=right, d=down, l=left)');

        if(isValidInput(direction)) {
            return direction.toLowerCase();
        }
    }
}

/*

- get current position (x,y)

2. move player
- left = x -1
- right = x +1
- up = y +1
- down = y -1
- arr(x,y) = pathCharacter

*/ 

const getInitialPlayerPosition = arr => {
    const initialPosition = {};

    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < arr[i].length; j++) {
            if(arr[i][j] === pathCharacter) {
                currentPosition.x = j;
                currentPosition.y = i;
            }
        }
    }

    return initialPosition;
}



// const checkSurroundings = () => {

// }


const playGame = () => {
    const currentField = getField(testArray);
}