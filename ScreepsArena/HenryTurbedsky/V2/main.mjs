import { getCpuTime } from '/game/utils';
import { arenaInfo } from 'game';

import { Commander } from './Commanders/Commander'
import { timeStart, timeSplit, timeReset } from './debug'


var commander = new Commander();

export function loop()
{

  commander.run();

  console.log("\n================     Full ONE LOOP    =============");
  console.log(`CpuTime: ${getCpuTime()}`);
  console.log(`CpuTime Left: ${arenaInfo.cpuTimeLimit-getCpuTime()}`);
  console.log("=====================================================");
}
