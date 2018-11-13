var count = 0;
var clearTime;
var seconds = 0, minutes = 0, hours = 0;
var timerOn = 0;
var secs, mins, gethours;
function startWatch() {
    timerOn = 1; //add if check
    if (seconds === 60) { seconds = 0; minutes = minutes + 1; }
    mins = (minutes < 10) ? ('0' + minutes + ':') : (minutes + ':');
    if (minutes === 60) { minutes = 0; hours = hours + 1; }
    gethours = (hours < 10) ? ('0' + hours + ':') : (hours + ':');
    secs = (seconds < 10) ? ('0' + seconds) : (seconds);
    var x = document.getElementById("stopwatch");
    x.innerHTML = gethours + mins + secs;
    seconds++;
    clearTime = setTimeout("startWatch( )", 1000);
}
function stopWatch() {
    clearTimeout(clearTime);
    timerOn = 0;
}

function pause() {
    document.getElementById("restart").style.display = "inline-block";
    document.getElementById("pause").style.display = "none";
    stopWatch();
}

function restart() {
    let currentTime = document.getElementById("stopwatch").innerHTML.split(":");
    seconds = parseInt(currentTime[2], 10);
    minutes = parseInt(currentTime[1], 10);
    hours = parseInt(currentTime[0], 10);
    document.getElementById("restart").style.display = "none";
    document.getElementById("pause").style.display = "inline-block";
    startWatch();
}

startWatch();
document.getElementById("restart").addEventListener("click", restart);
document.getElementById("pause").addEventListener("click", pause);
