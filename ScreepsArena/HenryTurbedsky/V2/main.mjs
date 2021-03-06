import { getCpuTime } from '/game/utils';
import { arenaInfo } from 'game';
import { getTicks } from 'game'

import { timeStart, timeSplit, timeReset } from './debug'


export function loop()
{
  timeReset("1");
  timeReset("2");
  timeReset("3");
  timeReset("4");

  console.log("\n================     Full ONE LOOP    =============");
  console.log(`CpuTime: ${getCpuTime()}`);
  console.log(`CpuTime Left: ${arenaInfo.cpuTimeLimit-getCpuTime()}`);
  console.log("=====================================================");
}
