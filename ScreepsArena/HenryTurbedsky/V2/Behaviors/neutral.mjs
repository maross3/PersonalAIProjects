import { getObjectsByPrototype, getRange, findClosestByPath, findClosestByRange, getCpuTime } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source } from '/game/prototypes';
import { searchPath } from 'game/path-finder';
import { RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE, ATTACK, TOUGH, HEAL, RANGED_ATTACK } from '/game/constants';
import { getTicks } from 'game'
import { Visual } from '/game/visual';
import { timeStart, timeSplit, timeReset } from '../debug'
// Possible values: "continue", "bookMark", "done",



export function gather(){
  //console.log("gather");
  timeReset("gather(): start of gather()");
  if(!this.board.energyTarget)
    this.board.energyTarget = getObjectsByPrototype(Source)[0];
  timeReset("gather(): !this.board.energyTarget");

  var source = this.board.energyTarget;
  var creep = this.board.creep;
  timeReset("gather(): setup Vars");

  if(creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0){
    timeReset("gather(): creep is full");
    return "done";
  }
  timeReset("gather(): creep needs more");

  if(creep.harvest(source) == ERR_NOT_IN_RANGE){
    timeReset("gather(): source is to far");
    creep.moveTo(source)
    timeReset("gather(): creep.moveTo(source)");
  }
  timeReset("gather(): creep.harvest(source)");

  timeReset("gather(): bookMark, not done gathering");
  return "bookMark";
}

export function refill(){
  //console.log("refill");
  if(!this.board.refillTarget)
    this.board.refillTarget = getObjectsByPrototype(StructureSpawn)[0];
  var refill = this.board.refillTarget;
  var creep = this.board.creep;

  if(creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0)
    return "done";

  if(creep.transfer(refill, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
  {
    creep.moveTo(refill);
  }else{
    return "continue";
  }
}
