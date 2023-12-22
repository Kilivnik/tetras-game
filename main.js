const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 20;

const TETROMINO_NAMES = ["O", "L", "I", "T", "J", "S", "Z"]; // список фігур

const TETROMINOES = {
  // опис як виглядають наші фігури
  O: [
    [1, 1],
    [1, 1],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  T: [
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 1],
  ],
  J: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
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

// генеруєм рандомний колір фігури
function randomGenerator(from, to) {
  return Math.floor(Math.random() * (to - from) + from);
}

function randomColor() {
  const r = randomGenerator(0, 256);
  const g = randomGenerator(0, 256);
  const b = randomGenerator(0, 256);
  const rgb = `rgb(${r}, ${g}, ${b})`;
  return rgb;
}

function generateTetromino() {
  // ф-ція опис фігури

  // 1) рандомний вибір фігури
  const nameTetro =
    TETROMINO_NAMES[Math.floor(Math.random() * TETROMINO_NAMES.length)];

  // 2) маємо розуміти пропорції фігури
  const matrixTetro = TETROMINOES[nameTetro];

  // 3) визначаємо центр поля для відмалювання фігури
  const columnTetro = Math.floor((PLAYFIELD_COLUMNS - matrixTetro.length) / 2);
  const rowTetro = 2;
  const colorTetro = randomColor();

  tetromino = {
    name: nameTetro,
    matrix: matrixTetro,
    row: rowTetro,
    column: columnTetro,
    color: colorTetro,
  };
}

generatePlayField();
generateTetromino();

const cells = document.querySelectorAll(".tetris div");

// Відмалювання фігур на полі

function drawPlayField() {
  for (let row = 0; row < PLAYFIELD_ROWS; row += 1) {
    for (let column = 0; column < PLAYFIELD_COLUMNS; column += 1) {
      // if (playField[row][column] === 0) {
      //   continue;
      // }
      const name = playField[row][column];
      const cellIndex = convertPositionToIndex(row, column);
      cells[cellIndex].classList.add(name);
    }
  }
}

function drawTetramino() {
  // відмальовуємо фігуру
  const color = tetromino.color;
  const name = tetromino.name;
  const tetrominoMatrixSize = tetromino.matrix.length;

  for (let row = 0; row < tetrominoMatrixSize; row += 1) {
    for (let column = 0; column < tetrominoMatrixSize; column += 1) {
      if (tetromino.matrix[row][column] === 0) {
        continue;
      }
      const cellIndex = convertPositionToIndex(
        tetromino.row + row,
        tetromino.column + column
      );
      cells[cellIndex].classList.add(name);
      cells[cellIndex].style.setProperty("--color-tetramino", color);
    }
  }
}

drawTetramino();

function draw() {
  cells.forEach(function (cell) {
    cell.removeAttribute("class");
  });
  drawPlayField();
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
      if (!tetromino.matrix[row][column]) {
        continue;
      }
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

      playField[tetromino.row + row][tetromino.column + column] =
        tetromino.name;
    }
  }
  generateTetromino();
}
