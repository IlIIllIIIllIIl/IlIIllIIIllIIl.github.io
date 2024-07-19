const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const gridSize = 20;
const tileCount = canvas.width / gridSize;
let snake = [{x: 10, y: 10}];
let food = {x: 15, y: 15};
let dx = 0;
let dy = 0;
let score = 0;
let lastTime = 0;
const moveInterval = 100; // Schlange bewegt sich alle 100ms
let snakeHead = '🐸';
let snakeBody = '🟩';
let foodEmoji = '🍎';

document.addEventListener('keydown', changeDirection);

function changeCharacter() {
    const character = document.getElementById('character').value;
    if (character === 'snake') {
        snakeHead = '🐸';
        snakeBody = '🟩';
        foodEmoji = '🍎';
    } else if (character === 'banana') {
        snakeHead = '🍆';
        snakeBody = '🟪';
        foodEmoji = '💦';
    } else if (character === "cop") {
        snakeHead = "👮🏻";
        snakeBody = "🟦";
        foodEmoji = "🧔🏾";
    }
}

function changeDirection(event) {
    const key = event.key.toLowerCase();
    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    if ((key === 'a' || key === 'arrowleft') && !goingRight) {
        dx = -1;
        dy = 0;
    }
    if ((key === 'w' || key === 'arrowup') && !goingDown) {
        dx = 0;
        dy = -1;
    }
    if ((key === 'd' || key === 'arrowright') && !goingLeft) {
        dx = 1;
        dy = 0;
    }
    if ((key === 's' || key === 'arrowdown') && !goingUp) {
        dx = 0;
        dy = 1;
    }
}

function gameLoop(currentTime) {
    const deltaTime = currentTime - lastTime;
    if (deltaTime >= moveInterval) {
        clearCanvas();
        moveSnake();
        drawSnake();
        drawFood();
        checkCollision();
        lastTime = currentTime;
    }
    requestAnimationFrame(gameLoop);
}

function clearCanvas() {
    ctx.fillStyle = '#e8f3e8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++;
        updateScore();
        generateFood();
    } else {
        snake.pop();
    }
}

function drawSnake() {
    ctx.font = `${gridSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    snake.forEach((segment, index) => {
        const emoji = index === 0 ? snakeHead : snakeBody;
        ctx.fillText(emoji, segment.x * gridSize + gridSize / 2, segment.y * gridSize + gridSize / 2);
    });
}

function drawFood() {
    ctx.font = `${gridSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(foodEmoji, food.x * gridSize + gridSize / 2, food.y * gridSize + gridSize / 2);
}

function generateFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
}

function checkCollision() {
    if (snake[0].x < 0 || snake[0].x >= tileCount || snake[0].y < 0 || snake[0].y >= tileCount) {
        resetGame();
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            resetGame();
        }
    }
}

function resetGame() {
    snake = [{x: 10, y: 10}];
    food = {x: 15, y: 15};
    dx = 0;
    dy = 0;
    score = 0;
    updateScore();
    changeCharacter(); // Rufe changeCharacter auf, um den ausgewählten Skin beizubehalten
}

function updateScore() {
    scoreElement.textContent = score;
}

changeCharacter(); // Initialisiere den Charakter beim Laden der Seite
requestAnimationFrame(gameLoop);
