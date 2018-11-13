function playingGame() {
    let playerPoints = 0;
    let cards = dealCards(createRandom());
    while (cards.computerCards.length != 0) {
        let computerCard = draw(cards.computerCards);
        let playerCard = draw(cards.playerCards);
        playerPoints += scoring(computerCard, playerCard);
        document.getElementById("score").innerHTML = playerPoints;
    }
    return playerPoints;
}

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

function draw(cards) {
    return cards.pop();
}

function scoring(card1, card2) {
    if (card1[0] == card2[0] || card1[1] == card2[1])
        return 1;
    else
        return -1;
}

playingGame();