
$(document).ready(() => {
    $("#single-button").click(function(){
        initiateGame(true);
    });

    $("#multi-button").click(function(){
        initiateGame(false);
    })

    $(".XO-button").click(function(){
        setPlayers(this.value);
        startGame();
    });

    $(".space").click(function(){
        playMove(getSpaceIndex(this));
    });

    $("#home-button").click(() => {
        goHome();
    });

    $("#play-again-button").click(() => {
        playAgain();
    });

    
});


function getSpaceIndex(objClicked){
    // id is "S" + index number
    let id = objClicked.id;
    return parseInt(id.substring(1));
}