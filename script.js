const gameInfo = document.querySelector('.gameInfo');
const boxes = document.querySelectorAll('.box');
const newGameBtn = document.querySelector('.btn');

let currentPlayer;
let gameGrid;

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Initialize the game
function initialize() {
  currentPlayer = 'X';
  gameGrid = Array(9).fill('');
  gameInfo.textContent = `Current Player: ${currentPlayer}`;
  boxes.forEach((box, index) => {
    box.textContent = '';
    box.className = `box box${index + 1}`;
    box.style.pointerEvents = 'all';
  });
  newGameBtn.classList.remove('active');
}

initialize();

// Handle box clicks
function handleClick(index) {
  if (!gameGrid[index]) {
    gameGrid[index] = currentPlayer;
    boxes[index].textContent = currentPlayer;
    boxes[index].style.pointerEvents = 'none';
    checkGameOver();
    if (!newGameBtn.classList.contains('active')) {
      swapTurns();
    }
  }
}

// Check game status
function checkGameOver() {
  let winner = '';

  winningPositions.forEach((position) => {
    const [a, b, c] = position;
    if (
      gameGrid[a] &&
      gameGrid[a] === gameGrid[b] &&
      gameGrid[b] === gameGrid[c]
    ) {
      winner = gameGrid[a];
      boxes[a].classList.add('win');
      boxes[b].classList.add('win');
      boxes[c].classList.add('win');
    }
  });

  if (winner) {
    gameInfo.textContent = `Winner is: ${winner}`;
    newGameBtn.classList.add('active');
    disableAllBoxes();
    return;
  }

  if (!gameGrid.includes('')) {
    gameInfo.textContent = 'Game Tied!';
    newGameBtn.classList.add('active');
  }
}

// Disable all boxes
function disableAllBoxes() {
  boxes.forEach((box) => {
    box.style.pointerEvents = 'none';
  });
}

// Swap turns
function swapTurns() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  gameInfo.textContent = `Current Player: ${currentPlayer}`;
}

// Add event listeners to boxes
boxes.forEach((box, index) => {
  box.addEventListener('click', () => handleClick(index));
});

// Reset game
newGameBtn.addEventListener('click', initialize);
