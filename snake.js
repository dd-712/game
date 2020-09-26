var cvs=document.querySelector('canvas');
cvs.width=window.innerWidth-50-(window.innerWidth-50)%25;
cvs.height=window.innerHeight-30-(window.innerHeight-30)%25;

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src ="audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

var ctx=cvs.getContext("2d");
var snakeW=25
var snakeH=25
var dir="down"
var score = 0;

function drawSnake(x,y,k) {
    ctx.fillStyle = ( k == 0 )? "yellow" : "white";
    ctx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH)
    ctx.fillStyle="black";
    ctx.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH)
}

snake=[];
for(var i=2;i>=0;i--) {
    snake.push({x:i,y:0})
} 

document.addEventListener("keydown",dirControl)
function dirControl(event) {
    if(event.keyCode==37 && dir!="right") {dir="left", left.play();}
    else if(event.keyCode==38 && dir!="down") {dir="up", up.play();}
    else if(event.keyCode==39 && dir!="left") {dir="right", right.play();}
    else if(event.keyCode==40 && dir!="up") {dir="down", down.play();}
}

var food={
    x:Math.round(Math.random()*(cvs.width/snakeW-2)+1),
    y:Math.round(Math.random()*(cvs.height/snakeH-2)+1)
}

function drawFood(x,y) {
    ctx.fillStyle="red";
    ctx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH)
    ctx.fillStyle="black";
    ctx.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH)
}

function draw() {
    ctx.clearRect(0,0,cvs.width,cvs.height)
    for(var i=0;i<snake.length;i++) {
        var snakeX=snake[i].x;
        var snakeY=snake[i].y;
        drawSnake(snakeX,snakeY,i)
    }
    drawFood(food.x,food.y)
    var headX=snake[0].x;
    var headY=snake[0].y;
    if(headX<0 || headY<0 || headX>=(cvs.width/snakeW) || headY>=(cvs.height/snakeH)) {
        dead.play(),
        alert("Game Over")
    }
    if(dir=="right") {headX++;}
    else if(dir=="left") {headX--}
    else if(dir=="up") {headY--}
    else if(dir=="down") {headY++}
    if(headX==food.x && headY==food.y) {
        food={
            x:Math.round(Math.random()*(cvs.width/snakeW-2)+1),
            y:Math.round(Math.random()*(cvs.height/snakeH-2)+1)
        }
        eat.play();
    }
    else {snake.pop();}
    var newhead={x:headX,y:headY}
    snake.unshift(newhead);
}

setInterval(draw,80)
