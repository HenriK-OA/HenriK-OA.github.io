function resetTimer() {
    let timer = setInterval(updateTimer, 1000);
    let seconds = 0;
    let minutes = 0;
    function updateTimer() {
        seconds++;
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        }
        let string = ""
        if (minutes < 10) {
            string +="0"
        }
        string = string + minutes + ":"
        if (seconds < 10) {
            string +="0"
        }
        string+=seconds
        $("#timerDisp").html(string);
        
    }
}
resetTimer();