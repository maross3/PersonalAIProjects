import { getObjectsByPrototype, createConstructionSite, getCpuTime, findClosestByRange } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source, ConstructionSite } from '/game/prototypes';
import {RESOURCE_ENERGY, ERR_NOT_IN_RANGE, ERR_INVALID_TARGET, WORK, CARRY, MOVE, ATTACK } from '/game/constants';
import { } from '/arena';
import {QUEUED, ALIVE, RUNNING, SUCCESS, FAILURE, COMBAT } from './global'

var constSite;

// ========================================
//       *****CreepFunctions*****
// ========================================
export function buildStructureAt(creep, structure, x, y){
  if(!constSite) {
    createConstructionSite(x, y, structure);
    constSite = getObjectsByPrototype(ConstructionSite)[0];
  }
  if(!constSite) return;

  if(creep.build(constSite) == ERR_NOT_IN_RANGE) creep.moveTo(constSite);
  if(constSite.progressTotal == 0) constSite = null;
}

export function depositToSpawner(creep, spawner){
  if(creep.store.getFreeCapacity(RESOURCE_ENERGY)) return;
  if(creep.transfer(spawner, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(spawner);
}

export function harvestFromSource(creep, source){
  if(!creep.getFreeCapacity(RESOURCE_ENERGY)) return;
  if(creep.harvest(source) == ERR_NOT_IN_RANGE) creep.moveTo(source);

}

export function withdrawFromSource(creep, source){
  if(!creep.store.getFreeCapacity(RESOURCE_ENERGY)) return RUNNING;
  // check why this breaks with return here

  if(typeof source == "undefined") source = findClosestByRange(creep, getObjectsByPrototype(StructureContainer));
  else if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(source, {reusePath: 50})
  else console.log("Mine!")

}

export function fillSpawn(){
    if(!this.spawner) this.spawner = getObjectsByPrototype(StructureSpawn)[0];
    if(!this.energySource) this.energySource = getObjectsByPrototype(StructureContainer)[0];


    if(this.creep.store.getFreeCapacity(RESOURCE_ENERGY)) withdrawFromSource(this.creep, this.energySource); // makesure this.creep is calling on individual creeps
    else if(this.creep.transfer(this.spawner, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) this.creep.moveTo(this.spawner);
    return RUNNING;
}

export function waitForTicks(unit, ticks){
  if(!this.unitTicks) unitTicks = 0;

  if(unitTicks == ticks){
    unitTicks = 0;
    return true;
  }
  return false;
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
