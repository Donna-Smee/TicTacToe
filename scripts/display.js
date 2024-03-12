
function showStartScreen(){
    $("#start-screen").css("display", "flex");
}

// hide the start screen
function hideStartScreen(){
    $("#start-screen").hide();
}

// show the choose X or O screen
function showChooseXOScreen(){
    $("#chooseXO-screen").css("display", "flex");
}

// hide the choose X or O screen
function hideChooseXOScreen(){
    $("#chooseXO-screen").hide();
}


function showGameBoard(){
    $("#game-board").css("display", "flex");
}

function hideGameBoard(){
    $("#game-board").hide();
}

function updateBoardDisplay(board){
    let boardSize = board.length;
    if (boardSize != 9){
        return;
    }

    for (let i = 0; i < boardSize; ++i){
        let boardSpot = board[i];
        if (boardSpot == X || boardSpot == O){
            $("#S" + i).html(boardSpot);
        }
    }
}

function clearBoard(size){

    for (let i = 0; i < size; ++i){
        $("#S" + i).html("");
    }

}


// prevent the player from playing
function disableClicking(){
    $("#game-board").css("pointer-events", "none");
}

// enable player to play
function enableClicking(){
    $("#game-board").css("pointer-events", "auto");
}