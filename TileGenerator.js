function generateSudoku() {
  const size = 9;
  const grid = new Array(size).fill(null).map(() => new Array(size).fill(null));
  const userGrid = new Array(size).fill(null).map(() => new Array(size).fill(null));

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

  //Funkcja losująca indeksy tablicy do wypełnienia, gzie len oznacza ilosc losowanych elementow
  function randomIndex(len){
    const selectedPairs = [];
    const pairs = []; // tablica wykorzystywana do losowania elementow planszy sudoku zawiera kombinacje wszystkich indeksow
    for (let i = 0; i < 9; i ++) {
      for (let j = 0; j < 9; j++) {
        pairs.push([i, j]);
      }
    }

    while (selectedPairs.length < len && pairs.length > 0) {
      const randomIndex = Math.floor(Math.random() * pairs.length);
      const pair = pairs[randomIndex];
      selectedPairs.push(pair);
      pairs.splice(randomIndex, 1);
    }

    return selectedPairs;
  }

  //Funkcja inichalizujaca plansze Sudoku pierwotnie widoczna dla uzytkownika
  function fillUserGrid() {

    const selectedPairs = randomIndex(25);
    for (let i = 0; i < selectedPairs.length; i++) {
      const firstPair = selectedPairs[i][0]; // Pierwsza para
      const secondPair = selectedPairs[i][1]; // Druga para
      userGrid[firstPair][secondPair] = grid[firstPair][secondPair];
    }
  }
  
  fillGrid(0, 0);
  fillUserGrid();

  return [grid, userGrid];
}
  
function CreateSudokuBoard() {
  var cells = Array.from( { length: 9 }, (_, row) => {
    return Array.from( {length: 9}, (_, col) => {
      return document.getElementById(`cell-${row + 1}-${col + 1}`);
    });
  });

  const [sudokuGrid, sudokuUserGrid] = generateSudoku();

  sudokuGrid.forEach((row) => {
    console.log(row.join(' '));
  });

  sudokuUserGrid.forEach((row, rowIdx) => {
    row.forEach((value, colIdx) => {
        cells[rowIdx][colIdx].textContent = value;
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  CreateSudokuBoard();
});

//Dragging buttons from under the main board 
function DragAndDrop(){
  let buttons = document.getElementsByClassName("panel")

    Array.from( { length: 9 }, (_, row) => {

      Array.from( {length: 9}, (_, col) => {

        let targetPlace = document.getElementById(`cell-${row + 1}-${col + 1}`);
        for(list of buttons) {
          list.addEventListener("dragstart", function(e){
          let selected = e.target
          //delete selected;
          console.log(selected)
         targetPlace.addEventListener("dragover", function(e){
              e.preventDefault();
              //selected=e.target;
          });
          targetPlace.addEventListener("drop", function(e){
              targetPlace.prepend(selected);
              selected=0
          });
        })
      }
      });
    });
  //alert(CreateSudokuBoard());

  
}
DragAndDrop();