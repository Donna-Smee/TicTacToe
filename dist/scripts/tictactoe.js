
let singlePlayerMode = false;
let multiPlayerMode = false;

const player1Str = "p1";
const player2Str = "p2";
const aiStr = "ai";

// const X = "X";
// const O = "O";

let player1 = null;
let player2 = null;
let ai = null;

let currentPlayer = null;

function resetData(){
    singlePlayerMode = false;
    multiPlayerMode = false;
    player1 = null;
    player2 = null;
    ai = null;
    human = null;
    currentPlayer = null;
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
        human = choice;
        ai = otherChoice(choice);
    }else {
        player2 = otherChoice(choice);
    }
    console.log("ME: " + player1);
    console.log("AI: " + ai);
}

// Player chose single player mode
// show the next screen to prompt for X or O choice
function initiateSinglePlayerGame(){
    resetData();    
    setSinglePlayerMode();

    hideStartScreen();
    showChooseXOScreen();
    
}






// randomize to choose who goes first (0 means player 1 goes first, 1 means player2/ai goes first)
function randomFirstPlayer(){
    // get a random int from 0 to 1
    /*let randNum = Math.floor(Math.random() * 2);

    if (randNum == 0){
        return player1Str;
    } 

    if (singlePlayerMode){
        return aiStr;
    }
    return player2Str;*/
    return aiStr;
}

// gets the current board from the webpage and turn into array
function getCurrentBoard(){
    let spaces = ["#S0", "#S1", "#S2", "#S3", "#S4", "#S5", "#S6", "#S7", "#S8"];
    let board = [];

    for (let i = 0; i < 9; ++i){
        let s = ($(spaces[i]).html());
        if (s.trim() == ""){
            board.push(i);
        }else {
            //board.push(s);
            if (s == "X"){
                board.push(X);
            }else {
                board.push(O);
            }
        }
    }
    console.log(board);
    return board;   
}


function startGame(){
    hideChooseXOScreen();
    showGameBoard();
    currentPlayer = randomFirstPlayer();
    showTurn(getTurnMessage(currentPlayer));
    startSinglePlayerGame();
}


function startSinglePlayerGame(){
    let board = getCurrentBoard();

    let copyBoard = [...board];
    
    let numChoices = getPossibleChoices(copyBoard);

   // while (numChoices > 0){
        if (currentPlayer == aiStr){
            let nextMove = minimax(copyBoard, ai, 0);
            alert(nextMove.spot);
        }
   // }

}


