
const X = "X";
const O = "O";

let ai = X;
let human = O;


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

// Given a list of moves, and the player (either ai or human), gets the best move
// Gets move with max value for ai
// Gets move with min value for human
// Assumes moves array has at least 1 move
function bestValue(moves, player){
    if (moves.length == 1){return moves[0];}

    const startValToMaximize = -100;
    const startValToMinize = 100;


    // ai wants to maximize the value
    if (player == ai){
        return computeBestValue(moves, compareMaximize, startValToMaximize);
    }
    return computeBestValue(moves, compareMinimize, startValToMinize);
    

}

// Gets the best value given the moves, a function that determines if this move is better
function computeBestValue(moves, comparingFunction, startValue){

    let bestVal = startValue;
    let bestMove = null;

    for (let i = 0; i < moves.length; ++i){
        if (comparingFunction(bestVal, moves[i].value)){
            bestVal = moves[i].value;
            bestMove = moves[i];
        }
    }
    return bestMove;
}

// returns true if the currVal is larger than the bestVal
function compareMinimize(bestVal, currVal){
    if (currVal < bestVal){
        return true;
    }
    return false;
}

// returns true if the currVal is smaller than the bestVal
function compareMaximize(bestVal, currVal){
    if (currVal > bestVal){
        return true;
    }
    return false;
}


function minimax(board, player){
    return -10000;
}

module.exports = {getPossibleChoices, hasWon, bestValue, minimax};