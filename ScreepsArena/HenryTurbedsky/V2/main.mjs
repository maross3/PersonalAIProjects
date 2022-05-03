import { getCpuTime } from '/game/utils';
import { getTicks, arenaInfo } from 'game';

import { Commander } from './Commanders/Commander'


var commander = new Commander();

export function loop()
{
  commander.run();

  console.log(`CpuTime: ${getCpuTime()}`);
  console.log(`CpuTime Left: ${arenaInfo.cpuTimeLimit-getCpuTime()}`);
}
