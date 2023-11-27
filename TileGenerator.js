var sudokuGrid = null;

function generateSudoku() {
  const size = 9;
  const grid = new Array(size).fill(null).map(() => new Array(size).fill(null));

  // Funkcja sprawdzająca, czy liczba jest dopuszczalna w danym polu
  function isValid(num, row, col) {
    const rowIsValid = !grid[row].includes(num);
    const colIsValid = !grid.some((row) => row[col] === num);

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    const squareIsValid = !grid
      .slice(startRow, startRow + 3)
      .some((row) => row.slice(startCol, startCol + 3).includes(num));

    return rowIsValid && colIsValid && squareIsValid;
  }

  // Funkcja rekurencyjna do wypełniania planszy Sudoku
  function fillGrid(row, col) {
    if (row === size) {
      return true;
    }

    const nextRow = col === size - 1 ? row + 1 : row;
    const nextCol = col === size - 1 ? 0 : col + 1;

    const numbersToTry = Array.from({ length: size }, (_, i) => i + 1);
    numbersToTry.sort(() => Math.random() - 0.5); // Tasowanie

    for (const num of numbersToTry) {
      if (isValid(num, row, col)) {
        grid[row][col] = num;
        if (fillGrid(nextRow, nextCol)) {
          return true;
        }
        grid[row][col] = null;
      }
    }
    return false;
  }
  fillGrid(0, 0);
  return grid;
}

function CreateSudokuBoard() {
  var cells = Array.from( { length: 9 }, (_, row) => {
    return Array.from( {length: 9}, (_, col) => {
      return document.getElementById(`cell-${row + 1}-${col + 1}`);
    });
  });

  sudokuGrid = generateSudoku();
  sudokuGrid.forEach((row) => {
    console.log(row.join(' '));
  });

  sudokuGrid.forEach((row, rowIdx) => {
    row.forEach((value, colIdx) => {
      cells[rowIdx][colIdx].textContent = value;
    });
  });
}

function hideRandomTiles(trudnosc) {
  const allTiles = document.querySelectorAll(".par-col");
  const shuffledTiles = Array.from(allTiles).sort(() => Math.random() - 0.5);

  allTiles.forEach(tile => tile.style.fontSize = "0px");
  var tilesNumber = 0;
  switch (trudnosc) {

    case "trudna": {
      tilesNumber = 25;
    }
      break;

    case "srednia": {
      tilesNumber = 35;
    }
      break;

    case "latwa": {
      tilesNumber = 50;
    }
      break;
  }

  for (let i = 0; i < Math.min(tilesNumber, shuffledTiles.length); i++) {
    shuffledTiles[i].style.fontSize = "24px";
  }

}
var error = document.getElementById("error");


var selectedButton = null;
var selectedTile = null;

function handleTileClick(button) {
  if (button) {
    const buttonValue = parseInt(button.textContent);

    Array.from({ length: 9 }, (_, row) => {
      Array.from({ length: 9 }, (_, col) => {
        const tile = document.getElementById(`cell-${row + 1}-${col + 1}`);
        const tileValue = parseInt(tile.textContent);

          tile.style.backgroundColor = "";

        if (buttonValue === tileValue && tile.style.fontSize === "24px") {
          tile.style.backgroundColor = "Orange";
        }
        if (tile != null) {
          tile.removeEventListener('click', handleTileClick);
        }

        tile.addEventListener('click', function abc() {
          if (selectedTile && selectedTile !== tile) {
            selectedTile.style.backgroundColor = "";
          }
          tile.style.backgroundColor = "pink";
          selectedTile = tile;
          if (selectedButton) {
            selectedButton.style.backgroundColor = "";
          }

          if (selectedButton && selectedTile) {
            var validity = checkValidity(selectedButton);
            if (validity === true) {
              ExposeElement(selectedTile);
              updateCss(validity);
              selectedButton = null;
              setTimeout(function () {
                if (checkGameCompletion()) {
                  window.location.href = "SudokuEnd.html";
                }
              }, 2000);
            } else if (validity === false) {
              updateError();
              updateCss(validity);
              selectedButton = null;
            }
          }
        });
      });
    });
  }
}

function handleButtonClick() {
  Array.from({ length: 9 }, (_, row) => {
    const button = document.getElementById(`button-${row + 1}`);
    button.addEventListener('click', function () {
      if (selectedButton && selectedButton !== button) {
        selectedButton.style.backgroundColor = "";
        selectedButton = null;
      }
      button.style.backgroundColor = "pink";
      selectedButton = button;

      if(selectedButton != null){
        handleTileClick(selectedButton);
        selectedTile=null;
      }
    });
  });
}


function lost(){
  window.location.href ="Lost.html"
}

function updateError() {
  var error = document.getElementById("error");
  var increment = parseInt(error.textContent);
  increment = increment - 1;
  if(increment === 0){
    lost();
  }
  console.log(increment)

  error.textContent = increment.toString();
}

function getRowAndColFFromTileId(tileId) {
  return [parseInt(tileId.slice(5)), parseInt(tileId.slice(7))];
}

function checkValidity(selectedButton) {

  const buttonValue = parseInt(selectedButton.textContent);
  const [row, col] = getRowAndColFFromTileId(selectedTile.id);

  const cellValue = sudokuGrid[row - 1][col - 1];

  if (buttonValue === cellValue ) {
    return true;
  } else {
    console.log("buttonValue: ${buttonValue}, cellValue: ${cellValue}")
    return false;
  }
}

function ExposeElement(selectedTile) {
  selectedTile.style.fontSize = "24px";
}

function updateCss(validity) {
  if(validity==false){
    selectedTile.style.backgroundColor = "red";
    setTimeout(function() {
      selectedTile.style.backgroundColor = "";
      if (selectedButton != null) {
        selectedButton.style.backgroundColor = "";
      }
    }, 700);
  }
  else{
    selectedTile.style.backgroundColor = "green";
    setTimeout(function() {
      selectedTile.style.backgroundColor = "";
      if (selectedButton != null) {
        selectedButton.style.backgroundColor = "";
      }
    }, 700);
  }
}

function getParameter() {
  var urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('trudnosc');
}

document.addEventListener("DOMContentLoaded", function () {
  const trudnosc = getParameter();
  console.log("Before Create")
  CreateSudokuBoard();
  hideRandomTiles(trudnosc);
  handleButtonClick();
   
});

function goToDifferentWinow() {
  var potwierdzenie = confirm("Czy na pewno chcesz rozpocząć nową grę?");
            
  if (potwierdzenie) {
    window.location.href = "SudokuStart.html";
  }
}

function checkGameCompletion() {
  for (let row = 1; row <= 9; row++) {
    for (let col = 1; col <= 9; col++) {
      const element = document.getElementById(`cell-${row}-${col}`);
      const elementFontSize = window.getComputedStyle(element).fontSize;

      if (elementFontSize !== '24px') { return false; }
    }
  }

  return true;
}
