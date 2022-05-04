import { getObjectsByPrototype, getRange, findClosestByPath, findClosestByRange } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source } from '/game/prototypes';
import { searchPath } from 'game/path-finder';
import { RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE, ATTACK, TOUGH, HEAL, RANGED_ATTACK } from '/game/constants';
import { getTicks } from 'game'
import { Visual } from '/game/visual';


export function guardTarget(target){
  if(!target) target = this.target;
  var enememy = findClosestByRange(target, getObjectsByPrototype(Creep).filter(c => !c.my))
  if(this.creep.attack(enememy) == ERR_NOT_IN_RANGE) this.creep.moveTo(enememy);
}
