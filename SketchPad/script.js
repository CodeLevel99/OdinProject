
var rows = 32;
var cols = 32;

var gridPresent = false;


function defaultGrid() {

	if (gridPresent == false) {

		var row_grid_baseHtml = '<div class="row-grid">';

		var container = document.getElementById('container');
		

		for (var j = 0; j < cols; j++) {
			row_grid_baseHtml = row_grid_baseHtml + '\n	<div class="unit"></div>';
		}

		row_grid_baseHtml = row_grid_baseHtml + "\n</div>";
		
		for (var i = 0; i < rows; i++) {
			container.insertAdjacentHTML('afterbegin', row_grid_baseHtml);
		}

		$(".unit").mouseenter(function() {
			$(this).css("background-color", "red");
		});

		gridPresent = true;
	}

	else {

		$(".unit").css("background-color", "white");
	}
}

function generateGrid(row, col) {



}

function changeDims() {

	var userInput;
	var newDim;

	while (isNaN(newDim)) {
		userInput = prompt("Enter a number: ");
		newDim = Number.parseInt(userInput);
	}
}



