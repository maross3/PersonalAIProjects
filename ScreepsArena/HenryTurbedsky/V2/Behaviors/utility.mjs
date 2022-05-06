import { getObjectsByPrototype, getRange, findClosestByPath, findClosestByRange } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source } from '/game/prototypes';
import { searchPath } from 'game/path-finder';
import { RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE, ATTACK, TOUGH, HEAL, RANGED_ATTACK } from '/game/constants';
import { getTicks } from 'game'
import { Visual } from '/game/visual';


// Possible values: "continue", "bookMark", "done",


export function empty(){
  //console.log("empty");
  return "continue";
}

export function creepAlive(){
  //console.log("creepAlive");
  //console.log(this.board.creep);
  //if(this.board.creep) return "done";

  return "continue";
}
