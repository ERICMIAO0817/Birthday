const playground = document.querySelector('#snake');
const ctx = playground.getContext('2d');
const score = document.querySelector('#score');
const speed = document.querySelector('#speed');
document.addEventListener("keydown", moveSnake);

// playground.width = 500;
// playground.height = 500;

const gridSize = 20;
const snakeColor = "#14eaf1";
const foodColor = "#646363";
const specialFoodColor = "#53d724";
var pre_key = 0
var init_speed = 82
var max_speed = 2
var bite_yourself = false

let tileCount_1 = playground.width / gridSize;
let tileCount_2 = playground.height / gridSize;

let velocityX = 0;
let velocityY = 0;
const trail = [];
const fruits = [];
let snakeTail = 5;

var intt;

var img1 = new Image();
var img2 = new Image();
var img3 = new Image();

var star_count = 0;
var tie_count = 0;

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

const repeatedGreetings = async () => {
  await sleep(init_speed)
  onGameFrame()
}

function getRandomTileCoord_1() {
  return Math.floor(Math.random() * (tileCount_1-1));
}

function getRandomTileCoord_2() {
  return Math.floor(Math.random() * (tileCount_2-1));
}

let snakeX = playground.width / 2 - gridSize / 2;
let snakeY = playground.height / 2 - gridSize / 2;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawPlayground() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, playground.width, playground.height);
}

function moveSnake(ev) {
  const oldX = velocityX;
  const oldY = velocityY;
  var flag = 1;

  if (pre_key === 37 || pre_key === 38 || pre_key === 39 || pre_key === 40){
    if (pre_key === ev.keyCode){
      if (bite_yourself === false) {
        if (init_speed !== max_speed) {
          init_speed -= 2
          repeatedGreetings()
        }
        else {
          init_speed = max_speed
          repeatedGreetings()
        }
        pre_key = ev.keyCode
        flag = 0
      }
      else {
        init_speed = 102
        repeatedGreetings()
      }
    }
    else{
      if (flag === 0){
        pre_key = 0
        init_speed = 102
        repeatedGreetings()
      }
      pre_key = 0
      init_speed = 102
      bite_yourself = false
      repeatedGreetings()
    }
  }

  pre_key = ev.keyCode
  switch (ev.keyCode) {
    case 37:
      // left
      velocityX = -1;
      velocityY = 0;
      break;
    case 38:
      //move up
      velocityX = 0;
      velocityY = -1;
      break;
    case 39:
      //move right
      velocityX = 1;
      velocityY = 0;
      break;
    case 40:
      //move down
      velocityX = 0;
      velocityY = 1;
      break;
  }

  // don't allow moving in the opposite direction
  // as it would end with suicide
  if (velocityX !== 0 && oldX !== 0 && oldX !== velocityX){
    if (oldX * velocityX < 0){
      velocityX = oldX;
      bite_yourself = true
    }

  }
  else if  (velocityY !== 0 && oldY !== 0 && oldY !== velocityY){
    if (oldY * velocityY < 0){
      velocityY = oldY
      bite_yourself = true
    }
  }
  else {
    bite_yourself = false
  }
  console.log(init_speed)
}

function drawFruits()
{
  img1.src = "assets/tie.png"
  img3.src = "assets/ds.png"

  for(let i = 0; i < fruits.length; i++)
  {
    const fruit = fruits[i];
    const star = "#ffffff"
    ctx.fillStyle = fruit.color;
    ctx.strokeStyle = fruit.color
    // ctx.fillRect(fruit.x * gridSize, fruit.y * gridSize, gridSize - 2, gridSize - 2);
    // ctx.beginPath();
    // ctx.arc(fruit.x * gridSize + (gridSize - 2) / 2, fruit.y * gridSize + (gridSize - 2) / 2, 14, 0, 2 * Math.PI);
    // ctx.fill();
    // ctx.fillStyle = star;
    // ctx.beginPath();
    // ctx.arc(fruit.x * gridSize + (gridSize - 2) / 2 + 3, fruit.y * gridSize + (gridSize - 2) / 2 - 4, 6, 0, 2 * Math.PI);
    // ctx.fill();
    // ctx.fillStyle = "#737373";
    // ctx.beginPath();
    // ctx.arc(fruit.x * gridSize + (gridSize - 2) / 2 + 5, fruit.y * gridSize + (gridSize - 2) / 2 - 6, 4, 0, 2 * Math.PI);
    // ctx.fill();
    if (fruit.points === 3){
      ctx.drawImage(img3,fruit.x * gridSize + (gridSize - 2) / 2 ,fruit.y * gridSize + (gridSize - 2) / 2, 35, 35);
    }
    else {
      ctx.drawImage(img1,fruit.x * gridSize + (gridSize - 2) / 2 ,fruit.y * gridSize + (gridSize - 2) / 2, 28, 28);
    }

  }
}

