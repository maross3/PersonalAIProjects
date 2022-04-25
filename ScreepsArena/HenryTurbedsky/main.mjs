import { getObjectsByPrototype, getCpuTime } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source } from '/game/prototypes';
import {RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE, ATTACK } from '/game/constants';

//import { BasicSquad } from './BasicSquad'
import { BasicCommander } from './Commanders/BasicCommander'

// var creep;
// var spawn;
var basicCommander = new BasicCommander();

export function loop()
{
  basicCommander.run();
  console.log(`CpuTime: ${getCpuTime()}`); //debug

  // var test = {
  //   f: null,
  // }
  //
  // test.f = ()=>{console.log("Hello World");}
  //
  // test.f();
  // var obj = new BasicSquad();
  // obj.unfilledRoles[0].debug();
  //
  // if(!spawn) spawn = getObjectsByPrototype(StructureSpawn)[0];
  // if(!creep) creep = spawn.spawnCreep(obj.unfilledRoles[0].bodyMakeUp).object;
  // console.log(creep);
}
