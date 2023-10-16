// var GenNum = () => Math.floor(1 + Math.random() * 9)

// var GenerateBoard = () => {
//     return [
//         [ GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum() ],
//         [ GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum() ],
//         [ GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum() ],
//         [ GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum() ],
//         [ GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum() ],
//         [ GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum() ],
//         [ GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum() ],
//         [ GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum() ],
//         [ GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum(), GenNum() ] ]
// }

// var GenerateBoard1 = () => {
//     return [[1, 3, 5],
// [2, 1, 1],
// [2, 5, 5]]
// }
// var duplicatesIdxs = [] 

// var board = GenerateBoard()

// console.log("Wylosowana tablica: ", board)

// function FindDuplicatesColumn() {
//     duplicatesIdxs = []
//     board[0].forEach((_, col) => {
//         const column = board.map((row, rowIdx) => {
//             return { value: row[col], row: rowIdx, col }
//         })
//         //console.log(column)
//         const duplicates = column.filter((item, index, arr) => {
//             return arr.findIndex(elem => elem.value === item.value) !== index
//         })
//         if (duplicates.length > 0) {
//             duplicatesIdxs.push(duplicates)
//         }
//     })
// }

// function PrintBoard(log) {
//     console.log(log, board)
// }

// function DeleteDuplicatesColumn() {
//     duplicatesIdxs.flat().forEach(item => {
//         const uniqueValues = new Set(board.map(row => row[item.col]))
//         //console.log("Wartości w tablicy: ", uniqueValues)
//         const possibleValues = Array.from( {length: 9 }, (_, i) => i + 1).filter(value => !uniqueValues.has(value))
//         //console.log("Wartości możliwe: ", possibleValues)
//         const randomValue = possibleValues[Math.floor(Math.random() * possibleValues.length)]
//         board[item.row][item.col] = randomValue
//     })
// }

// while (true) {
//     FindDuplicatesColumn()
//     if (duplicatesIdxs.length === 0) {
//         break;
//     }
//     PrintBoard("Przed: ")
//     DeleteDuplicatesColumn()
//     PrintBoard("Po: ")
// }

// duplicatesRowIdxs = []

// function FindDuplicatesRow() {
//     duplicatesRowIdxs = []
//     board.forEach((row, rowIdx) => {
//         const duplicatesIndexes = []
    
//         row.forEach((value, col) => {
//             const isDuplicated = row.indexOf(value) !== col
//             if (isDuplicated) {
//                 duplicatesIndexes.push({ row: rowIdx, col })
//             }
//         })
        
//         if (duplicatesIndexes.length > 0) {
//             duplicatesRowIdxs.push(duplicatesIndexes)
//         }
//     })    
//     //console.log(duplicatesRowIdxs)
// }

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
  
  const sudokuGrid = generateSudoku();
  
  sudokuGrid.forEach((row) => {
    console.log(row.join(' '));
  });
  
  