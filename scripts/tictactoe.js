let singlePlayerMode = false;
let multiPlayerMode = false;

const X = "X";
const O = "O";

let player1 = null;
let player2 = null;

let ai = null;

function resetData(){
    singlePlayerMode = false;
    multiPlayerMode = false;
    player1 = null;
    player2 = null;
    ai = null;
}

function setSinglePlayerMode(){
    singlePlayerMode = true;
    multiPlayerMode = false;
}

function setMultiPlayerMode(){
    singlePlayerMode = false;
    multiPlayerMode = true;
}



// Given X, the other choice is O, vice versa
function otherChoice(choice){
    if (choice == X){
        return O;
    }
    return X;
}

// set the choice for player1, then for ai if single mode, 
// for multi mode, set the choice for player2
function setPlayers(choice){
    player1 = choice;
    if (singlePlayerMode){
        ai = otherChoice(choice);
    }else {
        player2 = otherChoice(choice);
    }
}

// Player chose single player mode
// show the next screen to prompt for X or O choice
function initiateSinglePlayerGame(){
    resetData();    
    setSinglePlayerMode();

    hideStartScreen();
    showChooseXOScreen();
    
}


function startGame(){
    hideChooseXOScreen();
    showGameBoard();
}




