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

        // Can this player place a mark?
        const success = GameBoard.placeMark(index, currentPlayer.mark);

        // Since it is a success, switch players.
        if (success) {
            currentPlayerIndex = 1 - currentPlayerIndex;
        }

        // Check winner after turn
        const winner = GameBoard.checkWinner();
        if (winner) {
            console.log("Winner is:", winner);
        }
    }
    return { playRound };
})();

// Overall playGame logic.
function playGame() {
    let winner;
    while (!winner) {
        const index = Number(prompt("Enter square (0-8):"));
        GameController.playRound(index);
        winner = GameBoard.checkWinner();
    }
    console.log("Game over! Winner:", winner);
}
