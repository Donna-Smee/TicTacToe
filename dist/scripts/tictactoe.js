
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

let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];


function resetData(){
    singlePlayerMode = false;
    multiPlayerMode = false;
    player1 = null;
    player2 = null;
    ai = null;
    currentPlayer = null;
    board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    // reset display
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
function initiateGame(isSinglePlayerGame){
    resetData();    

    if (isSinglePlayerGame){
        setSinglePlayerMode();
    }else {
        setMultiPlayerMode();
    }
    

    hideStartScreen();
    showChooseXOScreen();
    
}







// randomize to choose who goes first (0 means player 1 goes first, 1 means player2/ai goes first)
function randomFirstPlayer(){
    // get a random int from 0 to 1
    let randNum = Math.floor(Math.random() * 2);

    if (randNum == 0){
        currentPlayer = player1Str;
        return player1Str;
    } 

    if (singlePlayerMode){
        currentPlayer = aiStr;
        return aiStr;
    }
    currentPlayer = player2Str;
    return player2Str;
    //return aiStr;
}

function setCurrentPlayer(playerS){
    currentPlayer = playerS;
}

function switchToNextPlayer(){
    if (singlePlayerMode){
        if (currentPlayer == player1Str){
            currentPlayer = aiStr;
        }else {
            currentPlayer = player1Str;
        }
    }else {
        if (currentPlayer == player1Str){
            currentPlayer = player2Str;
        }else {
            currentPlayer = player1Str;
        }
    }
}

function nextPlayer(){
    switchToNextPlayer();
    showTurn(getTurnMessage(currentPlayer));
}



// gets the current board from the webpage and turn into array
// for testing
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

    return board;   
}


function startGame(){
    hideChooseXOScreen();
    currentPlayer = randomFirstPlayer();
    showTurn(getTurnMessage(currentPlayer));
    showGameBoard();
   // startSinglePlayerGame();
}


function startSinglePlayerGame(){
    

    let copyBoard = [...board];

    // if (currentPlayer == aiStr){
    //     let nextMove = minimax(copyBoard, ai, 0);
    //     alert(nextMove.spot);
    // }

    console.log(board);
    console.log(player1);
    console.log(player2);
    console.log(ai);


}

function getPlayerMark(player){
    if (player == player1Str){
        return player1;
    }else if (player == player2Str){
        return player2;
    }
    return ai;
}


function playMove(spotIndex){
    // don't do anything if the spot is taken already
    if (board[spotIndex] == X || board[spotIndex] == O){
        return;
    }

    let currentPlayerMark = getPlayerMark(currentPlayer);
    board[spotIndex] = currentPlayerMark;
    updateBoardDisplay(board);

    // check if game over
    if (hasWon(board, currentPlayerMark)){
        endGame(true);
    }else if (getPossibleChoices(board).length == 0){
        endGame(false);
    }else {
        nextPlayer();
   
    }

    
}


function endGame(isAWinner){
    if (isAWinner){
        showTurn(getWinningMessage(currentPlayer));
    }else {
        showTurn(tieMessage);
    }
    
    
    // disable game
    disableClicking();

    // show play again option or home option
}


 


