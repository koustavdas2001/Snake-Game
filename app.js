// Game Constants & Variables

let inputDir = {x: 0, y: 0};
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");
let speed = 10;
let score = 0;
let hiscoreval = 0;
let lastPaintTime = 0;
let snakeArr = [{x:13, y:15}]
let food = {x:3, y:5};
let hiScoreBox = document.querySelector(".hiScoreBox");
let board = document.querySelector(".board");


// Game Funcions
function main(currTime) {
    window.requestAnimationFrame(main);
    //console.log(currTime);

  if((currTime - lastPaintTime)/1000 < 1/speed) {
    return;
   }
   lastPaintTime = currTime;
   gameEngine();
}

function isCollide(snake) {
    // If bumped into itself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}

function gameEngine() {
    //Part1:  Updating the Snake array & Food

    // If Snake collides
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0 };
        alert("Game Over! Press any key to Start Over");
        snakeArr = [{x:13, y:15}];
        musicSound.play();
        score = 0;
    }

    //If food eaten, Increment snake & gerenate food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score++;
        if (score>hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiScoreBox.innerHTML = "Hi-Score: " + hiscoreval;
        }
        let scoreBox = document.querySelector(".scoreBox");
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    //Moving the Snake
    for (let i = snakeArr.length-2; i>=0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    //Part2: Displaying Item
    
    // Displaying Sanke
    
    board.innerHTML = "";
    snakeArr.forEach((e, index)=> {
        let snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add("head"); 
        }
        else {
            snakeElement.classList.add("snake");
        }
        
        board.appendChild(snakeElement);
    });
    // Displaying Food
    let foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);

}

// Main Logic
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else {
    
    hiscoreval = JSON.parse(hiscore);
    hiScoreBox.innerHTML = "Hi-Score: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", e => {
    inputDir = {x:0, y:1} // Start the game
    moveSound.play();

    switch (e.key) {
        case "w":
            // console.log("w")
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "a":
            // console.log("a")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "s":
            // console.log("s")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "d":
            // console.log("d")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});