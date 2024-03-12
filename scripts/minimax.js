
const X = "X";
const O = "O";

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




// Given a board and the current player, minimax returns the best next move the player should make
function minimax(board, player, count){


    let possibleChoices = getPossibleChoices(board);
    let numChoices = possibleChoices.length;


    // Check for terminal states
    if (hasWon(board, X)){
        return {"value": maxVal, "count": count};
    }else if (hasWon(board, O)){
        return {"value": minVal, "count": count};
    }else {
        if (numChoices == 0){
            return {"value": tieVal, "count": count};
        }
    }
    

    // set the next player
    let nextPlayer = null;
    if (player == X){
        nextPlayer = O;
    }else {
        nextPlayer = X;
    }

    let moves = [];
    let wantedValueFound = false;
    let wantedValue = getWantedValue(player);

    // loop through all possible choices
    for (let i = 0; i < numChoices; ++i){
        let thisMove = {};
        thisMove.spot = possibleChoices[i];
        
        // temporary put the move on the board
        board[thisMove.spot] = player;
        
     
        let result = minimax(board, nextPlayer, count+1)

        thisMove.value = result.value;
        if (thisMove.value == wantedValue){wantedValueFound = true;}
        thisMove.count = result.count;

        moves.push(thisMove);
        // remove the move (revert board to before)
        board[thisMove.spot] = possibleChoices[i];
    }
    
    return bestValue(moves, player, wantedValueFound);
 

}







// returns true if comparisonCount is better than baseCount, based on if the wanted value (min or max) was found
// wantedValueFound = true or false. If currPlayer == X, and a maxValue was found, then wantedValueFound == true
function bestCount(baseCount, comparisonCount, wantedValueFound){
    // wantedValueFound, wants to win asap, thus smaller count is better
    if (wantedValueFound){
        if (comparisonCount < baseCount){return true;}
        return false;
    }else {
        // if not, want to delay other player winning, thus a larger count is better
        if (comparisonCount > baseCount){return true;}
        return false;
    }
}



function getWantedValue(player){
    if (player == X){
        return maxVal;
    }
    return minVal;
}

function getBaseCount(player, wantedValueFound){
    if ((wantedValueFound && player == X) || (!wantedValueFound && player == O)){
        return 100000;
    }
    return -100000;
}






function bestValue(moves, player, wantedValueFound){
    if (moves.length == 1){return moves[0];}

    const baseCount = getBaseCount(player, wantedValueFound);

    const startValToMaximize = -100;
    const startValToMinize = 100;


    // ai wants to maximize the value
    if (player == X){
        return computeBestValue(moves, compareMaximize, startValToMaximize, baseCount, wantedValueFound);
    }
    return computeBestValue(moves, compareMinimize, startValToMinize, baseCount, wantedValueFound);

}


// Gets the best value given the moves, a function that determines if this move is better
function computeBestValue(moves, comparingFunction, startValue, baseCount, wantedValueFound){

    let bestVal = startValue;
    let bestMove = null;
    let bestCount = baseCount;

    for (let i = 0; i < moves.length; ++i){
        if (comparingFunction(bestVal, moves[i].value, bestCount, moves[i].count, wantedValueFound)){
            bestVal = moves[i].value;
            bestMove = moves[i];
            bestCount = moves[i].count;
        }
    }
    return bestMove;
}

// returns true if the currVal is larger than the bestVal
function compareMinimize(bestVal, currVal, currCount, newCount, wantedValueFound){
    if (currVal < bestVal){
        return true;
    } else if (currVal == bestVal){
        if (bestCount(currCount, newCount, wantedValueFound)){
            return true;
        }
    }
    return false;
}

// returns true if the currVal is smaller than the bestVal
function compareMaximize(bestVal, currVal, currCount, newCount, wantedValueFound){
    if (currVal > bestVal){
        return true;
    } else if (currVal == bestVal){
        if (bestCount(currCount, newCount, wantedValueFound, wantedValueFound)){
            return true;
        }
    }
    return false;
}



// module.exports = {getPossibleChoices, hasWon, bestValue, minimax};