import { getObjectsByPrototype, getCpuTime } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source } from '/game/prototypes';
import {RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE, ATTACK } from '/game/constants';

import { BasicSquad } from './BasicSquad'
import { BasicCommander } from './BasicCommander'

var creep;
var spawn;
var c = new BasicCommander();


export function loop()
{
  c.run();


  // var obj = new BasicSquad();
  // obj.unfilledRoles[0].debug();
  //
  // if(!spawn) spawn = getObjectsByPrototype(StructureSpawn)[0];
  // if(!creep) creep = spawn.spawnCreep(obj.unfilledRoles[0].bodyMakeUp).object;
  // console.log(creep);


}
