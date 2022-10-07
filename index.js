let gameState = {
  apple: [4, 4],
  snake: {
    head: [6, 7],
    body: [],
    sLength: 0,
  },
};

let score = gameState.snake.sLength;
let speed = 30;
let direction = "none";
let highScore = undefined;
let averageScore = undefined;
let small;
let large;
let oldHeadX;
let oldHeadY;
let removedBodyPart;
let scoreRecords = [];
let game = "ready";

const scoreDisplay = document.getElementById("currentScore");

////// Choosing difficulty with the difficulty radio buttons //////

const difficultySelector = document.getElementById("difficulty");
const difficultyEasy = document.getElementById("easy");
const difficultyHard = document.getElementById("hard");

function setDifficulty() {
  if (difficultyEasy.checked === true) {
    console.log(speed);
  } else if (difficultyHard.checked === true) {
    speed = 50;
  }
}

difficultySelector.addEventListener("click", setDifficulty);

////// Establishing the game-grid with the Field Size radio buttons //////
// Putting the initial starting pos for the snake and apple on the game field //

const gameGridHere = document.getElementById("gameGridHere");
const fieldSizeSelector = document.getElementById("fieldSize");
const fieldSizeSmall = document.getElementById("smallField");
const fieldSizeLarge = document.getElementById("largeField");

function createGameField() {
  if (fieldSizeSmall.checked === true) {
    clearGrid();
    let size = 10;
    small = true;
    large = false;
    for (let i = 0; i < size; i++) {
      const newTr = document.createElement("tr");
      for (let j = 0; j < size; j++) {
        const newTd = document.createElement("td");
        newTr.appendChild(newTd);
      }
      gameGridHere.appendChild(newTr);
    }

    document
      .getElementsByTagName("tr")
      [gameState.snake.head[1]].getElementsByTagName("td")
      [gameState.snake.head[0]].classList.add("snake");
    document
      .getElementsByTagName("tr")
      [gameState.apple[1]].getElementsByTagName("td")
      [gameState.apple[0]].classList.add("apple");
  } else if (fieldSizeLarge.checked === true) {
    clearGrid();
    let size = 20;
    large = true;
    small = false;
    for (let i = 0; i < size; i++) {
      const newTr = document.createElement("tr");
      for (let j = 0; j < size; j++) {
        const newTd = document.createElement("td");
        newTr.appendChild(newTd);
      }
      gameGridHere.appendChild(newTr);
    }
    document
      .getElementsByTagName("tr")
      [gameState.snake.head[1]].getElementsByTagName("td")
      [gameState.snake.head[0]].classList.add("snake");
    document
      .getElementsByTagName("tr")
      [gameState.apple[1]].getElementsByTagName("td")
      [gameState.apple[0]].classList.add("apple");
  }
}

function clearGrid() {
  gameGridHere.innerHTML = "";
}

fieldSizeSelector.addEventListener("click", createGameField);

////// Direction inputs //////

document.addEventListener("keydown", function (press) {
  if (press.key === "ArrowLeft" || press.code === "KeyA") {
    if (direction !== "right") {
      direction = "left";
    }
  } else if (press.key === "ArrowUp" || press.code === "KeyW") {
    if (direction !== "down") {
      direction = "up";
    }
  } else if (press.key === "ArrowRight" || press.code === "KeyD") {
    if (direction !== "left") {
      direction = "right";
    }
  } else if (press.key === "ArrowDown" || press.code === "KeyS") {
    if (direction !== "up") {
      direction = "down";
    }
  }
});

////// Starting the Game //////

function startGame() {
  if (game === "ready") {
    if (small === true || large === true) {
      interval = setInterval(moveSnake, 5000 / speed);
      game = "notready";
    }
  }
}

document.addEventListener("keyup", startGame);

////// Moving the snake //////

