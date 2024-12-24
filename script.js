const ROWS = 6;
const COLUMNS = 7;
const game = document.getElementById('game');
const winnerDisplay = document.getElementById('winner');
const restartButton = document.getElementById('restart');

let board = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(null));
let currentPlayer = 'red';
let gameOver = false;

function createBoard() {
    game.innerHTML = '';
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLUMNS; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleMove);
            game.appendChild(cell);
        }
    }
}

function handleMove(e) {
    if (gameOver) return;

    const col = Number.parseInt(e.target.dataset.col);
    for (let row = ROWS - 1; row >= 0; row--) {
        if (!board[row][col]) {
            board[row][col] = currentPlayer;
            const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
            cell.classList.add(currentPlayer);
            if (checkWinner(row, col)) {
                winnerDisplay.textContent = `${currentPlayer === 'red' ? 'Rouge' : 'Jaune'} a gagné !`;
                gameOver = true;
            } else {
                currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            }
            break;
        }
    }
}

function checkWinner(row, col) {
    return (
        checkDirection(row, col, 1, 0) || // Horizontal
        checkDirection(row, col, 0, 1) || // Vertical
        checkDirection(row, col, 1, 1) || // Diagonal (bottom-left to top-right)
        checkDirection(row, col, 1, -1)   // Diagonal (top-left to bottom-right)
    );
}

function checkDirection(row, col, rowDir, colDir) {
    let count = 1;
    for (let i = 1; i < 4; i++) {
        const r = row + i * rowDir;
        const c = col + i * colDir;
        if (r >= 0 && r < ROWS && c >= 0 && c < COLUMNS && board[r][c] === currentPlayer) {
            count++;
        } else {
            break;
        }
    }
    for (let i = 1; i < 4; i++) {
        const r = row - i * rowDir;
        const c = col - i * colDir;
        if (r >= 0 && r < ROWS && c >= 0 && c < COLUMNS && board[r][c] === currentPlayer) {
            count++;
        } else {
            break;
        }
    }
    return count >= 4;
}

restartButton.addEventListener('click', () => {
    board = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(null));
    currentPlayer = 'red';
    gameOver = false;
    winnerDisplay.textContent = '';
    createBoard();
});

createBoard();
