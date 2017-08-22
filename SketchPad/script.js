
var rows = 38;
var cols = 38;

var draw = false;

var randomColors = true; 

//create a default sketch pad 

$(document).ready(function defaultGrid() {

	var row_grid_baseHtml = '<div class="row-grid">';

	var container = document.getElementById('container');

	for (var j = 0; j < cols; j++) {
		row_grid_baseHtml = row_grid_baseHtml + '\n	<div class="unit"></div>';
	}

	row_grid_baseHtml = row_grid_baseHtml + "\n</div>";
	
	for (var i = 0; i < rows; i++) {
		container.insertAdjacentHTML('afterbegin', row_grid_baseHtml);
	}

	addMouseListeners();

});

function addMouseListeners() {

	$("#container").click(function() {

		if (draw == false) {

			if (randomColors == false) {

				$(".unit").mouseenter(function() {
					$(this).css("background-color", "red");
				});
			}
			else {

				$(".unit").mouseenter(function() {

					//get current color at pixel
					var current = $(this).css('background-color');
					//extract r,g,b values from current pixel
					var match = current.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);

					//console.log("before: " + $(this).css('background-color'));

					//if r value is 255, that means its white and is not coloured
					if (match[1] == 255) {

						console.log("if");

						//generate random r,g,b values
						var r = getRandomInt(0, 255);	
						var g = getRandomInt(0, 255);
						var b = getRandomInt(0, 255);

						$(this).css("background-color", "rgb(" 
							+ r + ", " 
							+ g + ", " 
							+ b + ")");	
					}
					else {

						
						var r = Number.parseInt(match[1]);
						var g = Number.parseInt(match[2]);
						var b = Number.parseInt(match[3]);

						//gradually make each color darker
						var new_r = Math.floor(r * 0.90);
						var new_g = Math.floor(g * 0.90);
						var new_b = Math.floor(b * 0.90);

						$(this).css("background-color", "rgb(" 
							+ new_r + ", " 
							+ new_g + ", " 
							+ new_b + ")");
					}

				});
			}

			draw = true;
		}
		else {

			$(".unit").unbind("mouseenter");

			draw = false;
		}
	});
}

function clearGrid() {

	$(".unit").css("background-color", "white");	
}

function generateGrid(size) {

	if (size > rows) {

		var difference = size - rows; 
		var row_elements = document.getElementsByClassName("row-grid");

		var container = document.getElementById('container');
		

		for (var i = 0; i < row_elements.length; i++) {
			for (var j = 0; j < difference; j++) {
				row_elements[i].insertAdjacentHTML('afterbegin', '\n <div class="unit"></div>');
			}
		}

		var row_grid_baseHtml = '<div class="row-grid">';	

		for (var j = 0; j < size; j++) {
			row_grid_baseHtml = row_grid_baseHtml + '\n	<div class="unit"></div>';
		}

		row_grid_baseHtml = row_grid_baseHtml + "\n</div>";
		
		for (var i = 0; i < difference; i++) {
			container.insertAdjacentHTML('afterbegin', row_grid_baseHtml);
		}

		rows = size;
	}
	else {
		var difference = rows - size;
		var row_elements = document.getElementsByClassName("row-grid");

		for (var j = 0; j < row_elements.length; j++) {
			for (var i = rows - 1; i >= rows-difference; i--) {
				row_elements[j].removeChild(row_elements[j].children[i]);
			} 
		}

		for (var k = 0; k < difference; k++) {
			row_elements[0].remove();
		}

		rows = size;
	}

}

function changeDims() {

	var userInput;
	var newDim;

	while (newDim < 0 || newDim > 64 || isNaN(newDim)) {
		userInput = prompt("Enter a number between 1 - 64: ");

		if (userInput == null || userInput == "") {
			break;
		}

		newDim = Number.parseInt(userInput);

		if (newDim > 0 && newDim < 65 || isNaN(newDim)) {
			generateGrid(newDim);
			break;
		}
	}
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
