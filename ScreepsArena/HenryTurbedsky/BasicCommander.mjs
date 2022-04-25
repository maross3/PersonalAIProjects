import { getObjectsByPrototype, getRange, findClosestByPath } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source } from '/game/prototypes';
import { RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE } from '/game/constants';
import { } from '/arena';
import * as Tools from './tools'
import * as SquadTools from './squadTools'
import { searchPath } from 'game/path-finder';

import { BasicSquad } from './BasicSquad'


export class BasicCommander {

  static currentState;

  // unassigned creep
  static creepBuffer;
  // body info, yet to be creep
  static bodyQueue;
  // list of squads
  static squadList;
  // list of squads that want to be filled
  static squadQueue;


  constructor(){
    this.currentState = null;
    // unassigned creep
    this.creepBuffer = [];
    // body info, yet to be creep
    this.bodyQueue = [];
    // list of squads
    this.squadList = [];
    // list of squads that want to be filled
    this.squadQueue = [];
  }


  run()
  {

    var spawn = getObjectsByPrototype(StructureSpawn).find(s => s.my);
    var squad = new BasicSquad();

    if(this.squadQueue.length < 3)
    {
      this.queueSquadRoles(squad);
      this.squadQueue.push(squad);

    }

    if(this.squadQueue.length != 0){
      this.spawnBodyQueue(spawn);
    }


    if (this.squadQueue.length > 0){
      this.squadQueue.forEach((squad, i)=>{
        this.fillSquad(squad);
      });
    }

    console.log("this.squadQueue");
    console.log(this.squadQueue);
    console.log("this.squadList");
    console.log(this.squadList);

  }



  queueSquadRoles(squad){
    squad.unfilledRoles.forEach((role, i) =>{
      this.queueRole(role);
    });
  }

  queueRole(role){
    this.bodyQueue.push(role.bodyMakeUp);
  }


  fillSquad(squad)
  {
    squad.unfilledRoles.forEach((openRole, roleIndex) =>{
      var matchesIndexes = indexesOfCreepRoleBodyMatch(openRole, this.creepBuffer);

      if(matchesIndexes.length > 0)
      {
        var closestMatch = matchesIndexes[0];;

        if(squad.currentRoles.length > 0){
          var tempShortestRange = 1111;
          var smallIndex = -1;
          var closestObj;

          matchesIndexes.forEach((matchIndex) =>{
            var pathObj = searchPath(SquadTools.squadCenter(squad), this.creepBuffer[matchIndex]);
            if (tempShortestRange > pathObj.cost){
              tempShortestRange = pathObj.cost;
              smallIndex = matchesIndexes;
            }
          });

          closestMatch = matchIndex;
        }

        if(closestMatch){
          squad.fillRole(roleIndex, closestMatch.creep);
          this.creepBuffer.splice(closestMatch.index,1);
        }
      }

    });

    if(squad.unfilledRoles.length == 0){
      this.squadList.push(squad);
      this.squadQueue.shift();
      return true;
    }else{
      return false;
    }
  }







  indexesOfCreepRoleBodyMatch(openRole, creepArray)
  {
    var indexes = [];
    creepArray.forEach((creep, creepIndex) =>{

      if(typeof creep.id !== 'undefined'){
        var creepBody = Tools.pluck(creep.body, "type");

        if(openRole.bodyMakeUp.length == creepBody.length){
          var tempRoleBody = openRole.bodyMakeUp.sort();
          var creepBody = creepBody.sort()

          if(this.compareBodies(creepBody, tempRoleBody)){
            indexes.push(creepIndex);

          }
        }
      }
    });

    return indexes;
  }
  compareBodies(body1, body2){
    body1.forEach((word, i) =>{
      if(word != body2[i])
        return false;
    });
    return true;
  }



  indexOfClosestCreepToSquad( squad, creepArray, arrayOfCreepIndexes)
  {
    var lowestCost = 1111;
    var indexOfClosestCreep = -1;

    // Run just the indexes that are in arrayOfCreepIndexes to fillter out creeps
    if(typeof arrayOfCreepIndexes !== 'undefined') {
      arrayOfCreepIndexes.forEach((creepIndex) =>{
        var pathObj = searchPath(SquadTools.squadCenter(squad), creepArray[creepIndex]);
        if (tempShortestRange > pathObj.cost){
          tempShortestRange = pathObj.cost;
          indexOfClosestCreep = creepIndex;
        }
      });
    }else{
      // This runs through all of the creepArray
      creepArray.forEach((creep, creepIndex) =>{
        var pathObj = searchPath(SquadTools.squadCenter(squad), creep);
        if (tempShortestRange > pathObj.cost){
          tempShortestRange = pathObj.cost;
          indexOfClosestCreep = creepIndex;
        }
      });
    }

    return indexOfClosestCreep;
  }










  spawnBodyQueue(spawn)
  {
    if(this.spawnRole(spawn, this.bodyQueue[0]) ){
      this.bodyQueue.shift();
    }
  }

  spawnRole(spawn, body)
  {
    this.obj = spawn.spawnCreep(body).object;
    if(this.obj)
    {
      this.creepBuffer.push(this.obj);
      return true;
    }
    return false;
  }



}
