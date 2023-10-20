
//CHRONO
const chrono = document.getElementById('chrono');
let m = 0;
let s = 0;

const time = setInterval(() => {
    s++;
    if(s > 59){
        s = 0;
        m++;
        if(m < 10){
            m = "0"+m;
        }
    }
    if(s < 10){
        s = "0"+s;
    }
    chrono.innerHTML = `<span id="minute">${m}</span>:<span id="seconde">${s}</span>`
}, 1000);


//CANVAS
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var ballRadius = 10;
    var x = canvas.width/2;
    var y = canvas.height-30;
    var dx = 2;
    var dy = -2;
    var paddleHeight = 10;
    var paddleWidth = 90;
    var paddleX = (canvas.width-paddleWidth)/2;
    var rightPressed = false;
    var leftPressed = false;
    var brickRowCount = 11;
    var brickColumnCount = 3;
    var brickWidth = 60;
    var brickHeight = 20;
    var brickPadding = 10;
    var brickOffsetTop = 50;
    var brickOffsetLeft = 30;
    var score = 0;

    var bricks = [];
    for(var c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(var r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e) {
        if(e.code  == "ArrowRight") {
            rightPressed = true;
        }
        else if(e.code == 'ArrowLeft') {
            leftPressed = true;
        }
    }
    function keyUpHandler(e) {
        if(e.code  == "ArrowRight") {
            rightPressed = false;
        }
        else if(e.code == 'ArrowLeft') {
            leftPressed = false;
        }
    }

    //Controle du jeu avec la souris
    // document.addEventListener('mousemove', mouseMoveHandler, false)

    // function mouseMoveHandler(e){
    //     var relativeX = e.clientX - canvas.offsetLeft - paddleWidth/2;
    //     if(relativeX > 0 && relativeX < canvas.width){
    //         paddleX = relativeX
    //     }
    // }

    function collisionDetection() {
        for(var c=0; c<brickColumnCount; c++) {
            for(var r=0; r<brickRowCount; r++) {
                var b = bricks[c][r];
                if(b.status == 1) {
                    if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                        dy = -dy;
                        b.status = 0;
                        score++;
                        if(score == brickColumnCount*brickRowCount){
                            win();
                            clearInterval(interval)
                        
                            document.addEventListener('keypress', (e) => {
                            if(e.key == "enter" || e.key == "Enter"){
                                 document.location.reload();
                            }
                          }
                            )}
                    }
                }
            }
        }
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }
    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "rgba(0, 45,754, 1)";
        ctx.fill();
        ctx.closePath();
    }
    function drawBricks() {
        for(var c=0; c<brickColumnCount; c++) {
            for(var r=0; r<brickRowCount; r++) {
                if(bricks[c][r].status == 1) {
                    var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                    var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = "rgb(189, 132, 97)";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }

    function drawScore(){
        ctx.font = "30px Arial";
        ctx.fillStyle = "blue";
        ctx.fillText("Score: " + score, 8, 30)
    }

    function gameOver(){
        ctx.font = "40px Arial";
        ctx.fillStyle = "red";
        ctx.fillText('Game over. Press enter to restart.', canvas.width/7, canvas.height/2);
        clearInterval(time)
    }
    function win(){
        ctx.font = "60px Arial";
        ctx.fillStyle = "green";
        ctx.fillText('Congratulation. You win !', canvas.width/10, canvas.height/2);
        clearInterval(time)
    }
    function author(){
        ctx.font = "15px Arial";
        ctx.fillStyle = "black";
        ctx.fillText('by Alexis Katel', canvas.width - 110, canvas.height - 5);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        author();
        drawBricks()
        drawBall();
        drawPaddle();
        collisionDetection();
        drawScore();

        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if(y + dy < ballRadius) {
            dy = -dy;
        }
        else if(y + dy > canvas.height-ballRadius)
        {
            if(x >= paddleX && x <= paddleX + paddleWidth){
                dy = -dy - ((Math.random()*40 +40)/100);
            }
            else{
                gameOver();
                clearInterval(interval)
                document.addEventListener('keypress', (e) => {
                    if(e.key == "enter" || e.key == "Enter"){
                        document.location.reload();
                    }
                })

            }
        }

        if(rightPressed && paddleX < canvas.width-paddleWidth) {
            paddleX += 7;
        }
        else if(leftPressed && paddleX > 0) {
            paddleX -= 7;
        }

        x += dx;
        y += dy;
    }

    var interval = setInterval(draw, 10);
