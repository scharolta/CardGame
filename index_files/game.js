// JavaScript source code
function playingGame() {
    let playerPoints = 0;
    let cards = dealCards(createRandom());
    while (cards.computerCards.length != 0) {
        let computerCard = draw(cards.computerCards);
        let playerCard = draw(cards.playerCards);
        playerPoints += scoring(computerCard, playerCard);
        document.getElementById("scoring").innerHTML = playerPoints;
    }
    return playerPoints;
}

function createRandom() {
    let values = "A234567890JQK";
    let suit = "SDCH";
    let cards = [];
    for (i = 0; i < 52; i++) {
        let rndValue = values[Math.floor(Math.random() * values.length)];
        let rndSuit = suit[Math.floor(Math.random() * suit.length)];
        cards.push(rndValue + rndSuit);
    }
    return cards;
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