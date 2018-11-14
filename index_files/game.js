let gameState = {
    score: 0,
    currentCompCard: '',
    currentPlayerCard: '',
    time: '',
    gameActive: 0
};

let deckId;
const baseUrl = "https://deckofcardsapi.com/api/deck/";

$(document).ready(function () {

    $("#newGame").click(function () {
        setUpGame();
        $.getJSON(baseUrl + "new/shuffle/")
            .done(function (data) {
                deckId = data.deck_id;
                setPlayerCard();
                shuffleCompCard();
            })
    });

    $("#pause").click(function () {
        $("#pause").toggle();
        $("#restart").toggle();
        stopWatch();
        gameState.gameActive = 0;
        $("#player").off("click");
    });

    var addPlayed = function () {
        $(".hiddenElement").addClass("showHidden");
        setTimeout(function () {
            $(".hiddenElement").removeClass("showHidden");
        }, 1500)
    };

    $("#restart").click(function () {
        $("#pause").toggle();
        $("#restart").toggle();
        let currentTime = document.getElementById("stopwatch").innerHTML.split(":");
        seconds = parseInt(currentTime[1], 10);
        minutes = parseInt(currentTime[0], 10);
        evaluate();
        $("#player").on("click", addPlayed);
    });

    $("#player").on("click", function () {
        addPlayed();
        evaluate();
        setPlayerCard();
    });
});

function shuffleCompCard() {
    setTimeout(function () {
        if (gameState.gameActive) {
            $.getJSON(baseUrl + deckId + "/draw/")
                .done(function (drawData2) {
                    let currentCard = drawData2.cards[0];
                    gameState.currentCompCard = currentCard.code;
                    $("#computer").attr("src", currentCard.image);
                    if (drawData2.remaining > 0)
                        shuffleCompCard();
                    else
                        finishGame();
                });
        }
        else
            finishGame();
    }, 500);
}

function setUpGame() {
    $("main").show();
    gameState.gameActive = 1;
    gameState.score = 0;
    document.getElementById("score").innerHTML = "0";
    minutes = 0; seconds = 0;
    startWatch();
}

function finishGame() {
    stopWatch();
    gameState.time = document.getElementById("stopwatch").innerHTML;
    gameState.gameActive = 0;
            //if (!cards.length) {
            //    addToTable(); //detta borde egentligen vara under save
            //}
}

function setPlayerCard() {
    $.getJSON(baseUrl + deckId + "/draw/")
        .done(function (drawData) {
            if (drawData.remaining) {
                currentCard = drawData.cards[0];
                gameState.currentPlayerCard = currentCard.code;
                $("#player").attr("src", currentCard.image);
            }
            else
                finishGame();
        });
}

function scoring(card1, card2) {
    if (card1[0] == card2[0] || card1[1] == card2[1])
        return 1;
    else
        return -1;
}

function evaluate() {
    gameState.score += scoring(gameState.currentCompCard, gameState.currentPlayerCard);
    document.getElementById("score").innerHTML = gameState.score;
}

function addToTable() {
    document.querySelector(".score").style.display = "block";
    let table = document.getElementById("table");
    let row = table.insertRow(1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let d = new Date();
    cell1.innerHTML = "Scharolta";
    cell2.innerHTML = d.toDateString();
    cell3.innerHTML = gameState.time;
    cell4.innerHTML = gameState.score;
}