
$(document).ready(() => {
    $("#single-button").click(function(){
        initiateSinglePlayerGame();
    });

    $(".XO-button").click(function(){
        setPlayers(this.value);
        startGame();
    });

    
});