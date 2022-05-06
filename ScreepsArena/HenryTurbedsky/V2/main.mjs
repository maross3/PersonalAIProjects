import { getCpuTime } from '/game/utils';
import { arenaInfo } from 'game';
import { getTicks } from 'game'

import { Commander } from './Commanders/Commander'
import { timeStart, timeSplit, timeReset } from './debug'


var commander = new Commander();

export function loop()
{
  if(getTicks() != 1){
    timeStart();
  }else{
    timeReset("Main: files load. (I think).");
    timeStart();
  }

  timeReset("Main: started loop()");

  commander.run();

  console.log("\n================     Full ONE LOOP    =============");
  console.log(`CpuTime: ${getCpuTime()}`);
  console.log(`CpuTime Left: ${arenaInfo.cpuTimeLimit-getCpuTime()}`);
  console.log("=====================================================");
}
