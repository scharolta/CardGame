let gameState = {
    score: 0,
    currentCompCard: '',
    time: '',
    gameActive: 1
};


function createRandom() {
    let values = "A234567890JQK";
    let suits = "SDCH";
    let cards = [];
    for (var i = 0; i < values.length; i++) {
        for (var j = 0; j < suits.length; j++) {
            cards.push(values[i] + suits[j]);
        }
    }
    return shuffle(cards);
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function dealCards(cards) {
    let halv = cards.length / 2;
    return { playerCards: cards.slice(0, halv - 1), computerCards: cards.slice(halv, cards.length - 1) };
}

function playerDraw(cards, playerDrawFunc) {
    setTimeout(function () {
        if (gameState.gameActive) {
            let playerCard = cards.pop();
            playerDrawFunc(playerCard);
            playerDraw(cards, playerDrawFunc);
        }
    }, 2500);
}

function computerDraw(cards, cardDrawnFunc) {
    setTimeout(function () {
        if (cards.length > 0) {
            let theCard = cards.pop();
            cardDrawnFunc(theCard);
            computerDraw(cards, cardDrawnFunc);
        }
        else {
            stopWatch();
            gameState.time = document.getElementById("stopwatch").innerHTML;
            gameState.gameActive = 0;
            addToTable();
        }
    }, 1500);
}

function scoring(card1, card2) {
    if (card1[0] == card2[0] || card1[1] == card2[1])
        return 1;
    else
        return -1;
}

function playingGame() {
    let cards = dealCards(createRandom());
    computerDraw(cards.computerCards, function (computerCard) {
        gameState.currentCompCard = computerCard;
    });
    playerDraw(cards.playerCards, function (playerCard) {
        gameState.score += scoring(gameState.currentCompCard, playerCard);
        document.getElementById("score").innerHTML = gameState.score;
    });
}

function addToTable() {
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

playingGame();