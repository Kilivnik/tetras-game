const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 20;

const TETROMINO_NAMES = ["O"]; // список фігур

const TETROMINOES = {
  // опис як виглядають наші фігури
  O: [
    [1, 1],
    [1, 1],
  ],
};

let playField; // зміна для зберігання стану, як має виглядати
let tetromino;

function convertPositionToIndex(row, column) {
  return row * PLAYFIELD_COLUMNS + column;
}

function generatePlayField() {
  // створюємо поле
  for (let i = 0; i < PLAYFIELD_ROWS * PLAYFIELD_COLUMNS; i += 1) {
    const div = document.createElement("div");
    document.querySelector(".tetris").append(div);
  }

  playField = new Array(PLAYFIELD_ROWS)
    .fill()
    .map(() => new Array(PLAYFIELD_COLUMNS).fill(0));
}

function generateTetromino() {
  // ф-ція опис фігури
  // 1) маємо розуміти яка в нас фігура
  const nameTetro = "O";
  // 2) маємо розуміти пропорції фігури
  const matrixTetro = TETROMINOES[nameTetro];
  // 3) маємо знати в якій колонці маємо малювати

  const columnTetro = 4;
  const rowTetro = 3;

  tetromino = {
    name: nameTetro,
    matrix: matrixTetro,
    row: rowTetro,
    column: columnTetro,
  };
}

generatePlayField();
generateTetromino();

const cells = document.querySelectorAll(".tetris div");

function drawTetramino() {
  // відмальовуємо фігуру
  const name = tetromino.name;
  const tetrominoMatrixSize = tetromino.matrix.length;

  for (let row = 0; row < tetrominoMatrixSize; row += 1) {
    for (let column = 0; column < tetrominoMatrixSize; column += 1) {
      const cellIndex = convertPositionToIndex(
        tetromino.row + row,
        tetromino.column + column
      );
      cells[cellIndex].classList.add(name);
    }
  }
}

drawTetramino();

function draw() {
  cells.forEach(function (cell) {
    cell.removeAttribute("class");
  });
  drawTetramino();
}

// відслідковуємо клавіатуру

document.addEventListener("keydown", onKeyDown);

function onKeyDown(event) {
  switch (event.key) {
    case "ArrowDown":
      moveTetrominoDown();
      break;
    case "ArrowLeft":
      moveTetrominoLeft();
      break;
    case "ArrowRight":
      moveTetrominoRight();
      break;
  }
  draw();
}

function moveTetrominoDown() {
  tetromino.row += 1;
  if (isOutSideOfGameBoard()) {
    tetromino.row -= 1;
    placeTetromino();
  }
}
function moveTetrominoLeft() {
  tetromino.column -= 1;
  if (isOutSideOfGameBoard()) {
    tetromino.column += 1;
  }
}
function moveTetrominoRight() {
  tetromino.column += 1;
  if (isOutSideOfGameBoard()) {
    tetromino.column -= 1;
  }
}

function isOutSideOfGameBoard() {
  const matrixSize = tetromino.matrix.length;
  for (let row = 0; row < matrixSize; row += 1) {
    for (let column = 0; column < matrixSize; column += 1) {
      if (
        tetromino.column + column < 0 ||
        tetromino.column + column >= PLAYFIELD_COLUMNS ||
        tetromino.row + row >= playField.length
      ) {
        return true;
      }
    }
  }
  return false;
}

// відображення нової фігури коли нижня торкнулась поля

function placeTetromino() {
  const matrixSize = tetromino.matrix.length;
  for (let row = 0; row < matrixSize; row += 1) {
    for (let column = 0; column < matrixSize; column += 1) {
      if (!tetromino.matrix[row][column]) continue;

      //   playField[tetromino.row + row][tetromino.column + column] = tetromino.;
    }
  }
  generateTetromino();
}
