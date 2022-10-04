let speed;
let direction = "up";

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

const gameGridHere = document.getElementById("gameGridHere");
const fieldSizeSelector = document.getElementById("fieldSize")
const fieldSizeSmall = document.getElementById("smallField");
const fieldSizeLarge = document.getElementById("largeField")


function createGameField () {
    if (fieldSizeSmall.checked === true) {
        let size = 20
        
        for (let i = 0; i <= size; i++) {
            const newTr = document.createElement("tr");
            for (let j = 0; j <= size; j++) {
                const newTd = document.createElement("td");
                newTr.appendChild(newTd);
            }
            gameGridHere.appendChild(newTr);
        }
        fieldSizeSmall.disabled=true;
        fieldSizeLarge.disabled=true;
    } else if (fieldSizeLarge.checked === true) {
        let size = 40;
        for (let i = 0; i <= size; i++) {
            const newTr = document.createElement("tr");
            for (let j = 0; j <= size; j++) {
                const newTd = document.createElement("td");
                newTr.appendChild(newTd);
            }
            gameGridHere.appendChild(newTr); 
        }
        fieldSizeSmall.disabled=true;
        fieldSizeLarge.disabled=true;
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