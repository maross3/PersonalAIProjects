import { getCpuTime } from '/game/utils';


var ticksBefore = 0;

export function timeStart(){
  ticksBefore = getCpuTime();
}
export function timeSplit(words){
  console.log(words+": "+(getCpuTime()-ticksBefore));
}
export function timeReset(words){
  ticksBefore = getCpuTime();
  console.log(words+": "+(getCpuTime()-ticksBefore));
}

// timeStart();
// timeReset("start of loop");
// import { timeStart, timeSplit, timeReset } from '../debug'
