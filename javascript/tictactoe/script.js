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
    let cell = '';

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

    //this function checks if there are only 1 unique key in the array
    //this function also checks horizontal wins
    checkWinnerLogic = (row) => {
        const winningRow = new Set(row).size;
        return winningRow == 1 ? true : false;
    };

    checkWinnerHorizontal = (board, length) => {
        let i = 0;
        let winner = false;
        while (i < length && winner == false) {
            let winningRow = board[i];
            winner = checkWinnerLogic(winningRow);
            i++;
        }
        return winner;
    };

    checkWinnerVertical = (board, length) => {
        let winner = false;
        let i = 0;
        while (winner == false && i < length) {
            let winningCol = board
                .map(row => row[i]);
            console.log(winningCol);
            winner = checkWinnerLogic(winningCol);
            i++;
        }
        return winner;
    };

    checkWinnerDiagonal = (board) => {
        const diagonalArrayTopLeft = [
            [0, 0],
            [1, 1],
            [2, 2]
        ];
        const diagonalArrayTopRight = [
            [0, 2],
            [1, 1],
            [2, 0]
        ];
        let winner = false;
        let i = 0;
        let winningRow = new Array();
        let winningKeys = diagonalArrayTopLeft;
        while (winner == false && i < 2) {
            console.log(`Run ${i}`);

            for (let key in winningKeys) {

                let row = winningKeys[key][0];
                let col = winningKeys[key][1];
                console.log(board[row][col]);

                winningRow.push(board[row][col]);
            }
            console.log(winningRow);
            winner = checkWinnerLogic(winningRow);
            winningRow = new Array();
            winningKeys = diagonalArrayTopRight;
            i++;
        }
        return winner;
    };
    checkWinner = () => {
        //check if there are more than 3 tokens placed
        const filledBoard = game.returnBoard()
            .filter((row) => row
                .filter((cell) => cell.getValue() != '').length
                > 0)
            .map(row => row.map(cell => cell.getValue()));
        //get length of filed board
        const filledBoardLength = filledBoard.length;

        let checkWin = checkWinnerHorizontal(filledBoard, filledBoardLength);
        if (checkWin == false) {
            checkWin = checkWinnerVertical(filledBoard, filledBoardLength);
            if (checkWin == false) {
                checkWin = checkWinnerDiagonal(filledBoard);
            }
        }

        return checkWin === true ?
            console.log(`Winner is ${getActivePlayer().name}`) : null;
    };

    const playRound = (x, y) => {
        //check if x,y is valid
        if (x > 2 || y > 2) {
            console.log(
                `Invalid input, try again`
            );
        } else {
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
    };
    printRound();

    const testRound = (direction) => {
        const horizontalWin = [
            [0, 0],
            [0, 1],
            [0, 2]
        ];
        const verticalWin = [
            [0, 0],
            [1, 0],
            [2, 0]
        ];
        const diagWin1 = [
            [0, 0],
            [1, 1],
            [2, 2]
        ];
        const diagWin2 = [
            [0, 2],
            [1, 1],
            [2, 0]
        ];
        switch (direction) {
            case ('horizontal'):
                keys = horizontalWin;
                break;
            case ('vertical'):
                keys = verticalWin;
                break;
            case ('diag1'):
                keys = diagWin1;
                break;
            case ('diag2'):
                keys = diagWin2;
        }
        for (key in keys) {
            let number = keys[key];
            game.dropToken(number[0], number[1], "X");
        }
        printRound();
        checkWinner();
    };
    return { playRound, testRound };
};

const game = gameController();

// DOM section

const body = document.querySelector('body');
const board = body.querySelector('#board');

// Add 3x3 grid for tic tac toe

// Collect the names inputted and display name

// DOM game logic