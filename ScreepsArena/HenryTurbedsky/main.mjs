import { getCpuTime } from '/game/utils';
// import { Creep, StructureSpawn, StructureContainer, Source } from '/game/prototypes';
// import {RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE, ATTACK } from '/game/constants';
// import { getTicks } from 'game';

import { BasicCommander } from './Commanders/BasicCommander'

//
//import {worker} from './Roles/engineerRoles'
//


var basicCommander = new BasicCommander();

export function loop()
{

  basicCommander.run();
  console.log(`CpuTime: ${getCpuTime()}`); //debug

}
//==>  :)  <==//
