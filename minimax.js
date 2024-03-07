
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


function hasWon(board, player){
    
}

module.exports = {getPossibleChoices, hasWon};