
const X = "X";
const O = "O";

// Given a board (9 total spaces), return the spaces that are empty
function getPossibleChoices(board){
    return board.filter(isEmptySpot);
}


function isEmptySpot(spot){
    return spot != X && spot != O;
}

/*
    0, 1, 2
    3, 4, 5
    6, 7, 8 
*/

/*
-- Possible Wins --

Row 1: 0, 1, 2
Row 2: 3, 4, 5
Row 3: 6, 7, 8

Col 1: 0, 3, 6
Col 2: 1, 4, 7
Col 3: 2, 5, 8

Diagonal 1: 0, 4, 8
Diagonal 2: 2, 4, 6

*/

// checks for all rows, columns, and diagonal wins
function hasWon(board, player){
    if ((board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player))
    {
        return true;
    }
    return false;
}

module.exports = {getPossibleChoices, hasWon};