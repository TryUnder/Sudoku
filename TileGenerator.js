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

  const sudokuGrid = generateSudoku();

  sudokuGrid.forEach((row) => {
    console.log(row.join(' '));
  });

  sudokuGrid.forEach((row, rowIdx) => {
    row.forEach((value, colIdx) => {
      cells[rowIdx][colIdx].textContent = value;
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  CreateSudokuBoard();
});