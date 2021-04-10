let mode = false;
let timeCounter;
let lapCounter;

let milisec = 0;
let lapmilisec = 0;
let seconds = 0;
let lapseconds = 0;
let minute = 0;
let lapminute = 0;
let lapsNr = 1;


$(function(){
    showhideBnt("#startButton","#lapButton");
    $("#startButton").on('click', () => {

        if(mode == true) {
            location.reload();
        }else {
            mode = true;
            $("#stopButton").show();
            $("#startButton").hide();

            startCount();
            startLapCount();
        }

    });

    $("#stopButton").on('click', function(){
        showhideBnt("#resumeButton","#resetButton");

        if(lapClick == false){
            milisec = lapmilisec;
        }

        stopCount();
        stopLapCount();
    });

    $("#resumeButton").on('click', function(){
        showhideBnt("#stopButton","#lapButton")

       
        startLapCount();
        startCount();
    });

    $("#resetButton").on('click', function(){
        location.reload();
    });

    let lapClick = false;
    $("#lapButton").on('click', function(){

        lapClick = true;
        let lapmilisecOut = checkTime(lapmilisec);
        let lapsecondsOut = checkTime(lapseconds);
        let lapminuteOut = checkTime(lapminute);
        
        if(mode == true) {
            $('#laps').prepend('<tr><td>Lap ' + lapsNr + " - " + lapminuteOut + ":" + lapsecondsOut + ":" + lapmilisecOut + '</td></tr>');
            lapsNr++;

            stopLapCount();
            lapminute = 0;
            lapseconds = 0;
            lapmilisec = 0;
            startLapCount();
        }
        
    });

    function startCount() {
        timeCounter = setInterval(function() { 

            let milisecOut = checkTime(milisec);
            let sedondsOut = checkTime(seconds);
            let minuteOut = checkTime(minute);

            milisec++;
            if(milisec == 100) {
                seconds++;
                milisec = 0;               
                if(seconds == 60) {
                    minute++;
                    seconds = 0;
                }
            }
            
            $("#timecentisecond").html(milisecOut);
            $("#timesecond").html(sedondsOut);
            $("#timeminute").html(minuteOut);  

        },10);
    }

    function startLapCount (){
        lapCounter = setInterval(function() {

            let lapmilisecOut = checkTime(lapmilisec);
            let lapsecondsOut = checkTime(lapseconds);
            let lapminuteOut = checkTime(lapminute);

            lapmilisec++;
            if(lapmilisec == 100) {
                lapseconds++;               
                lapmilisec = 0;
                if(lapseconds == 60) {
                    lapminute++; 
                    lapseconds = 0;
                }
            }

            $("#lapcentisecond").html(lapmilisecOut);
            $("#lapsecond").html(lapsecondsOut);
            $("#lapminute").html(lapminuteOut);

        },10);
    }


    function stopCount() {
        clearInterval(timeCounter); 
    }

    function stopLapCount() {
        clearInterval(lapCounter); 
    }

    function showhideBnt(x,y) {
        $(".btn").hide();
        $(x).show();
        $(y).show();
    }

    function checkTime(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
    }
});