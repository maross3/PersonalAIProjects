import { getObjectsByPrototype, getRange, findClosestByPath, findClosestByRange } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source } from '/game/prototypes';
import { searchPath } from 'game/path-finder';
import { RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE, ATTACK, TOUGH, HEAL, RANGED_ATTACK } from '/game/constants';
import { getTicks } from 'game'
import { Visual } from '/game/visual';



export function move(target){
  this.creep.moveTo(target);
}

export function moveCircle(){
  if(!this.circleDirection || this.circleDirection > 8) this.circleDirection = 1;
  this.creep.move(this.circleDirection);
  if(this.creep.fatigue == 0) this.circleDirection++;
}

export function mineAndFill()
{
  if(!this.spawner) this.spawner = getObjectsByPrototype(StructureSpawn)[0];
  if(!this.energySource) this.energySource = getObjectsByPrototype(Source)[0];

  if(this.creep.store.getFreeCapacity(RESOURCE_ENERGY)) harvestFromSource(this.creep, this.energySource); // makesure this.creep is calling on individual creeps
  else if(this.creep.transfer(this.spawner, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) this.creep.moveTo(this.spawner);
};
export function harvestFromSource(creep, source){
  if(!creep.store.getFreeCapacity(RESOURCE_ENERGY))
    return false;
  if(creep.harvest(source) == ERR_NOT_IN_RANGE)
    creep.moveTo(source);
  return true;
}
