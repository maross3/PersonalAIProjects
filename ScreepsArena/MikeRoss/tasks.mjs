import { getObjectsByPrototype, createConstructionSite } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source, ConstructionSite } from '/game/prototypes';
import {RESOURCE_ENERGY, ERR_NOT_IN_RANGE } from '/game/constants';
import { } from '/arena';

import { ALIVE, baseSquad } from './barracks'

// Creep role specific tasks
var constSite;

export function harvestFromSource(creep, source){
  if(!creep.store.getFreeCapacity(RESOURCE_ENERGY)) return;
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


export function spawnSquad(sqd, spawner){


  var creepToSpawn = sqd.queuedUnits[sqd.numberOfUnits];

  // calculate body parts energy to spawner curEnergy condition
  var creepMakeUp = getBodyParts(creepToSpawn.body, creepToSpawn.ratio, 5)
  var spawnedCreep = spawner.spawnCreep(creepMakeUp).object;

  if(spawnedCreep){
    creepToSpawn.creep = spawnedCreep;
    creepToSpawn.status = ALIVE;

    sqd.units[baseSquad.numberOfUnits] = sqd.queuedUnits[sqd.numberOfUnits];
    sqd.numberOfUnits += 1;
    // empty variable for curEnergy spawn condition
  }
}

// ========================================
//        *****SquadHelpers*****
// ========================================
export function getBodyParts(body, ratio, total){
  var temp = [];
  for(let i = 0; i < body.length; i++){
    for(let j =0; j < ratio[i] * total; j++)
      temp.push(body[i]);
  }
  return temp;
}

export function defaultSquadRole() {
  this.units.forEach((unit, i) => {
    unit.act()
  });
}
