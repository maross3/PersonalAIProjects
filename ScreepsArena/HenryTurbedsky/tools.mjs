import { getObjectsByPrototype, createConstructionSite } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source, ConstructionSite } from '/game/prototypes';
import {RESOURCE_ENERGY, ERR_NOT_IN_RANGE } from '/game/constants';
import { searchPath } from 'game/path-finder';
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


export function arraysMatch(array1, array2){
  if(array1.length != array2.length)
    return false;

  var array1Sorted = array1.sort();
  var array2Sorted = array2.sort()

  array1Sorted.forEach((item, i) =>{
    if(item != array2Sorted[i])
      return false;
  });
  return true;
}


// Converts an array of objects into an array of values corresponding to the specified key.
export function pluck(arr, key){
  return arr.map(i => i[key]);
}
export function getCreepBody(creep){
  this.pluck(creep.body, "type");
}