function moveSnake() {
  oldHeadX = gameState.snake.head[0];
  oldHeadY = gameState.snake.head[1];
  if (direction === "up") {
    document
      .getElementsByTagName("tr")
      [gameState.snake.head[1]].getElementsByTagName("td")
      [gameState.snake.head[0]].removeAttribute("class");
    gameState.snake.head[1]--;
    if (gameState.snake.head[1] < 0) {
      gameOver();
    } else if (
      document
        .getElementsByTagName("tr")
        [gameState.snake.head[1]].getElementsByTagName("td")
        [gameState.snake.head[0]].classList.contains("snake")
    ) {
      gameOver();
    } else {
      document
        .getElementsByTagName("tr")
        [gameState.snake.head[1]].getElementsByTagName("td")
        [gameState.snake.head[0]].classList.add("snake");
    }
  } else if (direction === "down") {
    document
      .getElementsByTagName("tr")
      [gameState.snake.head[1]].getElementsByTagName("td")
      [gameState.snake.head[0]].removeAttribute("class");
    gameState.snake.head[1]++;
    if (small === true && gameState.snake.head[1] > 9) {
      gameOver();
    } else if (large === true && gameState.snake.head[1] > 19) {
      gameOver();
    } else if (
      document
        .getElementsByTagName("tr")
        [gameState.snake.head[1]].getElementsByTagName("td")
        [gameState.snake.head[0]].classList.contains("snake")
    ) {
      gameOver();
    } else {
      document
        .getElementsByTagName("tr")
        [gameState.snake.head[1]].getElementsByTagName("td")
        [gameState.snake.head[0]].classList.add("snake");
    }
  } else if (direction === "left") {
    document
      .getElementsByTagName("tr")
      [gameState.snake.head[1]].getElementsByTagName("td")
      [gameState.snake.head[0]].removeAttribute("class");
    gameState.snake.head[0]--;
    if (gameState.snake.head[0] < 0) {
      gameOver();
    } else if (
      document
        .getElementsByTagName("tr")
        [gameState.snake.head[1]].getElementsByTagName("td")
        [gameState.snake.head[0]].classList.contains("snake")
    ) {
      gameOver();
    } else {
      document
        .getElementsByTagName("tr")
        [gameState.snake.head[1]].getElementsByTagName("td")
        [gameState.snake.head[0]].classList.add("snake");
    }
  } else if (direction === "right") {
    document
      .getElementsByTagName("tr")
      [gameState.snake.head[1]].getElementsByTagName("td")
      [gameState.snake.head[0]].removeAttribute("class");
    gameState.snake.head[0]++;
    if (small === true && gameState.snake.head[0] > 9) {
      gameOver();
    } else if (large === true && gameState.snake.head[0] > 19) {
      gameOver();
    } else if (
      document
        .getElementsByTagName("tr")
        [gameState.snake.head[1]].getElementsByTagName("td")
        [gameState.snake.head[0]].classList.contains("snake")
    ) {
      gameOver();
    } else {
      document
        .getElementsByTagName("tr")
        [gameState.snake.head[1]].getElementsByTagName("td")
        [gameState.snake.head[0]].classList.add("snake");
    }
  }
  if (
    document
      .getElementsByTagName("tr")
      [gameState.snake.head[1]].getElementsByTagName("td")
      [gameState.snake.head[0]].classList.contains("apple")
  ) {
    getApple();
  } else {
    renderSnakeBody();
  }
}

////// Render Body if the Snake ate an Apple //////

function getApple() {
  gameState.snake.body.push([oldHeadX, oldHeadY]);
  document
    .getElementsByTagName("tr")
    [oldHeadY].getElementsByTagName("td")
    [oldHeadX].classList.add("snake");
  for (let i = 0; i < gameState.snake.body.sLength; i++) {
    if (
      document
        .getElementsByTagName("tr")
        [gameState.snake.body[i][1]].getElementsByTagName("td")
        [gameState.snake.body[i][0]].classList.contains("snake") === false
    ) {
      document
        .getElementsByTagName("tr")
        [gameState.snake.body[i][1]].getElementsByTagName("td")
        [gameState.snake.body[i][0]].classList.add("snake");
    }
  }
  gameState.snake.sLength = gameState.snake.sLength + 1;
  scoreDisplay.innerText = gameState.snake.sLength;
  generateNewApple();
}

