import { getObjectsByPrototype, createConstructionSite, findClosestByPath } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source, ConstructionSite } from '/game/prototypes';
import {RESOURCE_ENERGY, ERR_NOT_IN_RANGE } from '/game/constants';
import { searchPath } from 'game/path-finder';
import { } from '/arena';

import * as Tools from './tools'
import * as RoleTools from './roleTools'



export function observeIfFullSquad(squad){
  if(squad.unfilledRoles.length == 0){
    squad.fullSquad = true;
    return true;
  }
  else{
    return false;
  }
}

export function squadCenter(squad)
{
  var tempX = 0;
  var tempY = 0;
  squad.currentRoles?.forEach((role, i) => {
    tempX += role.creep.x;
    tempY += role.creep.y;
  });
  // tempX = Math.ceil(tempX/squad.currentRoles.length);
  // tempY = Math.ceil(tempY/squad.currentRoles.length);
  tempX = tempX/squad.currentRoles.length;
  tempY = tempY/squad.currentRoles.length;
  return {x:tempX, y:tempY};
}

export function fillSquadRole(squad, index, creep)
{
  squad.unfilledRoles[index].creep = creep;
  squad.currentRoles.push(squad.unfilledRoles[index]);
  squad.unfilledRoles.splice(index, 1);
}

export function closestCreepToSquad(squad, creepArray)
{
  return findClosestByPath(squadCenter(squad), creepArray);
}



// arrayOfCreepIndexes is optional
export function indexOfClosestCreepToSquad( squad, creepArray, arrayOfCreepIndexes = "unsupplied")
{
  var lowestCost = 1111;
  var indexOfClosestCreep;

  // Run just the indexes that are in arrayOfCreepIndexes to fillter out creeps
  if(typeof arrayOfCreepIndexes !== "unsupplied") {
    arrayOfCreepIndexes.forEach((creepIndex) =>{
      var pathObj = searchPath(squadCenter(squad), creepArray[creepIndex]);
      if (lowestCost > pathObj.cost){
        lowestCost = pathObj.cost;
        indexOfClosestCreep = creepIndex;
      }});
  }else{
    // This runs through all of the creepArray
    creepArray.forEach((creep, creepIndex) =>{
      var pathObj = searchPath(squadCenter(squad), creep);
      if (lowestCost > pathObj.cost){
        lowestCost = pathObj.cost;
        indexOfClosestCreep = creepIndex;
      }});
  }

  if(typeof indexOfClosestCreep === 'undefined')
    return -1;
  return indexOfClosestCreep;
}


// Could send a code for each option. Like if it added a creep but still not full.
// Removes the creep from the array when it is assigned
export function fillSquad(squad, creepArray){
  if(this.observeIfFullSquad(squad)) return true;

  squad.unfilledRoles.forEach((openRole, roleIndex) =>{
    var matchIndexes = RoleTools.indexesOfCreepsMatchingRoleBody(openRole, creepArray);

    if(matchIndexes.length > 0){
      var closestMatch = this.indexOfClosestCreepToSquad( squad, creepArray, matchIndexes);

      if(closestMatch != -1){
        this.fillSquadRole(squad, roleIndex, creepArray[closestMatch]);
        creepArray.splice(closestMatch, 1);
      }
    }
  });

  return this.observeIfFullSquad(squad);
}
