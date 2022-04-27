import { getObjectsByPrototype, getRange, findClosestByPath, findClosestByRange } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source, ConstructionSite } from '/game/prototypes';
import {RESOURCE_ENERGY, ERR_NOT_IN_RANGE } from '/game/constants';
import { searchPath } from 'game/path-finder';
import { Visual } from '/game/visual';
import { } from '/arena';

import * as Tools from './tools'
import * as RoleTools from './roleTools'
import * as SquadTools from './squadTools'










export function queueSquadToArray(squad, bodyQueue){
  squad.unfilledRoles?.forEach((role, i) =>{
    this.queueRoleToArray(role, bodyQueue);
  });
}
export function queueRoleToArray(role, bodyQueue){
  this.queueBodyToArray(role.bodyMakeUp, bodyQueue);
}
export function queueBodyToArray(body, bodyQueue){
  bodyQueue.push(body);
}


export function spawnFirstInQueue(spawner, bodyQueue)
{
  if(bodyQueue.length == 0) return false;
  var newCreep = spawner.spawnCreep(bodyQueue[0]).object;
  if(newCreep) bodyQueue.shift();
  return newCreep;
}


// Removes full squads from squadArray and returns an array newly actived squads.
export function enrollCreepsToSquadsInArray(squadArray, creepArray){
  var activatedSquads = [];
  if (squadArray.length <= 0) return activatedSquads;

  squadArray.forEach((squad, i)=>{
    if(squad.currentRoles.length == 0){squad.active = false;}

    if(SquadTools.fillSquad(squad, creepArray)){
      squadArray.splice(i,1);
    }

    if(squad.currentRoles.length > 0 && squad.active == false){
      squad.active = true;
      activatedSquads.push(squad);
    }
  });

  return activatedSquads;
}




export function debugCommander()
{
  var str =
    `
    ||||||||| debugCommander ||||||||||
    Commander of type: ${this.commanderType}
    spawnQueues: ${JSON.stringify(this.spawnQueues, null, 1)}
    squadList: ${JSON.stringify(this.squadList, null, 1)}
    squadQueue: ${JSON.stringify(this.squadQueue, null, 1)}
    creepPool: ${JSON.stringify(this.creepPool, null, 1)}
    ||||||||||||||||||||||||||||||||||||`
  console.log(str);
  return str;
}
