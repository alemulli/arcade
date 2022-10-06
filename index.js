let speed;
let direction = "none";
let highScore;
let averageScore;
let gameState = {
    apple: [4, 4],
    snake: {
        body: [6, 7], 
    }
}

let xApple = gameState.apple[0]
let yApple = gameState.apple[1]
let xSnake = gameState.snake.body[0]
let ySnake = gameState.snake.body[1]

////// Choosing difficulty with the difficulty radio buttons //////

const difficultySelector = document.getElementById("difficulty")
const difficultyEasy = document.getElementById("easy")
const difficultyHard = document.getElementById("hard")

function setDifficulty () {
    if (difficultyEasy.checked === true) {
        speed = 30;
        difficultyEasy.disabled=true;
        difficultyHard.disabled=true;
    } else if (difficultyHard.checked === true) {
        speed = 60;
        difficultyEasy.disabled=true;
        difficultyHard.disabled=true;
    }
}

difficultySelector.addEventListener("click", setDifficulty)

////// Establishing the game-grid with the Field Size radio buttons //////
// Putting the initial starting pos for the snake and apple on the game field //

const gameGridHere = document.getElementById("gameGridHere");
const fieldSizeSelector = document.getElementById("fieldSize")
const fieldSizeSmall = document.getElementById("smallField");
const fieldSizeLarge = document.getElementById("largeField")


function createGameField () {
    if (fieldSizeSmall.checked === true) {
        let size = 10
        
        for (let i = 0; i < size; i++) {
            const newTr = document.createElement("tr");
            for (let j = 0; j < size; j++) {
                const newTd = document.createElement("td");
                newTr.appendChild(newTd);
            }
            gameGridHere.appendChild(newTr);
        }
        fieldSizeSmall.disabled=true;
        fieldSizeLarge.disabled=true;

        document.getElementsByTagName("tr")[ySnake].getElementsByTagName('td')[xSnake].classList.add("snake")
        document.getElementsByTagName("tr")[yApple].getElementsByTagName('td')[xApple].classList.add("apple")
    } else if (fieldSizeLarge.checked === true) {
        let size = 20;
        for (let i = 0; i < size; i++) {
            const newTr = document.createElement("tr");
            for (let j = 0; j < size; j++) {
                const newTd = document.createElement("td");
                newTr.appendChild(newTd);
            }
            gameGridHere.appendChild(newTr); 
        }
        fieldSizeSmall.disabled=true;
        fieldSizeLarge.disabled=true;
        document.getElementsByTagName("tr")[ySnake].getElementsByTagName('td')[xSnake].classList.add("snake")
        document.getElementsByTagName("tr")[yApple].getElementsByTagName('td')[xApple].classList.add("apple")
    }
}

fieldSizeSelector.addEventListener("click", createGameField)

////// Direction inputs //////

document.addEventListener("keydown", function (press) {
    if (press.key === 'ArrowLeft' || press.code === 'KeyA') {
        if (direction !== "right") {
            direction = "left";
        } 

    } else if (press.key === 'ArrowUp' || press.code === 'KeyW') {
        if (direction !== "down"){
            direction = "up";
        } 

    } else if (press.key === 'ArrowRight' || press.code === 'KeyD') {
        if (direction !== "left") {
            direction = "right";
        } 

    } else if (press.key === 'ArrowDown' || press.code === 'KeyS') {
        if (direction !== "up") {
            direction = "down";
        } 

    }
});