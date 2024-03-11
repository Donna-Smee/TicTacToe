const player1TurnMsg = "PLAYER 1's TURN";
const player2TurnMsg = "PLAYER 2's TURN";
const aiTurnMsg = "COMPUTER's TURN";
const yourTurnMsg = "YOUR TURN";

const p1Win = "Player 1 has won!";
const p2Win = "Player 2 has won!";
const aiWin = "The Computer has won!";
const tieMessage = "GAME OVER! It's a tie!";

// Get the turn message to show to the user
function getTurnMessage(player){
    if (player == player1Str){
        if (singlePlayerMode){return yourTurnMsg;}
        return player1TurnMsg;
    }else if (player == player2Str){
        return player2TurnMsg;
    }
    return aiTurnMsg;
    
}

function showTurn(message){
    $("#turn-message").html(message);
}

function getWinningMessage(playerStr){
    if (playerStr == player1Str){
        return p1Win;
    }
    if (playerStr == player2Str){
        return p2Win;
    }
    return aiWin;
}

