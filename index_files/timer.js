var count = 0;
var clearTime;
var seconds = 0, minutes = 0, hours = 0;
var clearState;
var secs, mins, gethours;
function startWatch() {
    if (seconds === 60) { seconds = 0; minutes = minutes + 1; }
    mins = (minutes < 10) ? ('0' + minutes + ':') : (minutes + ':');
    if (minutes === 60) { minutes = 0; hours = hours + 1; }
    gethours = (hours < 10) ? ('0' + hours + ':') : (hours + ':');
    secs = (seconds < 10) ? ('0' + seconds) : (seconds);
    var x = document.getElementById("stopWatch");
    x.innerHTML = 'Timer: ' + gethours + mins + secs;
    seconds++;
    clearTime = setTimeout("startWatch( )", 1000);
}
startWatch();
