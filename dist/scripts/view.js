const player1TurnMsg = "PLAYER 1's TURN";
const player2TurnMsg = "PLAYER 2's TURN";
const aiTurnMsg = "COMPUTER's TURN";
const yourTurnMsg = "YOUR TURN";


// Get the turn message to show to the user
function getTurnMessage(player){
    if (player == "p1"){
        if (singlePlayerMode){return yourTurnMsg;}
        return player1TurnMsg;
    }
    return player2TurnMsg;
}

function showTurn(message){
    $("#turn-message").html(message);
}