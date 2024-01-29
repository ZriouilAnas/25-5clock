import { useEffect, useState } from 'react'

import './App.css'


function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainingSeconds}`;
}

function App() {

  



  const [breaks, setBreak] = useState(5)
    const incrementCounter = () => {
        setBreak(breaks + 1);
      }; 
    const decrementCounter = () => {
        setBreak(breaks > 0 ? breaks - 1 : 0);
      }; 

  const [session, setSession] = useState(25)
    const incrementSession = () => {
      setSession( session < 60 ? session + 1 : 60);
      //setTimeLeft(session * 60)
      }; 
    const decrementSession = () => {
      setSession(session > 0 ? session - 1 : 0);
      
      }; 

   const [timeLeft, setTimeLeft] = useState(session * 60) 
   const [timerRunning, setTimerRunning] = useState(false) 
   const startStopTimer = () => {
    setTimerRunning((prevValue) => !prevValue);
    
  };
  const stopAudio = () => {
    const audio = document.getElementById('beep') as HTMLAudioElement
    audio.pause()
    audio.currentTime = 0;
  }


  const playAudio = () => {
    const audio = document.getElementById('beep') as HTMLAudioElement
    audio.play();
  };
   const resetTimer = () => {
    setTimerRunning(false);
    setSession(25);
    setBreak(5);
    setTimeLeft(session * 60);
    stopAudio();
  };
  useEffect(() => {
  let timerId: number | undefined;
    if (timerRunning === false) {
      setTimeLeft(session * 60)
    }
  if (timerRunning && timeLeft > 0) {
    // If the timer is running and time is left, set up an interval to decrement the timeLeft every second
    timerId = setInterval(() => {
      setTimeLeft((prevTimeLeft) =>  prevTimeLeft > 0 ? prevTimeLeft - 1 : 0);
    }, 1000);
  } else if (timerRunning && timeLeft === 0) {
    // If the timer is running and time is up, switch between break and session
    setTimerRunning(false);
    setTimeLeft(breaks * 60);
    playAudio()
  }

  // Cleanup function to clear the interval when the component unmounts or when the dependency array changes
  return () => clearInterval(timerId);
}, [timerRunning, timeLeft, breaks,session]);
  
  

  return (
    <>
    <div>
      <h1>25 + 5 Clock</h1>
      <div id='myClock'>
        <div className='break'>
        <div id="break-label">Break Length</div>
        <button id="break-decrement" onClick={decrementCounter}>decrement</button>
        <button id="break-increment" onClick={incrementCounter}>increment</button>
        <div id="break-length">{breaks}</div>
        </div>
        <div className="session">
           <div id="session-label">Session Length</div>
          <button id="session-decrement" onClick={decrementSession}>decrement</button>
          <button id="session-increment" onClick={incrementSession}>increment</button>
          <div id="session-length">{session}</div>
        </div>
        <div className='timer-container'>
          <div id="timer-label">timer :</div>
          <div id="time-left">{formatTime(timeLeft)}</div>
        </div>
        <div className='buttons'><button id="start_stop" onClick={startStopTimer}>Start stop</button>
        <button id="reset" onClick={resetTimer}>reset</button>
        </div>
      </div>
      <audio id="beep"  preload="auto" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
    
    
    
    </div>
     
    </>
  )
}

export default App
