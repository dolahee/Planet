let spaceship = document.getElementById('spaceship');
let gameContainer = document.getElementById('gameContainer');
let scoreElement = document.getElementById('score');

let score = 0;
let spaceshipPosition = { x: 125, y: 450 };
let obstacles = [];
let gameInterval;
let obstacleInterval;

// 우주선 움직이는 함수
function moveSpaceship(event) {

    let containerWidth = gameContainer.clientWidth;
    let containerHeight = gameContainer.clientHeight;

    if (event.key === 'ArrowLeft' && spaceshipPosition.x > 0) {
        spaceshipPosition.x -= 10;
    } else if (event.key === 'ArrowRight' && spaceshipPosition.x < containerWidth - 30) { // 우주선 너비 30을 뺀 값
        spaceshipPosition.x += 10;
    } else if (event.key === 'ArrowUp' && spaceshipPosition.y > 0) {
        spaceshipPosition.y -= 10;
    } else if (event.key === 'ArrowDown' && spaceshipPosition.y < containerHeight - 30) { // 우주선 높이 30을 뺀 값
        spaceshipPosition.y += 10;
    }
    spaceship.style.left = spaceshipPosition.x + 'px';
    spaceship.style.top = spaceshipPosition.y + 'px';
}

// 장애물 생성 함수
function createObstacle() {
    let obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    let containerWidth = gameContainer.clientWidth;
    obstacle.style.left = Math.random() * (containerWidth - 30) + 'px';
    obstacle.style.top = '0px';
    gameContainer.appendChild(obstacle);
    obstacles.push(obstacle);
}

// 장애물 움직이는 함수
function moveObstacles() {
    let containerHeight = gameContainer.clientHeight;

    for (let i = 0; i < obstacles.length; i++) {
        let obstacle = obstacles[i];
        let top = parseInt(obstacle.style.top);
        if (top > containerHeight) {
            gameContainer.removeChild(obstacle);
            obstacles.splice(i, 1);
            score++;
            scoreElement.innerText = 'Score: ' + score;
            i--;
        } else {
            obstacle.style.top = top + 5 + 'px';
            if (checkCollision(obstacle)) {
                endGame();
                return;
            }
        }
    }
}

// 충돌을 체크하는 함수
function checkCollision(obstacle) {
    let obstacleRect = obstacle.getBoundingClientRect();
    let spaceshipRect = spaceship.getBoundingClientRect();
    return !(obstacleRect.top > spaceshipRect.bottom ||
        obstacleRect.bottom < spaceshipRect.top ||
        obstacleRect.left > spaceshipRect.right ||
        obstacleRect.right < spaceshipRect.left);
}

// 게임 종료 시 호출되는 함수
function endGame() {
    clearInterval(gameInterval);
    clearInterval(obstacleInterval);
    alert('Game Over! Your score: ' + score);
}

// 게임 루프를 담당하는 함수
function gameLoop() {
    moveObstacles();
}

document.addEventListener('keydown', moveSpaceship);
gameInterval = setInterval(gameLoop, 50);
obstacleInterval = setInterval(createObstacle, 1000);
