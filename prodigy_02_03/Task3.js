// script.js
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('reset');
    const modeSelector = document.getElementById('mode');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let isGameActive = true;
    let gameMode = modeSelector.value;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleClick(event) {
        const cell = event.target;
        const index = Array.from(cells).indexOf(cell);

        if (gameBoard[index] !== '' || !isGameActive) return;

        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWinner()) {
            message.textContent = `Player ${currentPlayer} wins!`;
            isGameActive = false;
        } else if (gameBoard.every(cell => cell !== '')) {
            message.textContent = 'It\'s a draw!';
            isGameActive = false;
        } else {
            if (gameMode === 'computer' && currentPlayer === 'X') {
                setTimeout(() => computerMove(), 500);
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                message.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    function checkWinner() {
        return winningConditions.some(condition => {
            const [a, b, c] = condition;
            return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
        });
    }

    function computerMove() {
        let availableCells = gameBoard.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
        let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];

        if (randomIndex !== undefined) {
            gameBoard[randomIndex] = 'O';
            cells[randomIndex].textContent = 'O';

            if (checkWinner()) {
                message.textContent = 'Computer wins!';
                isGameActive = false;
            } else if (gameBoard.every(cell => cell !== '')) {
                message.textContent = 'It\'s a draw!';
                isGameActive = false;
            } else {
                currentPlayer = 'X';
                message.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
        isGameActive = true;
    }

    function updateGameMode() {
        gameMode = modeSelector.value;
        resetGame();
    }

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    resetButton.addEventListener('click', resetGame);
    modeSelector.addEventListener('change', updateGameMode);

    // Initialize game state
    message.textContent = `Player ${currentPlayer}'s turn`;
});
