import { getObjectsByPrototype, createConstructionSite, getCpuTime } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source, ConstructionSite } from '/game/prototypes';
import {RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE, ATTACK } from '/game/constants';
import { } from '/arena';
import {QUEUED, ALIVE } from './global'
import { baseSquad } from './barracks'

var constSite;

// ========================================
//       *****CreepFunctions*****
// ========================================
export function BuildStructureAt(creep, structure, x, y){
  if(!constSite) {
    createConstructionSite(x, y, structure);
    constSite = getObjectsByPrototype(ConstructionSite)[0];
  }
  if(!constSite) return;

  if(creep.build(constSite) == ERR_NOT_IN_RANGE) creep.moveTo(constSite);
  if(constSite.progressTotal == 0) constSite = null;
}

export function harvestFromSource(creep, source){
  if(!creep.store.getFreeCapacity(RESOURCE_ENERGY)) return;
  if(creep.harvest(source) == ERR_NOT_IN_RANGE) creep.moveTo(source);
  //return 1;
}

// ========================================
//       *****SquadFunctions*****
// ========================================
export function findCenterOfUnits(units){
  var tempX = 0;
  var tempY = 0;
  units.forEach((role, i) => {
    tempX += role.creep.x;
    tempY += role.creep.y;
  });

  tempX = tempX/units.length;
  tempY = tempY/units.length;
  return {x:tempX, y:tempY};
}

export function getBodyParts(body, ratio, total){
  var temp = [];
  for(let i = 0; i < body.length; i++){
    for(let j =0; j < ratio[i] * total; j++)
      temp.push(body[i]);
  }
  return temp;
}

export function spawnSquad(sqd, spawner){
  var creepToSpawn = sqd.queuedUnits[sqd.numberOfUnits];

  // TODO:
  // calculate body parts energy to spawner curEnergy condition
  // if not enough energy, return
  var creepMakeUp = getBodyParts(creepToSpawn.body, creepToSpawn.ratio, 5)
  var spawnedCreep = spawner.spawnCreep(creepMakeUp).object;

  if(spawnedCreep){
    creepToSpawn.creep = spawnedCreep;
    creepToSpawn.status = ALIVE;

    sqd.units[sqd.numberOfUnits] = sqd.queuedUnits[sqd.numberOfUnits];
    sqd.numberOfUnits += 1;
  }
}
