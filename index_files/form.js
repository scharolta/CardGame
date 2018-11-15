// JavaScript source code
$(document).ready(function () {
    $("form").submit(function (e) {
        $(".score").show();
        $("form").hide();

        let nameInput = $("#nameInput");
        let newRow = $('<tr>');

        let nameCell = $("<td>");
        let scoreCell = $("<td>");
        let dateCell = $("<td>"); 
        let timeCell = $("<td>");
        let d = new Date();

        nameCell.text(nameInput.val());
        scoreCell.text(gameState.score);
        timeCell.text(gameState.time);
        dateCell.text(d.toDateString());

        newRow.append(nameCell).append(scoreCell).append(timeCell).append(dateCell);
        $("tbody").append(newRow);
        e.preventDefault();
    });
});