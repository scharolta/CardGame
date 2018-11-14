var clearTime; //id for setTimeout
var seconds = 0, minutes = 0;
var timerOn = 0;
var secs, mins; //representation of time with zero

function startWatch() {
    timerOn = 1; //add if check
    if (seconds === 60) { seconds = 0; minutes = minutes + 1; }
    mins = (minutes < 10) ? ('0' + minutes + ':') : (minutes + ':');
    secs = (seconds < 10) ? ('0' + seconds) : (seconds);
    var x = document.getElementById("stopwatch");
    x.innerHTML = mins + secs;
    seconds++;
    clearTime = setTimeout("startWatch( )", 1000);
}
function stopWatch() {
    clearTimeout(clearTime);
    timerOn = 0;
}
