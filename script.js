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
let timer = {
  pomodor: 25,
  shortBreak: 5,
  longBreak: 15,
  longBreakInterval: 4,
};
