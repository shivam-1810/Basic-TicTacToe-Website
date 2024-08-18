const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('player-turn');
const scoreDisplay = document.getElementById('score');
const replayButton = document.getElementById('replay');
let currentPlayer = 'X';
let gameState = Array(9).fill("");
let score = { 'X': 0, 'O': 0 };

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (gameState[index] !== "") return;

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    if (checkWinner()) {
        if(currentPlayer === 'X') {
            statusDisplay.textContent = `Player 1 Wins!`;
        } else {
            statusDisplay.textContent = `Player 2 Wins!`;
        }
        score[currentPlayer]++;
        updateScore();
        cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
        replayButton.classList.remove('hidden');
    } else if (gameState.every(cell => cell !== "")) {
        statusDisplay.textContent = "It's a Draw!";
        replayButton.classList.remove('hidden');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateTurn();
    }
}

function updateTurn() {
    statusDisplay.textContent = `Player ${currentPlayer === 'X' ? 1 : 2}'s Turn`;
    document.body.className = currentPlayer === 'X' ? 'player1-turn' : 'player2-turn';
}

function updateScore() {
    scoreDisplay.textContent = `Player 1: ${score['X']} | Player 2: ${score['O']}`;
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winningCombos.some(combo => {
        return combo.every(index => gameState[index] === currentPlayer);
    });
}

function resetGame() {
    gameState = Array(9).fill("");
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('X', 'O');
        cell.addEventListener('click', handleCellClick);
    });
    currentPlayer = 'X';
    updateTurn();
    replayButton.classList.add('hidden');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
replayButton.addEventListener('click', resetGame);
