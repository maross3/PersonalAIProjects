import { getObjectsByPrototype, getRange, findClosestByPath, findClosestByRange } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source, ConstructionSite } from '/game/prototypes';
import {RESOURCE_ENERGY, ERR_NOT_IN_RANGE } from '/game/constants';
import { searchPath } from 'game/path-finder';
import { } from '/arena';

import * as Tools from './tools'



export function indexesOfCreepsMatchingRoleBody(openRole, creepArray)
{
  var indexes = [];
  creepArray.forEach((creep, creepIndex) =>{
    if(typeof creep.id !== 'undefined'){
      if(!creep.bodyMakeUp) creep.bodyMakeUp = Tools.getCreepBody(creep);
      if(Tools.arraysMatch(creep.bodyMakeUp, openRole.bodyMakeUp))
        indexes.push(creepIndex);
    }
  });

  return indexes;
}





export function debugRole()
{
  var str =
  `
  ---------- debugRole -------------
  Role of type: ${this.roleType}
  creep: ${this.creep}
  squad: ${this.squad}
  bodyMakeUp: ${this.bodyMakeUp}
  act: ${this.act.name}
  ideal: ${this.ideal.name}
  retreat: ${this.retreat.name}
  move: ${this.move.name}
  debug: ${this.debug.name}
  ----------------------------------`
  console.log(str);
  return str;
}
