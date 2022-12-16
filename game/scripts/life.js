var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
const epoch = document.querySelector('#epoch');
var cells = [];
var size = 10;
var columns = canvas.height/size;
var rows = canvas.width/size;
var interval;
var refreshPeriod = 100;
var cellColor = "#16fff7";
var cellBorderColor = "black";
var dropout = 0.2
var limitted = 0;

var img_cell = new Image();

function randomInit(){

	context.fillStyle = cellColor;
	context.strokeStyle = cellBorderColor;

	for(var i=0;i<rows;i++){
		cells[i] = [];
		for (var j=0;j<columns;j++){
			cells[i][j] = 0;
		}
	}

	var init_on = dropout * rows * columns;

	for (var i = 0; i<init_on; i++){
		var row = Math.round(Math.random()*(rows-1));
		var col = Math.round(Math.random()*(columns-1));
		cells[row][col] = 1
	}

	renderGame();
}

function init(){

	context.fillStyle = cellColor;
	context.strokeStyle = cellBorderColor;

	for (var i = 0; i<rows; i++) {
		cells[i] = [];
		for (var j = 0; j<columns; j++) {
			cells[i][j] = 0;
		}
	}

	renderGame();
}

function updateCells() {
	var over = true

	function _test(x, y) {
		if (!(cells[x] === undefined) && cells[x][y] === 1) {
			return 1;
		}
		return 0;
	}

	function liveNeighboursCount(x, y) {
		return _test(x-1, y-1) + _test(x, y-1) + _test(x+1, y-1) + 
		_test(x-1, y) + _test(x+1, y) + _test(x-1, y+1) +_test(x, y+1) + _test(x+1, y+1);
	}

	var newCells = [];
	var neighbours = [];

	for (var i = 0; i < rows; i++){

		neighbours[i] = []
		for (var j = 0; j<columns; j++) {
			neighbours[i][j] = liveNeighboursCount(i, j)
			if (neighbours[i][j] !== 0) {
				over = false
			}
		}
	}

	if (over) {
		limitted = 0
		epoch.innerHTML = limitted
		clearInterval(interval);
		init();
	}

	for (var i = 0; i<rows; i++) {

		newCells[i] = [];
		for (var j = 0; j<columns; j++) {
			newCells[i][j] = 0
			if (cells[i][j] ===1 && neighbours[i][j] < 2) {
				newCells[i][j] = 0;
			}
			if (cells[i][j] ===1 && (neighbours[i][j] === 2 || neighbours[i][j] === 3)) {
				newCells[i][j] = 1;
			} 
			if (cells[i][j] ===1 && neighbours[i][j] > 3) {
				newCells[i][j] = 0;
			}
			if (cells[i][j] ===0 && neighbours[i][j] === 3) {
				newCells[i][j] = 1;
			}

		}
	}
	return newCells;
}


function renderGame() {
	context.clearRect(0,0,canvas.width, canvas.height);
	for (var i = 0; i<rows; i++) {
		for (var j = 0; j<columns; j++) {
			if (cells[i][j] === 1 ) {
				// context.fillRect(i*size, j*size, size, size);
				img_cell.src = 'assets/cell.png'
				context.drawImage(img_cell,i * size ,j * size, 10, 10);
				// context.fillRect(i*size, j*size, size, size);
			} else {
				context.strokeRect(i*size, j*size, size, size);
			}
		}
	}
}


function draw() {
	limitted += 1
	epoch.innerHTML = limitted
	cells = updateCells();
	renderGame();
}

var click = true

var stopButton = document.getElementById("stop");
stopButton.addEventListener("click", function () {
	click = true
	clearInterval(interval);
});

var startButton = document.getElementById("start");
startButton.addEventListener("click", function () {
	if (click){
		interval = setInterval(draw, refreshPeriod);
		console.log(1)
		click = false
	}
});
var randomButton = document.getElementById("random");
randomButton.addEventListener("click", function () {
	click = true
	limitted = 0
	epoch.innerHTML = limitted
	clearInterval(interval)
	randomInit()

});
var clearButton = document.getElementById("clear");
clearButton.addEventListener("click", function () {
	click = true
	limitted = 0
	epoch.innerHTML = limitted
	clearInterval(interval);
	init();
});


canvas.addEventListener("click", function (event) {

	var x = Math.floor(event.offsetX/size);
	var y = Math.floor(event.offsetY/size);

	cells[x][y] = cells[x][y]?0:1;
	renderGame();
	// draw()
});


init();