function handleSnakeEat()
{
  for(let i = 0; i < fruits.length; i++)
  {
    const fruit = fruits[i];

    if(snakeX === fruit.x + 1 && snakeY === fruit.y + 1)
    {
      if (fruit.points === 1){
        tie_count += 1
      }
      else{
        star_count += 1
      }
      snakeTail += fruit.points;
      score.innerHTML = snakeTail - 5;
      fruits.splice(i, 1);

      spawnFruit();

      if(getRandomInt(1, 10) === 10)
        spawnSpecialFruit();
    }
  }
}

function spawnFruit()
{
  var tmp = {x: getRandomTileCoord_1(), y: getRandomTileCoord_2(), points: 1, color: foodColor}
  fruits.push(tmp);
}

function spawnSpecialFruit()
{
  var tmp = {x: getRandomTileCoord_1(), y: getRandomTileCoord_2(), points: 3, color: specialFoodColor}
  fruits.push(tmp);
}

function onGameOver() {
  popUp()
  // window.alert = function (message, callbackFunc) {
  //   $('#alertContent').html(message);
  //   $('#modal').show();
  //   $('#confirmButton').onclick(function () {
  //     $('#modal').hide();
  //     location.reload()
  //     callbackFunc();
  //   });
  // };
  // setTimeout("  alert(\"我是一个警告框！\");  location.reload();",0)
  // alert("我是一个警告框！");
  // ctx.fillStyle = "#000";
  // ctx.fillRect(0, 0, playground.width, playground.height);
  // var finale = score.innerHTML
  // const str = `游戏结束，您的得分为：${finale}。\n击杀TIE战机数为：${tie_count}  击毁死星数为：${star_count}。`
  // if(alert(str)){clearInterval(intt);window.location.reload();}
  // else {clearInterval(intt);window.location.reload();}

}

function drawSnake() {

  snakeX += velocityX;
  snakeY += velocityY;

  if (snakeX < 0) {
    snakeX = tileCount_1 - 1;
  }
  if (snakeX > tileCount_1 - 1) {
    snakeX = 0;
  }
  if (snakeY < 0) {
    snakeY = tileCount_2 - 1;
  }
  if (snakeY > tileCount_2 - 1) {
    snakeY = 0;
  }

  drawPlayground();

  ctx.fillStyle = snakeColor;
  img2.src = "assets/xw.png"

  // ctx.rect(x * gridSize, y * gridSize, gridSize - 2, gridSize - 2);
  // ctx.fillStyle = pat;
  // ctx.fill();
  for (let i = 0; i < trail.length; i++) {
    const {x, y} = trail[i];

    if (i === trail.length - 1) {
      ctx.drawImage(img2,x * gridSize ,y*gridSize, 28, 18);
    }
    else{
      ctx.fillStyle = snakeColor
      ctx.beginPath();
      ctx.moveTo(x * gridSize + (gridSize - 2) / 2 + 6, y * gridSize + (gridSize - 2) / 2);
      ctx.lineTo(x * gridSize + (gridSize - 2) / 2 , y * gridSize + (gridSize - 2) / 2 - 6);
      ctx.lineTo(x * gridSize + (gridSize - 2) / 2 -6, y * gridSize + (gridSize - 2) / 2);
      ctx.lineTo(x * gridSize + (gridSize - 2) / 2 , y * gridSize + (gridSize - 2) / 2 + 6);
      ctx.closePath();
      // ctx.beginPath();
      // ctx.arc(x * gridSize + (gridSize - 2) / 2, y * gridSize + (gridSize - 2) / 2, 6, 0, 2 * Math.PI);
      ctx.fill();
      // ctx.fillRect(x * gridSize, y * gridSize, gridSize - 2, gridSize - 2);
    }
    // ctx.rect(x * gridSize, y * gridSize, gridSize - 2, gridSize - 2);
    // ctx.fillStyle = pat;
    // ctx.fill();
    // ctx.drawImage(img,x * gridSize ,y*gridSize, 25, 15);


    if ((x === snakeX && y === snakeY) && (snakeX !== 0 || snakeY !== 0)) {
      ctx.fillRect(x * gridSize, y * gridSize, gridSize - 2, gridSize - 2);
      onGameOver()
      // setTimeout(onGameOver, 0);
    }
  }
  // console.log(trail)
  trail.push({x: snakeX, y: snakeY});

  while (trail.length > snakeTail) {
    trail.shift();
  }
}

function onGameFrame() {
  drawSnake();
  drawFruits();
  handleSnakeEat();
}

function onGameInit(){
  spawnFruit();
  intt = setInterval(onGameFrame, init_speed);
};

window.addEventListener("keydown", function(e) {
  if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
    e.preventDefault();
  }
}, false);

function popUp() {
  var mask = document.getElementById('mask')
  var forCenter = document.getElementById('forCenter')
  var over = document.getElementById('over')

  mask.style.display = 'block';
  forCenter.style.display = 'block';
  over.style.display = 'block';

  finale_.innerHTML = score.innerHTML
  death_count.innerHTML = star_count
  fighter_count.innerHTML = tie_count

  clearInterval(intt)

  var clearButton = document.getElementById("restart");
  clearButton.addEventListener("click", function () {
    window.location.reload()
  });
  // onGameInit()

  //
  // clearInterval(intt);
  // window.location.reload()

}

onGameInit()