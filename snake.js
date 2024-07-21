const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const gridSize = 20;
const tileCount = canvas.width / gridSize;
let snake = [{x: 10, y: 10}];
let food = {x: 15, y: 15};
let dx = 0;
let dy = 0;
let score = 0;
let highScore = 0;
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
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
    } while (isFoodOnSnake(newFood));
    
    food = newFood;
}

function isFoodOnSnake(pos) {
    return snake.some(segment => segment.x === pos.x && segment.y === pos.y);
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
    
    // Überprüfen und Aktualisieren des Highscores
    let savedHighScore = getCookie('snakeHighScore');
    if (savedHighScore !== null) {
        highScore = parseInt(savedHighScore);
    }
    
    if (score > highScore) {
        highScore = score;
        setCookie('snakeHighScore', highScore, 30); // Speichert für 30 Tage
    }
    
    // Zeige den Highscore an
    highScoreElement.textContent = highScore;
}

function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Initialize high score from cookie
let savedHighScore = getCookie('snakeHighScore');
if (savedHighScore !== null) {
    highScore = parseInt(savedHighScore);
    highScoreElement.textContent = highScore;
}

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('home-btn');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        window.location.href = 'home.html';
    });
});

changeCharacter(); // Initialisiere den Charakter beim Laden der Seite
requestAnimationFrame(gameLoop);