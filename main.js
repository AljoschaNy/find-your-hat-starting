const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const directionRegex = /[DLRU]/gi;

class Field {
    constructor(field) {
        this.field = field;
    }

    print() {
        this.field.forEach(line => {
            let fieldLine = "";
            line.forEach(item => fieldLine += item);

            console.log(fieldLine);
        });
    }
}

const printField = () => {
    const myField = new Field([
        [pathCharacter, fieldCharacter, hole],
        [fieldCharacter, hole, fieldCharacter],
        [fieldCharacter, hat, fieldCharacter]
    ])
    
    myField.print();
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
            return direction;
        }
    }
}

const playGame = () => {
    printField();
    getUserDirection();
}

