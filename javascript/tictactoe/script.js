/* To create a Tic Tac Toe game on console, we need:
1. The 3x3 board and methods to draw the board and change the token
2. The individual cell in the board and layers of interactivity
3. The tic tac toe game logic  */

/* The board:
The board should have the following:
1. Return 3x3 grid with the filled in board
2. A logic to handle which cells user can add
3. A logic to handle the adding of a marker */

function gameBoard() {
    // Setting up variables to define the columns and rows of the board
    const rows = 3;
    const columns = 3;

    // variable to have the board
    const board = [];

    // for loop to draw the board
    // we start with rows first 
    for (let i = 0; i < rows; i++) {
        board[i] = []; //we create an array for each row
        for (let j = 0; j < columns; j++) {
            board[i].push(gameCell()); //insert cell object
        }
    }

    //this function inserts the token for a player at a particular coordinate
    //this function is used later in playround
    dropToken = (x, y, player) => {
        const target = board[x][y];
        if (target.getValue() != 0) { //checks if cell is empty
            console.log('This cell is filled');
            return false;
        }
        else target.insertToken(player);
    };

    returnBoard = () => board; //function to return board 

    printBoard = () => {
        const boardWithValues = board
            .map((row) => row
                .map((cell) => cell.getValue()));
        console.log(boardWithValues);
    }; //function to print board

    return { returnBoard, dropToken, printBoard };

}

function gameCell() {
    let cell = 0;

    getValue = () => cell; //returns the cell

    //function to insert token
    function insertToken(player) {
        cell = player;
    }

    return { getValue, insertToken };
}


/* The board:
The board should have the following:
1. Return 3x3 grid with the filled in board
2. A logic to handle which cells user can add
3. A logic to handle the adding of a marker */

function gameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const game = gameBoard();

    const players = [
        {
            name: playerOneName,
            token: 'X'
        },
        {
            name: playerTwoName,
            token: 'O'
        }
    ];

    let activePlayer = players[0];

    //function to change player

    switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ?
            players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    printRound = () => {
        console.log(
            `It's ${getActivePlayer().name}'s turn.`
        );
        game.printBoard();
    };

    //win logic

    let winner = '';

    checkWinnerHorizontal = (board) => {
        const winningRow = board.filter((row) => new Set(row).size === 1
        );
        return winningRow.length > 0 ? true : false;
    };


    checkWinner = () => {
        //check if there are more than 3 tokens placed
        const filledBoard = game.returnBoard()
            .filter((row) => row
                .filter((cell) => cell.getValue() != 0).length
                > 0)
            .map(row => row.map(cell => cell.getValue()));

        const checkWin = checkWinnerHorizontal(filledBoard);
        console.log(checkWin);
        console.log(filledBoard);

        return checkWin === true ? getActivePlayer().name : null;
    };

    const playRound = (x, y) => {
        console.log(
            `Dropping ${getActivePlayer().name}'s token into position ${x + 1}, ${y + 1}`
        );
        const checkFilled = game.dropToken(x, y, getActivePlayer().token);
        if (checkFilled == false) {
            console.log(
                `The position ${x + 1}, ${y + 1} is used. Try again`
            );
        }
        else {
            switchPlayerTurn();
            printRound();
            checkWinner();
        };
    };



    printRound();

    return { playRound };
}

const game = gameController();