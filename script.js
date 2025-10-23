//const { session, app } = require("electron");

const bell = new Audio("./sounds/bell.wav");
const startBtn = document.querySelector(".btn-start");
const minsDiv = document.querySelector(".mins");
const secsDiv = document.querySelector(".secs");
const callout = document.querySelector(".callout");

//testing
//let totalSeconds = 1 * 60;
let totalSeconds = 25 * 60;
let myInterval;
//sessions has started or not is determined by below flag
let state = true;
let isRunning = false;
let isPaused = false;
let mode = "work"; //initial
let modes = ["work", "shortBreak", "longBreak"]; //other modes - work | shortB | longB
let pomosCompleted = 0;

const mainTimer = () => {
  let minsLeft = Math.floor(totalSeconds / 60);
  let secsLeft = totalSeconds % 60;
  minsDiv.textContent = minsLeft;
  secsDiv.textContent = secsLeft < 10 ? "0" + secsLeft : secsLeft;
};

const startTimer = () => {
  if (isRunning && !isPaused) {
    //this triggers pause feature
    clearInterval(myInterval);
    isPaused = true;
    startBtn.textContent = "Resume";
    return;
  }
  if (isPaused) {
    //this is for resuming after pause
    isPaused = false;
    startBtn.textContent = "Pause";
  }
  // this is for restarting
  isRunning = true;
  startBtn.textContent = "Pause";

  myInterval = setInterval(() => {
    totalSeconds--;
    mainTimer();
    if (totalSeconds <= 0) {
      clearInterval(myInterval);
      bell.play();
      isRunning = false;
      sessionEnd();
    }
  }, 1000);
};
//reset button also resets: pomosComp Count
const resetBtn = document.querySelector(".btn-reset");
resetBtn.addEventListener("click", () => {
  clearInterval(myInterval);
  isRunning = false;
  isPaused = false;
  mode = modes[0];
  totalSeconds = 25 * 60;
  startBtn.textContent = "Start";
  mainTimer();

  //Reset Pomo counter
  pomosCompleted = 0;
  savePomos();
  callout.textContent = `Pomodoros Completed: ${pomosCompleted}`;

  document.querySelector("h1").textContent = "Pomodoro";
});

const sessionEnd = () => {
  if (mode === modes[0]) {
    pomosCompleted++;
    savePomos();
    callout.textContent = `Pomodoros Completed: ${pomosCompleted}`;

    //trigger for longBreak == 4 completed pomos
    if (pomosCompleted % 4 === 0) {
      mode = modes[2];
      totalSeconds = 15 * 60;
      document.querySelector("h1").textContent = `mega brekkkk!!`;
    } else {
      mode = modes[1];
      totalSeconds = 5 * 60;
      document.querySelector("h1").textContent = `brek!`;
    }
  } else {
    mode = modes[0];
    //testing if it works
    //totalSeconds = 1 * 60;
    totalSeconds = 25 * 60;
    document.querySelector("h1").textContent = `Kaam krle bhai`;
  }

  mainTimer();
  startBtn.textContent = "Start";
  isRunning = false;
  isPaused = false;
};

//Save Pomodcount in localStorage
const savePomos = () => {
  localStorage.setItem("pomosCompleted", pomosCompleted);
};

//Load saved Pomodo
const savedPomos = localStorage.getItem("pomosCompleted");
if (savedPomos !== null) {
  pomosCompleted = Number(savedPomos);
} else {
  pomosCompleted = 0;
}

//update callout at page load
callout.textContent = `Pomodoros Completed: ${pomosCompleted}`;

mainTimer();
startBtn.addEventListener("click", startTimer);
