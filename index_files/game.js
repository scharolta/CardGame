$(document).ready(function () {

    let deckOfCards = {
        baseUrl: "https://deckofcardsapi.com/api/deck/",
        newDeck: function () {
            return $.getJSON(this.baseUrl + "new/shuffle/")
                .done(function (newDeck) {
                    deckOfCards.deckId = newDeck.deck_id;
                });
        },
        drawCard: function () {
            return $.getJSON(this.baseUrl + deckOfCards.deckId + "/draw/");
        }
    };

    let game = {
        state: { paused: false },
        timerDelay: 250,

        new: function () {
            game.state.elapsedMs = 0;
            game.state.score = 0;
            game.state.over = false;
            game.state.playerCard = undefined;
            game.state.computerCard = undefined;
            $("section.buttons ul").addClass("padRemove");
            $("main").show();
            game.updateScore();
            if (game.state.paused)
                game.togglePause();
            deckOfCards.newDeck().done(function () {
                game.startTimer();
                game.drawPlayerCard();
                game.drawComputerCard();
                game.startComputerDelay();
            });
        },

        startTimer: function () {
            game.killTimer();
            game.state.timerIntervalHandle = setInterval(function () {
                game.state.elapsedMs += game.timerDelay;
                game.updateTimer();
            }, game.timerDelay);
        },

        updateTimer: function () {
            let minutes = Math.floor(game.state.elapsedMs / 60000);
            let seconds = Math.floor((game.state.elapsedMs % 60000) / 1000);
            let mins = (minutes < 10) ? ('0' + minutes + ':') : (minutes + ':');
            let secs = (seconds < 10) ? ('0' + seconds) : (seconds);
            $("#stopwatch").text(mins + secs);
        },

        killTimer: function () {
            if (game.state.timerIntervalHandle !== undefined) {
                clearTimeout(game.state.timerIntervalHandle);
                game.state.timerIntervalHandle = undefined;
            }
        },

        drawPlayerCard: function () {
            deckOfCards.drawCard()
                .done(function (drawData) {
                    if (drawData.success) {
                        let currentCard = drawData.cards[0];
                        game.state.playerCard = currentCard.code;
                        $("#discard").attr("src", $("#player").attr("src"));
                        $("#player").attr("src", currentCard.image);
                    }
                    else
                        game.finishGame();
                });
        },
        startComputerDelay: function () {
            game.state.computerTimeoutHandle = setTimeout(function () {
                game.drawComputerCard();
                game.startComputerDelay();
            }, 500) //change to random
        },

        drawComputerCard: function () {
            deckOfCards.drawCard().done(function (drawData) {
                if (drawData.success) {
                    let currentCard = drawData.cards[0];
                    game.state.computerCard = currentCard.code;
                    $("#computer").attr("src", currentCard.image);
                }
                else
                    game.finishGame();
            })
        },

        killComputerDelay: function () {
            if (game.state.computerTimeoutHandle !== undefined) {
                clearTimeout(game.state.computerTimeoutHandle);
                game.state.computerTimeoutHandle = undefined;
            }
        },

        addPlayed: function () {
            $(".hiddenElement").addClass("showHidden");
            setTimeout(function () {
                $(".hiddenElement").removeClass("showHidden");
            }, 1500)
        },

        usePlayerCard: function () {
            if (!game.state.over && game.state.playerCard !== undefined) {
                console.log("clicked");

                game.killComputerDelay();
                game.addPlayed();
                game.scoreCards();
                game.drawComputerCard();
                game.startComputerDelay();
                game.drawPlayerCard();
            }
        },

        scoreCards: function () {
            let points = -1;
            if (game.state.playerCard !== undefined &&
                game.state.computerCard !== undefined) {
                if (game.state.playerCard[0] == game.state.computerCard[0]
                    || game.state.playerCard[1] == game.state.computerCard[1]) {
                    points = 1;
                }
            }
            game.state.score += points;
            this.updateScore();
        },

        updateScore: function () {
            $("#score").html(game.state.score);
        },

        togglePause: function (bool) {
            game.state.paused = !game.state.paused;
            $("#pause").toggle();
            $("#restart").toggle();

            if (bool) {
                game.killComputerDelay();
                game.killTimer();
            }
            else {
                game.startComputerDelay();
                game.startTimer();
            }
        },

        finishGame: function () {
            if (!game.state.over) {
                game.state.over = true;
                game.killTimer();
                $("#computer").attr("src", "./index_files/Cardback_blue.png");
                $("#discard").attr("src", "./index_files/Cardback_red.png");
                $("#player").attr("src", "./index_files/Cardback_red.png");
            }
        }
    };

    $("#newGame").click(function () {
        game.new();
    });

    $("#pause").click(function () {
        game.togglePause(true);
    });

    $("#restart").click(function () {
        game.togglePause(false);
    });

    $("#player").click(function () {
        game.usePlayerCard();
    });

    $("#save").click(function () {
        if (typeof (Storage !== undefined)) {
            sessionStorage.setItem("score", game.state.score);
            sessionStorage.setItem("timer", $("#stopwatch").text());

            location.href = './feedback.html';
        }
        else { alert("No saving available"); }
    });

});