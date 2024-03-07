
const X = "X";
const O = "O";

// Given a board (9 total spaces), return the spaces that are empty
function getPossibleChoices(board){
    return board.filter(isEmptySpot);
}


function isEmptySpot(spot){
    return spot != X && spot != O;
}

module.exports = {getPossibleChoices};