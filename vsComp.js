document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const playerTurnText = document.getElementById("player-turn");
    const scoreText = document.getElementById("score");
    const replayButton = document.getElementById("replay");
    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let player1Score = 0;
    let player2Score = 0;
    let gameActive = true;
    let playerStarts = true;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const checkWin = (player) => {
        return winningCombinations.some(combination => {
            return combination.every(index => board[index] === player);
        });
    };

    const checkDraw = () => {
        return board.every(cell => cell !== "");
    };

    const computerMove = () => {
        let move = -1;
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (board[a] === "O" && board[b] === "O" && board[c] === "") move = c;
            else if (board[a] === "O" && board[c] === "O" && board[b] === "") move = b;
            else if (board[b] === "O" && board[c] === "O" && board[a] === "") move = a;
        }
        if (move === -1) {
            for (let i = 0; i < winningCombinations.length; i++) {
                const [a, b, c] = winningCombinations[i];
                if (board[a] === "X" && board[b] === "X" && board[c] === "") move = c;
                else if (board[a] === "X" && board[c] === "X" && board[b] === "") move = b;
                else if (board[b] === "X" && board[c] === "X" && board[a] === "") move = a;
            }
        }
        if (move === -1) {
            const emptyCells = board.map((val, index) => val === "" ? index : null).filter(val => val !== null);
            move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        }

        board[move] = "O";
        cells[move].classList.add("O");
        cells[move].textContent = "O";
        cells[move].style.pointerEvents = "none";

        if (checkWin("O")) {
            playerTurnText.textContent = "Computer Wins!";
            player2Score++;
            scoreText.textContent = `You: ${player1Score} | Computer: ${player2Score}`;
            gameActive = false;
            replayButton.classList.remove("hidden");
        } else if (checkDraw()) {
            playerTurnText.textContent = "It's a Draw!";
            gameActive = false;
            replayButton.classList.remove("hidden");
        } else {
            playerTurnText.textContent = "Your turn";
        }
    };

    const handleCellClick = (e) => {
        const clickedCell = e.target;
        const index = parseInt(clickedCell.getAttribute("data-index"));

        if (board[index] !== "" || !gameActive) return;
        board[index] = currentPlayer;
        clickedCell.classList.add(currentPlayer);
        clickedCell.textContent = currentPlayer;
        clickedCell.style.pointerEvents = "none";
        if (checkWin(currentPlayer)) {
            playerTurnText.textContent = `You Win!`;
            if (currentPlayer === "X") {
                player1Score++;
            } else {
                player2Score++;
            }
            scoreText.textContent = `You: ${player1Score} | Computer: ${player2Score}`;
            gameActive = false;
            replayButton.classList.remove("hidden");
        } else if (checkDraw()) {
            playerTurnText.textContent = "It's a Draw!";
            gameActive = false;
            replayButton.classList.remove("hidden");
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            playerTurnText.textContent = `${currentPlayer === "X" ? "Your" : "Computer's"} turn`;
            if (currentPlayer === "O") {
                setTimeout(computerMove, 500);
                currentPlayer = "X";
            }
        }
    };

    const resetGame = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => {
            cell.textContent = "";
            cell.className = "cell";
            cell.style.pointerEvents = "auto";
        });
        gameActive = true;
        replayButton.classList.add("hidden");
        playerStarts = !playerStarts;
        currentPlayer = playerStarts ? "X" : "O";
        if (currentPlayer === "X") {
            playerTurnText.textContent = "Your turn";
        } else {
            playerTurnText.textContent = "Computer's turn";
            setTimeout(computerMove, 500);
            currentPlayer = "X";
        }
    };

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    replayButton.addEventListener("click", resetGame);
});