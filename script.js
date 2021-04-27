const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
let isPlayerX;
const WIN_COMBINATIONS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

let cellElements = document.querySelectorAll('[data-cell]');
const currentBoardClass = document.getElementById('board');
const winElement = document.querySelector('.win-msg');
const restartBtn = document.getElementById('restart-btn');
restartBtn.addEventListener('click', startGame);

startGame();

function startGame() {
  currentBoardClass.classList.remove(X_CLASS);
  currentBoardClass.classList.remove(CIRCLE_CLASS);
  isPlayerX = true;
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener('click', clickHandler);
    cell.addEventListener("click", clickHandler, {once: true});
  });

  
  currentBoardClass.classList.add(X_CLASS);
  winElement.classList.remove('show');
  
}

function clickHandler(event) {
  const cell = event.target;
  const currentClass = isPlayerX ? X_CLASS : CIRCLE_CLASS;
  placemark(cell, currentClass);
  if(checkWin(currentClass)) {
    displayWinMessage(true);
    console.log(isPlayerX);
  } else if(isDraw()){
    console.log('Draw');
    displayWinMessage(false);
  } else {
    switchPlayer();
    setBoardHoverClass();
  }
}

function placemark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function switchPlayer() {
  isPlayerX = !isPlayerX;
}

function setBoardHoverClass() {
  currentBoardClass.classList.remove(X_CLASS);
  currentBoardClass.classList.remove(CIRCLE_CLASS);
  if(isPlayerX) {
    currentBoardClass.classList.add(X_CLASS);
    return;
  }
  currentBoardClass.classList.add(CIRCLE_CLASS);
  return;
}

function checkWin(currentClass) {
  return WIN_COMBINATIONS.some(item => {
    return item.every(index => {
      return cellElements[index].classList.contains(currentClass);
    });
  })
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
  });
}

function displayWinMessage(isWin) {
  
  if(isWin) {
    document.querySelector('[data-win-text]').innerText = 
    `${isPlayerX ? 'X' : 'O'} Wins!!`;
  } else {
    document.querySelector('[data-win-text]').innerText = 
    `Match Draw!!`;
  }
  
  winElement.classList.add('show');
}
