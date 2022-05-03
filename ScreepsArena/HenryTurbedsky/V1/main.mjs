import { getCpuTime } from '/game/utils';
import { getTicks, arenaInfo } from 'game';

import { BasicCommander } from './Commanders/BasicCommander'

var basicCommander = new BasicCommander();

export function loop()
{
  basicCommander.run();

  console.log(`CpuTime: ${getCpuTime()}`);
  console.log(`CpuTime Left: ${arenaInfo.cpuTimeLimit-getCpuTime()}`);
}
