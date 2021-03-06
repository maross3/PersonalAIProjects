import { getObjectsByPrototype, getRange, findClosestByPath, findClosestByRange, getCpuTime } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source, ConstructionSite, StructureTower } from '/game/prototypes';
import { RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE, ATTACK, TOUGH, HEAL, RANGED_ATTACK } from '/game/constants';
import { searchPath } from 'game/path-finder';
import { Visual } from '/game/visual';

import { timeStart, timeSplit, timeReset } from '../debug'


export class Squad {

  static currentRoles;
  static unfilledRoles;
  static fullSquad;

  static hasBeenActivated;

  static debugColor;
  static debug;

  constructor(roles){
    this.currentRoles = [];
    this.unfilledRoles = roles;
    this.hasBeenActivated = false;

    this.debug = false;
  }


  act(){
    timeReset("\nSquad: started act()");
    if(this.currentRoles.length){
      this.currentRoles.forEach((role, i)=>{
        if(role.creep){
          timeReset("Squad: currentRoles.forEach");
          role.tree.run();
          timeReset("Squad: role.tree.run();");
        }else{
          this.roleDied(i);
          timeReset("Squad: this.roleDied(i);");
        }
      });

      if(this.debug){
        this.squadDebugLines();
        this.debugSquad();
      }
    }
    timeReset("\nSquad: finsished act()");
  }


  get isFull(){
    return this.unfilledRoles.length == 0;
  }


  get center(){
    var tempY = 0, tempX = 0;
    this.currentRoles?.forEach((role, i) => {
      tempX += role.creep.x;
      tempY += role.creep.y;
    });
    tempX = Math.ceil(tempX/this.currentRoles.length);
    tempY = Math.ceil(tempY/this.currentRoles.length);
    return {x:tempX, y:tempY};
  }


  fillSquadRole(index, creep){
    this.unfilledRoles[index].fillRole(creep);
    this.currentRoles.push(this.unfilledRoles[index]);
    this.unfilledRoles.splice(index, 1);
  }

  roleDied(index){
    this.currentRoles[index].died();
    this.unfilledRoles.push(this.currentRoles[index]);
    this.currentRoles.splice(index, 1);
  }

  closestCreepToSquad(creepArray){
    return findClosestByPath(this.center, creepArray);
  }

  // indexes is optional
  indexOfClosestCreepToSquad(creepArray, indexes)
  {
    var lowestCost = 1111, closestCreep = -1;
    // Run just the indexes that are in "indexes" to fillter out creeps
    if(indexes !== undefined) {
      indexes.forEach((creepIndex) =>{
        var cost = searchPath(this.center, creepArray[creepIndex]).cost;
        if (lowestCost > cost){
          lowestCost = cost;
          closestCreep = creepIndex;
        }});
    }else{
      // This runs through all of the creepArray
      creepArray.forEach((creep, creepIndex) =>{
        var cost = searchPath(this.center, creep).cost;
        if (lowestCost > cost){
          lowestCost = cost;
          closestCreep = creepIndex;
        }});
    }
    return closestCreep;
  }

  // Could send a code for each option. Like if it added a creep but still not full.
  // Removes the creep from the array when it is assigned
  //// TODO: Allready full: -1. Did not fill any: 0. Filled some but not all: X. Is now full: ?.
  fillSquad(creepPool){
    if(this.isFull) return true;
    this.unfilledRoles.forEach((openRole, roleIndex) =>{
      var matchIndexes = openRole.indexesOfCreepsMatchingRoleBody(creepPool);

      if(matchIndexes.length > 0){
        var closestMatch = this.indexOfClosestCreepToSquad(creepPool, matchIndexes);

        if(closestMatch != -1){
          this.fillSquadRole(roleIndex, creepPool[closestMatch]);
          creepPool.splice(closestMatch, 1);
        }
      }
    });
    return this.isFull;
  }

  //// TODO: If just one creep put circkle aroud it.
  squadDebugLines(){
    if(!this.debugColor) this.debugColor = this.randomHex();
    var center = this.center;
    this.currentRoles.forEach((roles, i)=>{
      new Visual().line(roles.creep, center, {color: this.debugColor});
    });
  }
  randomHex(){
    return '#'+Math.floor(Math.random()*16777215).toString(16);
  }

  debugSquad()
  {
    var str =
    `
    ++++++++++ debugSquad +++++++++++++
    currentRoles: ${this.currentRoles}
    unfilledRoles: ${this.unfilledRoles}
    fullSquad: ${this.fullSquad}
    +++++++++++++++++++++++++++++++++++`
    console.log(str);
    return str;
  }

}
