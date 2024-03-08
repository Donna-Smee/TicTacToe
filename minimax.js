
const X = "X";
const O = "O";

let ai = X;
let human = O;

const maxVal = 10;
const minVal = -10;
const tieVal = 0;

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
    let minimalCount = 100000;

    for (let i = 0; i < moves.length; ++i){
        if (comparingFunction(bestVal, moves[i].value, minimalCount, moves[i].count)){
            bestVal = moves[i].value;
            bestMove = moves[i];
            minimalCount = moves[i].count;
        }
    }
    return bestMove;
}

// returns true if the currVal is larger than the bestVal
function compareMinimize(bestVal, currVal, currMinimalCount, thisMinimalCount){
    if (currVal < bestVal){
        return true;
    } else if (currVal == bestVal){
        if (thisMinimalCount < currMinimalCount){
            return true;
        }
    }
    return false;
}

// returns true if the currVal is smaller than the bestVal
function compareMaximize(bestVal, currVal, currMinimalCount, thisMinimalCount){
    if (currVal > bestVal){
        return true;
    } else if (currVal == bestVal){
        if (thisMinimalCount < currMinimalCount){
            return true;
        }
    }
    return false;
}


// Given a board and the current player, minimax returns the best next move the player should make
function minimax(board, player, count){


    let possibleChoices = getPossibleChoices(board);
    let numChoices = possibleChoices.length;


    // Check for terminal states
    if (hasWon(board, ai)){
        return {"value": maxVal, "count": count};
    }else if (hasWon(board, human)){
        return {"value": minVal, "count": count};
    }else {
        if (numChoices == 0){
            return {"value": tieVal, "count": count};
        }
    }
    

    // set the next player
    let nextPlayer = null;
    if (player == ai){
        nextPlayer = human;
    }else {
        nextPlayer = ai;
    }

    let moves = [];
    // loop through all possible choices
    for (let i = 0; i < numChoices; ++i){
        let thisMove = {};
        thisMove.spot = possibleChoices[i];
        
        // temporary put the move on the board
        board[thisMove.spot] = player;
        let result = minimax(board, nextPlayer, count+1)
        thisMove.value = result.value;
        thisMove.count = result.count;

        moves.push(thisMove);
        // remove the move (revert board to before)
        board[thisMove.spot] = possibleChoices[i];
    }

    return bestValue(moves, player);

}


module.exports = {getPossibleChoices, hasWon, bestValue, minimax};