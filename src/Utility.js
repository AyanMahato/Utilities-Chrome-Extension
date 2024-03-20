
/*Stopwatch code*/
let stopwatchRunning = false;
let miliseconds=0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let ltime=0;
let intervalId;
document.getElementById('cti').style.display = 'none';
document.getElementById('csw').style.display = 'none';
document.getElementById('clocktimezone').style.display = 'none';
document.addEventListener('DOMContentLoaded', function() {
document.getElementById("startsw").addEventListener("click", startStopwatch);
document.getElementById("lapsw").addEventListener("click", lapStopwatch);
document.getElementById("stopsw").addEventListener("click", stopStopwatch);
document.getElementById("resetsw").addEventListener("click", resetStopwatch);

document.getElementById("startti").addEventListener("click", startTimer);
document.getElementById("stopti").addEventListener("click", stopTimer);
document.getElementById("resetti").addEventListener("click", resetTimer);
document.getElementById('options').addEventListener('change', function() {
  var selectedValue = document.getElementById('options').value;
  if (selectedValue === 'stopwatch') {
    if(document.getElementById('csw').style.display == 'block')
    document.getElementById('csw').style.display = 'none';
    else
    document.getElementById('csw').style.display = 'block';
  }
  if(selectedValue === 'timer') {
    if(document.getElementById('cti').style.display == 'block')
    document.getElementById('cti').style.display = 'none';
    else
    document.getElementById('cti').style.display = 'block';
  }
  if(selectedValue === 'timezone') {
    if(document.getElementById('clocktimezone').style.display == 'block')
    document.getElementById('clocktimezone').style.display = 'none';
    else
    document.getElementById('clocktimezone').style.display = 'block';
  }
});

});







    function startStopwatch() {
      if (!stopwatchRunning) {
        stopwatchRunning = true;
        intervalId = setInterval(updateStopwatch, 10);
      }
    }

    function stopStopwatch() {
      clearInterval(intervalId);
      stopwatchRunning = false;
    }

    function resetStopwatch() {
      stopStopwatch();
      seconds = 0;
      minutes = 0;
      hours = 0;
      miliseconds=0;
      updateStopwatch();
      var container = document.getElementById("laps");
      while (container.firstChild) {
    container.removeChild(container.firstChild);
  } 

    }

    function updateStopwatch() {
      if(stopwatchRunning===true)
      miliseconds++;
      if (miliseconds === 100) {
        miliseconds = 0;
        seconds++;
      }
      if (seconds === 60) {
        seconds = 0;
        minutes++;}
      if (minutes === 60) {
          minutes = 0;
          hours++;
        }
      
      const formattedTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(miliseconds)}`;
      document.getElementById('stopwatch').textContent = formattedTime;
    }

    function formatTime(value) {
      return value < 10 ? (value == 0? '00':`0${value}`): value;
    }

    function lapStopwatch(){
      ltime=((hours*60+minutes)*60+seconds)*100+miliseconds;
      if(ltime!==0){
      var container = document.getElementById("laps");
      var newText = document.createElement("p");
      const formattedTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(miliseconds)}`;
      newText.textContent = formattedTime;
      container.appendChild(newText);}
    }

/*Timer code*/
document.getElementById('timerinput').style.display = 'grid';
document.getElementById('timeleft').style.display = 'none';
let timerRunning=false;
let timerzero=true;
let thours=0;
let tminutes=0;
let tseconds=0;
let tmiliseconds=0;

function startTimer(){
  document.getElementById('timerinput').style.display = 'none';
document.getElementById('timeleft').style.display = 'flex';
  timerRunning=true;
  if(timerzero==true){
    thours=document.getElementById("timerhours").value;
    tminutes=document.getElementById("timerminutes").value;
    tseconds=document.getElementById("timerseconds").value;
    tmiliseconds=0;
    intervalId = setInterval(updateTimer, 10);
    timerzero=false;}
  else{
    clearInterval(intervalId);
    intervalId = setInterval(updateTimer, 10);
  }
}

function updateTimer(){
  
if(timerRunning===true){
  if(tmiliseconds==0)
  {
    tmiliseconds=100;
    if(tseconds==0)
    {
      tseconds=60;
      if(tminutes==0)
      {
        tminutes=60;
        if(thours==0)
        {tmiliseconds=1;
          tseconds=1;
          tminutes=1;
          thours=1;
        stopTimer();
      timerzero=true;}
        thours--;        
        
      }
      tminutes--;
    }
      tseconds--;
  }
   tmiliseconds--;    
  }
  
  const formattedTime = `${formatTime(thours)}:${formatTime(tminutes)}:${formatTime(tseconds)}:${formatTime(tmiliseconds)}`;
  document.getElementById('timeleft').textContent = formattedTime;
}


function stopTimer() {
  if (timerRunning==true){
  clearInterval(intervalId);
  timerRunning = false;}
}
function resetTimer() {
  stopTimer();
  tseconds = 0;
  tminutes = 0;
  thours = 0;
  tmiliseconds=0;
  updateTimer();
  timerzero=true;
  document.getElementById('timerinput').style.display = 'grid';
  document.getElementById('timeleft').style.display = 'none';
}

//Timezone
let offset=0;
function getAllTimezones() {
  const apiUrl = 'https://worldtimeapi.org/api/timezone';

  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      return null;
    });
}
function getTimefromTimezone(location)
{
  const apiUrl = `http://worldtimeapi.org/api/timezone/${location}`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      var currentTime = data.datetime.substring(11,19)+":"+data.datetime.substring(20,22);
      offset=data.raw_offset;
    })
    .catch(error => {
      console.error('Error fetching time:', error);
    });
}
function timezonecontinue()
{
  const currentUTCTime = Date.now();
  const timezoneTime = new Date(currentUTCTime + (offset * 1000));
  document.getElementById('timezonetime').innerHTML=timezoneTime.toISOString().substring(11,19)+":"+timezoneTime.toISOString().substring(20,22);
}
document.addEventListener('DOMContentLoaded', function() {
  const timezoneSelect = document.getElementById('timezoneselect');
  

  getAllTimezones().then(timezones => {
    if (timezones != null) {
      timezones.forEach(timezone => {
        const option = document.createElement('option');
        option.value = timezone;
        option.textContent = timezone;
        timezoneSelect.appendChild(option);
      });
    }
  });

   timezoneSelect.addEventListener('click', function() {
    const selectedTimezone = timezoneSelect.value;
    getTimefromTimezone(selectedTimezone);
    intervalId = setInterval(timezonecontinue, 10);
    });
  });

