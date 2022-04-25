import { getObjectsByPrototype, createConstructionSite } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source, ConstructionSite } from '/game/prototypes';
import {RESOURCE_ENERGY, ERR_NOT_IN_RANGE } from '/game/constants';
import { } from '/arena';


// Creep role specific tasks
var constSite;

export function harvestFromSource(creep, source){
  if(!creep.store.getFreeCapacity(RESOURCE_ENERGY))return;
  if(creep.harvest(source) == ERR_NOT_IN_RANGE) creep.moveTo(source);
  //return 1;
}

export function BuildStructureAt(creep, structure, x, y){

  if(!constSite) {
    createConstructionSite(x, y, structure);
    constSite = getObjectsByPrototype(ConstructionSite)[0];
  }
  if(!constSite) return;

  if(creep.build(constSite) == ERR_NOT_IN_RANGE) creep.moveTo(constSite);
  if(constSite.progressTotal == 0) constSite = null;

}

export function SpawnWithMakeUp(spawner, role){
  spawner.spawnCreep(role);
}


// Converts an array of objects into an array of values corresponding to the specified key.
export function Pluck(arr, key){
  return arr.map(i => i[key]);
}
