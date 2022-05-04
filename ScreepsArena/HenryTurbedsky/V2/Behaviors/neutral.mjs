import { getObjectsByPrototype, getRange, findClosestByPath, findClosestByRange } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source } from '/game/prototypes';
import { searchPath } from 'game/path-finder';
import { RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE, ATTACK, TOUGH, HEAL, RANGED_ATTACK } from '/game/constants';
import { getTicks } from 'game'
import { Visual } from '/game/visual';
// Possible values: "continue", "bookMark", "done",



export function gather(){
  console.log("gather");

  if(!this.tree.board.energyTarget)
    this.tree.board.energyTarget = getObjectsByPrototype(Source)[0];
  var source = this.tree.board.energyTarget;
  var creep = this.tree.owner.creep;

  if(creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0)
    return "done";

  if(creep.harvest(source) == ERR_NOT_IN_RANGE)
    creep.moveTo(source);

  return "bookMark";
}

export function refill(){
  console.log("refill");

  if(!this.tree.board.refillTarget)
    this.tree.board.refillTarget = getObjectsByPrototype(StructureSpawn)[0];
  var refill = this.tree.board.refillTarget;

  if(this.tree.owner.creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0)
    return "done";

  if(this.tree.owner.creep.transfer(refill, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
  {
    this.tree.owner.creep.moveTo(refill);
  }else{
    return "continue";
  }
}
