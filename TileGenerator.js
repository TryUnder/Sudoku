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

function hideRandomTiles() {
  const allTiles = document.querySelectorAll(".par-col");
  const shuffledTiles = Array.from(allTiles).sort(() => Math.random() - 0.5);

  allTiles.forEach(tile => tile.style.fontSize = "0px");

  for (let i = 0; i < Math.min(45, shuffledTiles.length); i++) {
    shuffledTiles[i].style.fontSize = "24px";
  }

}

var selectedButton = null
var selectedTile = null

  function handleTileClick(selectedButton) {

    if(selectedButton){
    const buttonValue = parseInt(selectedButton.textContent);


    Array.from({ length: 9 }, (_, row) => {
      Array.from({ length: 9 }, (_, col) => {

          const tile = document.getElementById(`cell-${row + 1}-${col + 1}`);
          const tileValue =parseInt(tile.textContent);;

          if(buttonValue ===tileValue && tile.style.fontSize === "24px"){
            tile.style.backgroundColor = "Orange";
            setTimeout(function() {
              tile.style.backgroundColor = "";
            }, 700);
          }

          tile.addEventListener('click',  function abc() {


            if (selectedTile && selectedTile !== tile) {
              selectedTile.style.backgroundColor = "";
            }
            if(selectedTile)
            tile.style.backgroundColor = "pink";
            selectedTile = tile;
            if(selectedButton ==null){
                tile.removeEventListener('click',abc);
                tile.style.backgroundColor = "";
            }

            if (selectedButton && selectedTile) {
              var validity = checkValidity(selectedButton)
              if (validity == true ) {
                ExposeElement(selectedTile);
                updateCss(validity);
                selectedButton = null;
    
              } else if (validity == false ) {
                updateError();
                updateCss(validity);
                selectedButton = null;
              }
            }
          }
          );
      });
    });
  }
}


var error = document.getElementById("error");

function handleButtonClick() {
  Array.from({ length: 9 }, (_, row) => {
    const button = document.getElementById(`button-${row + 1}`);
    button.addEventListener('click', function () {
      
      if (selectedButton && selectedButton !== button) {
        selectedButton.style.backgroundColor = "";
      }
      button.style.backgroundColor = "pink";
      selectedButton = button;

      if(selectedButton != null){
        handleTileClick(selectedButton);
        selectedTile=null
      }

    });
  });
}


function lost(){
  window.location.href ="Lost.html"
}

function updateError() {
  var error = document.getElementById("error");
  var increment = parseFloat(error.textContent);
  increment = increment - 0.5;
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
      selectedButton.style.backgroundColor = "";
    }, 700);
  }
  else{
    selectedTile.style.backgroundColor = "green";
    setTimeout(function() {
      selectedTile.style.backgroundColor = "";
      selectedButton.style.backgroundColor = "";
    }, 700);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  CreateSudokuBoard();
  hideRandomTiles();
  handleButtonClick();
});