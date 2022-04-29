import { getCpuTime } from '/game/utils';
// import { Creep, StructureSpawn, StructureContainer, Source } from '/game/prototypes';
// import {RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE, ATTACK } from '/game/constants';
import { getTicks, arenaInfo } from 'game';

import { BasicCommander } from './Commanders/BasicCommander'

//
//import {worker} from './Roles/engineerRoles'
//


var basicCommander = new BasicCommander();
//var heatmap = Array(100).fill( Array(100).fill(0) );

export function loop()
{
  // if(getTicks()%10 == 0){
  //   console.log("set array to: " + getTicks());
  //   heatmap = Array(100).fill( Array(100).fill(getTicks()));
  // }
  // if((getTicks()-1)%10 == 0){
  //   console.log("add them all together!");
  //   heatmap = new Array(100);
  //   for (var i = 0; i < heatmap.length; i++) {
  //     heatmap[i] = new Array(100).fill().map(() => Math.floor(10 * Math.random()));
  //   }
  //   var sum = 0;
  //   heatmap.forEach((row, y) => {
  //     row.forEach((point, x) => {
  //       sum = sum + point;
  //     });
  //   });
  //   console.log("the sum of all is = " + sum);
  // }



  basicCommander.run();
  console.log(`CpuTime: ${getCpuTime()}`);
  console.log(`CpuTime Left: ${arenaInfo.cpuTimeLimit-getCpuTime()}`); //debug

}
//==>  :)  <==//
