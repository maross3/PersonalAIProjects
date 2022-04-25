import { getObjectsByPrototype, createConstructionSite } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source, ConstructionSite } from '/game/prototypes';
import {RESOURCE_ENERGY, ERR_NOT_IN_RANGE } from '/game/constants';
import { } from '/arena';


// Creep role specific tasks
var constSite;

export function harvestFromSource(creep, source){
  if(!creep.store.getFreeCapacity(RESOURCE_ENERGY))
    return false;

  if(creep.harvest(source) == ERR_NOT_IN_RANGE)
    creep.moveTo(source);

  return true;
}



// Converts an array of objects into an array of values corresponding to the specified key.
export function pluck(arr, key){
  return arr.map(i => i[key]);
}



export function debugRole()
{
  var str =
  `
  ---------- debugRole -------------
  Role of type: ${this.roleType}
  creep: ${this.creep}
  squad: ${this.squad}
  bodyMakeUp: ${this.bodyMakeUp}
  act: ${this.act.name}
  ideal: ${this.ideal.name}
  retreat: ${this.retreat.name}
  move: ${this.move.name}
  debug: ${this.debug.name}
  ----------------------------------`
  console.log(str);
  return str;
}
