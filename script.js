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

    return {
        getBoard,
        placeMark,
        reset,
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
    }
})();