function generateNewApple() {
  const allCells = document.getElementsByTagName("td");
  let newAppleIndex = Math.floor(Math.random() * allCells.length);
  if (allCells[newAppleIndex].classList.contains("snake")) {
    generateNewApple();
  } else {
    allCells[newAppleIndex].classList.add("apple");
  }
}

////// Rendering the Snake //////

function renderSnakeBody() {
  if (gameState.snake.sLength > 0) {
    gameState.snake.body.push([oldHeadX, oldHeadY]);
    for (i = 0; i < gameState.snake.body.length; i++) {
      if (
        document
          .getElementsByTagName("tr")
          [gameState.snake.body[i][1]].getElementsByTagName("td")
          [gameState.snake.body[i][0]].classList.contains("snake") === false
      ) {
        document
          .getElementsByTagName("tr")
          [gameState.snake.body[i][1]].getElementsByTagName("td")
          [gameState.snake.body[i][0]].classList.add("snake");
      }
    }
    removedBodyPart = gameState.snake.body.shift();
    document
      .getElementsByTagName("tr")
      [removedBodyPart[1]].getElementsByTagName("td")
      [removedBodyPart[0]].removeAttribute("class");
  }
}

////// Game Over Function //////

const recordsBox = document.getElementById("records");

function gameOver() {
  for (i = 0; i < document.getElementsByTagName("td").length; i++) {
    document.getElementsByTagName("td")[i].removeAttribute("class");
    document.getElementsByTagName("td")[i].classList.add("dead");
  }
  score = gameState.snake.sLength;
  if (highScore === undefined || highScore < score) {
    highScore = score;
  }
  document.getElementById("highScoreValue").innerText = `${highScore}`;

  scoreRecords.push(score);
  let scoreRecordsCopy = scoreRecords.slice();
  function sumTheArray(array) {
    let sum = 0;
    for (i = 0; i < array.length; i++) {
      sum = sum + array[i];
    }
    return sum;
  }

  if (scoreRecords.length === 0) {
    averageScore = score;
  } else {
    averageScore = parseFloat(
      (sumTheArray(scoreRecordsCopy) / scoreRecords.length).toFixed(2)
    );
  }

  document.getElementById("averageScoreValue").innerText = `${averageScore}`;
  clearInterval(interval);

  recordsBox.innerHTML = "";

  function createNewListItemAndAppend(element) {
    let recordLi = document.createElement("li");
    recordsBox.appendChild(
      recordLi
    ).innerText = `Your snake was ${element} pixels long.`;
  }

  scoreRecords.forEach((element) => createNewListItemAndAppend(element));

  document.getElementById("playAgain").style.display = "block";
}

////// Resetting the board if the player clicks play again //////

const playAgain = document.getElementById("playAgain");

function resetTheBoard() {
  clearInterval(interval);
  for (i = 0; i < document.getElementsByTagName("td").length; i++) {
    document.getElementsByTagName("td")[i].removeAttribute("class");
  }
  gameState.apple[0] = 4;
  gameState.apple[1] = 4;
  gameState.snake.body = [];
  gameState.snake.head[0] = 6;
  gameState.snake.head[1] = 7;
  gameState.snake.sLength = 0;
  direction = "none";
  scoreDisplay.innerText = gameState.snake.sLength;
  document
    .getElementsByTagName("tr")
    [gameState.snake.head[1]].getElementsByTagName("td")
    [gameState.snake.head[0]].classList.add("snake");
  document
    .getElementsByTagName("tr")
    [gameState.apple[1]].getElementsByTagName("td")
    [gameState.apple[0]].classList.add("apple");
  game = "ready";
}

playAgain.addEventListener("click", resetTheBoard);
