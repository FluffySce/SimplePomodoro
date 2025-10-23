//Simple timer to understand how timer works
// initially i will be using 25 mins we will make it dynamic later
/* 

let time = 70; //seconds == 25mins
const timer = setInterval(() => {
  const durationMins = Math.floor(time / 60);
  const durationSec = time % 60;
  console.log(`Time left: ${durationMins}:${durationSec}`);
  time--;
  if (time < 0) {
    clearInterval(timer);
    console.log("timer complete");
  }
}, 1000);

*/

//const { session, app } = require("electron");

const bell = new Audio("./sounds/bell.wav");
const startBtn = document.querySelector(".btn-start");
const timer = document.querySelector(".mins");
let myInterval;
//sessions has started or not is determined by below flag
let state = true;

const appTimer = () => {
  const sessionTime = Number.parseInt(timer.textContent);

  if (state) {
    state = false;
    let totalSeconds = sessionTime * 60;
    /* const updateSecs = () => {
            //pass
        } */
    myInterval = setInterval(() => {
      //updating seconds

      const minsDiv = document.querySelector(".mins");
      const secsDiv = document.querySelector(".secs");

      totalSeconds--;

      let minsLeft = Math.floor(totalSeconds / 60);
      let secsLeft = totalSeconds % 60;

      if (secsLeft < 10) {
        secsDiv.textContent = "0" + secsLeft;
      } else {
        secsDiv.textContent = secsLeft;
      }
      minsDiv.textContent = `${minsLeft}`;

      if (minsLeft === 0 && secsLeft === 0) {
        bell.play();
        clearInterval(myInterval);
      }
    }, 1000);
  } else {
    alert("Session has already started!");
  }
};

startBtn.addEventListener("click", appTimer);
