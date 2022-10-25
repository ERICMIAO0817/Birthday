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

var img_cell = new Image()

function randomInit(){

	context.fillStyle = cellColor;
	context.strokeStyle = cellBorderColor;

	for (var i = 0; i<rows; 2 i++) { cells[i]="[];" for (var j="0;" j<columns; j++) cells[i][j]="0;" } var init_on="dropout" * rows columns; i="0;" i<init_on; i++){ row="Math.round(Math.random()*(rows-1));" col="Math.round(Math.random()*(columns-1));" cells[row][col]="1" rendergame(); function init(){ context.fillstyle="cellColor;" context.strokestyle="cellBorderColor;" i<rows; updatecells() over="true" _test(x, y) if (!(cells[x]="==" undefined) && cells[x][y]="==" 1) return 1; 0; liveneighbourscount(x, _test(x-1, y-1) + _test(x+1, y+1) +_test(x, y+1); newcells="[];" neighbours="[];" < rows; neighbours[i]="[]" neighbours[i][j]="liveNeighboursCount(i," j) (neighbours[i][j] !="=" 0) (over) limitted="0" epoch.innerhtml="limitted" clearinterval(interval); init(); newcells[i]="[];" newcells[i][j]="0" (cells[i][j]="==1" 2) || 3))> 3) {
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
	for (var i = 0; i</rows;>