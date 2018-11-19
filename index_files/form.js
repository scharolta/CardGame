// JavaScript source code
let savedGames;
$(document).ready(function () {
    $("form").submit(function (e) {
        e.preventDefault();
        $(".score").show();
        $("form").hide();

        let savedGame = {
            name: $("#nameInput").val(),
            setFromStorage: function () {
                if (typeof (Storage !== undefined)) {
                    savedGame.score = sessionStorage.getItem("score");
                    savedGame.timer = sessionStorage.getItem("timer");
                }
                savedGame.date = formatDate()
            }
        };

        savedGame.setFromStorage();

        if (typeof (Storage !== undefined)) {
            let savedGames;
            if (localStorage.getItem("savedGames") === undefined) {
                savedGames = [];
            }
            else {
                savedGames = JSON.parse(localStorage.getItem("savedGames"));
            }
            savedGames.push(savedGame);
            console.log(JSON.stringify(savedGames));
            localStorage.setItem("savedGames", JSON.stringify(savedGames));
        }
        addGamesToTable();
    });



    function addGamesToTable() {
        if (typeof (Storage !== undefined)) {
            let savedGames = JSON.parse(localStorage.getItem("savedGames"));
            savedGames.forEach(function (savedGame) {
                let newRow = $('<tr>');
                let nameCell = $("<td>");
                let scoreCell = $("<td>");
                let dateCell = $("<td>");
                let timeCell = $("<td>");

                nameCell.text(savedGame.name);
                scoreCell.text(savedGame.score);
                timeCell.text(savedGame.timer);
                dateCell.text(savedGame.date);
                newRow.append(nameCell).append(scoreCell).append(timeCell).append(dateCell);
                $("tbody").append(newRow);
            });
        }
    }

    function formatDate() {
        let today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10)
            dd = '0' + dd;

        if (mm < 10)
            mm = '0' + mm;

        return [dd, mm, yyyy].join("/");
    }
});