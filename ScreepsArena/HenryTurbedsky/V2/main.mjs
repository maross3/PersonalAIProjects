import { getCpuTime } from '/game/utils';
import { getTicks, arenaInfo } from 'game';

import { Commander } from './Commanders/Commander'
//import { BehaviorTree } from './BehaviorTree/BehaviorTree'


var commander = new Commander();
//var tree = new BehaviorTree([1,0,2,3,4,0,5,6,0,0,7,8,0,0,0,0,9]);

export function loop()
{
  //tree.display();

  commander.run();

  console.log(`CpuTime: ${getCpuTime()}`);
  console.log(`CpuTime Left: ${arenaInfo.cpuTimeLimit-getCpuTime()}`);
}
