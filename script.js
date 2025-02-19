const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X';
let board = Array(9).fill('');
let isGameActive = true;

// Winning combinations
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Event listeners for cell clicks
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Event listener for the restart button
restartButton.addEventListener('click', restartGame);

// Handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    // Check if the cell is already filled or if the game is over
    if (board[index] !== '' || !isGameActive) {
        return;
    }

    // Update the board and the cell display
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    // Check for a win or draw
    checkResult();
}

// Check for winning conditions or draw
function checkResult() {
    if (checkWin()) {
        alert(`Player ${currentPlayer} wins!`);
        isGameActive = false;
    } else if (board.every(cell => cell !== '')) {
        alert("It's a draw!");
        isGameActive = false;
    } else {
        // Switch players
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Check if the current player has won
function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer;
    });
}

// Restart the game
function restartGame() {
    board.fill('');
    isGameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
    });
}