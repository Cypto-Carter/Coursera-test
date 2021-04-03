const canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 500;
canvas.tabindex = 0;
canvas.id = "Canvas";

const ctx = canvas.getContext("2d");
ctx.fillStyle = "aquamarine";
ctx.font = "50px 'Josefin Sans', sans-serif";
document.body.appendChild(canvas);

const grid = 20;
const paddleHeight = 100;
const maxPaddleY = canvas.height - grid - paddleHeight;
var ballSpeed = 5;
var playerScore = 0;
var cpuScore = 0;
var playing = false;

const player = { x: 720, y: canvas.height / 2 - paddleHeight / 2, width: grid, height: paddleHeight };
const cpu = { x: 80, y: canvas.height / 2 - paddleHeight / 2, width: grid, height: paddleHeight, dy: 0 };
const ball = { x: canvas.width / 2, y: canvas.height / 2 - grid / 2, width: grid, height: grid, dx: ballSpeed, dy: -ballSpeed };

function collides(obj1, obj2) {
    return obj1.x < obj2.x + obj2.width && obj1.x + obj1.width > obj2.x && obj1.y < obj2.y + obj2.height && obj1.y + obj1.height > obj2.y;
}

window.addEventListener('mousemove', function mouseLocation(m) {
    var mouseXpos = m.clientX - 292.5;
    var mouseYpos = m.clientY - 180;
    player.y = mouseYpos;
});

function draw() {
    requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(cpuScore, 100 + 100, 50);
    ctx.fillText(playerScore, 700 - 100, 50);

    if (cpu.y < grid) {
        cpu.y = grid;
    }
    else if (cpu.y > maxPaddleY) {
        cpu.y = maxPaddleY;
    }

    if (player.y < grid) {
        player.y = grid;
    }
    else if (player.y > maxPaddleY) {
        player.y = maxPaddleY;
    }


    if (playing) {
        cpu.y += ball.dy;
        ball.x += ball.dx;
        ball.y += ball.dy;
    }
    else {
        player.y = canvas.height / 2 - paddleHeight / 2;
    }


    ctx.fillRect(cpu.x, cpu.y, cpu.width, cpu.height);
    ctx.fillRect(player.x, player.y, player.width, player.height);


    if (ball.y < grid) {
        ball.y = grid;
        ball.dy *= -1;
    }
    else if (ball.y + grid > canvas.height - grid) {
        ball.y = canvas.height - grid * 2;
        ball.dy *= -1;
    }


    if (collides(ball, cpu)) {
        ball.dx *= -1;
        ball.x = cpu.x + cpu.width;
    }
    if (collides(ball, player)) {
        ball.dx *= -1;
        ball.x = player.x - player.width;
    }


    if (ball.x < 0) {
        resetBall();
        playerScore++;
        if (cpuScore > 3 && cpuScore > playerScore) {
            ballSpeed = 3;
            ball.dx = ballSpeed;
            ball.dy = -ballSpeed;
        }
        else {
            ballSpeed = 5;
            ball.dx = ballSpeed;
            ball.dy = -ballSpeed;
        }
    }
    if (ball.x > canvas.width - grid) {
        resetBall();
        cpuScore++;
        if (cpuScore >= 3 && cpuScore > playerScore) {
            ballSpeed = 3;
            ball.dx = ballSpeed;
            ball.dy = -ballSpeed;
        }
        else {
            ballSpeed = 5;
            ball.dx = ballSpeed;
            ball.dy = -ballSpeed;
        }
    }

    ctx.fillRect(ball.x, ball.y, ball.width, ball.height);
}
draw();

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = Math.floor(Math.random() * 400) + 50;
    cpu.y = canvas.height / 2 - paddleHeight / 2;
    playing = false;
    setTimeout(() => {
        playing = true;
    }, 500);
}

// onclick using jQuery
$("canvas").click(function () {
    playing = false;
    playerScore = 0;
    cpuScore = 0;
    cpu.y = canvas.height / 2 - paddleHeight / 2;
    player.y = canvas.height / 2 - paddleHeight / 2;
    ball.x = canvas.width / 2 - grid / 2;
    ball.y = canvas.height / 2 - grid / 2;
    ballSpeed = 5;
    ball.dx = ballSpeed;
    ball.dy = -ballSpeed;
    setTimeout(() => {
        playing = true;
    }, 500);
});