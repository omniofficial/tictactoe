// ------------------- GAMEBOARD STATE ------------------- //
const GameBoard = (function () {
    // private board state
    let board = ["", "", "", "", "", "", "", "", ""];

    // public: return a copy of the board
    const getBoard = () => [...board];

    // public: attempt to place a mark
    const placeMark = (index, mark) => {
        if (board[index] !== "") return false; // spot already taken
        board[index] = mark;
        return true;
    };

    // public: reset the board
    const reset = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    function checkWinner() {
        // Get current board
        const currentBoard = getBoard();

        // Store winningCombos
        const winningCombos = [
            [0, 1, 2], // top row
            [3, 4, 5], // middle row
            [6, 7, 8], // bottom row
            [0, 3, 6], // left column
            [1, 4, 7], // middle column
            [2, 5, 8], // right column
            [0, 4, 8], // diagonal
            [2, 4, 6], // other diagonal
        ];

        // Check if we have a winning combo anywhere in our currentBoard
        for (let i = 0; i < winningCombos.length; i++) {
            let combo = winningCombos[i];
            let a = combo[0];
            let b = combo[1];
            let c = combo[2];

            if (
                currentBoard[a] !== "" &&
                currentBoard[a] === currentBoard[b] &&
                currentBoard[a] === currentBoard[c]
            ) {
                return currentBoard[a]; // winner
            }
        }
    }

    return {
        getBoard,
        placeMark,
        reset,
        checkWinner,
    };
})();

// ------------------- GAME CONTROLLER / FLOW ------------------- //
const GameController = (function () {
    // Needs to remember who the players are, whose turn it is, and whether the game is over.
    // Create two players
    function createPlayer(name, mark) {
        return { name, mark };
    }

    const playerOne = createPlayer("Player 1", "X");
    const playerTwo = createPlayer("Player 2", "O");

    // Track current player
    const players = [playerOne, playerTwo];
    let currentPlayerIndex = 0;

    // Expose a playRound function
    function playRound(index) {
        // Get the current player.
        const currentPlayer = players[currentPlayerIndex];
        console.log("Current Player:", currentPlayer);

        // Can this player place a mark?
        const success = GameBoard.placeMark(index, currentPlayer.mark);
        console.log(
            "Mark was placed:",
            success,
            "Board state:",
            GameBoard.getBoard()
        );

        // Since it is a success, switch players.
        if (success) {
            currentPlayerIndex = 1 - currentPlayerIndex;
        }

        // Render results in GUI
        Render.renderBoard();

        // Check winner after turn
        const winner = GameBoard.checkWinner();
        if (winner) {
            console.log("Winner is:", winner);
        }
    }
    return { playRound };
})();

// ------------------- GUI RENDERER ------------------- //
const Render = (function () {
    function renderBoard() {
        console.log("Renderer called");
        const container = document.getElementById("board");

        container.innerHTML = "";

        // Get current board state.
        currentState = GameBoard.getBoard();
        for (let i = 0; i < currentState.length; i++) {
            const div = document.createElement("div");
            div.classList.add("cell");
            div.dataset.index = i;

            const symbol = document.createElement("p");
            symbol.textContent = currentState[i];
            div.appendChild(symbol);

            // Click listener for this cell. On every click, get index and call the playRound.
            div.addEventListener("click", (e) => {
                const index = Number(e.currentTarget.dataset.index);
                GameController.playRound(index); // call game logic
            });

            container.appendChild(div);
        }
    }
    return { renderBoard };
})();

// ------------------- PLAYGAME LOGIC ------------------- //
function playGame() {
    Render.renderBoard();
}
