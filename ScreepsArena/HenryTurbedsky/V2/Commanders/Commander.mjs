import { getObjectsByPrototype, getRange, findClosestByPath, findClosestByRange, getCpuTime } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source, ConstructionSite } from '/game/prototypes';
import { RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE } from '/game/constants';
import { searchPath } from 'game/path-finder';
import { getTicks } from 'game';
import { } from '/arena';


import { TestSquad } from '../Squads/testSquad'

var squad = new TestSquad(); /////////////////////////////

export class Commander {

  static squadList;
  static creepPool;

  static squadFillQueue;

  static spawnLocations;

  static infoScores = {};

  static debugCode;
  static debug;

  constructor(){
    this.squadList = [];
    this.creepPool = [];

    this.squadFillQueue = [];

    this.spawnLocations = [{ spawner: null, bodyQueue: [] }];

    this.infoScores = {
      heatmap: null,
      offensive: null,
      defensive: null,
    };

    this.debugCode = this.debugCommander;
    this.debug = false;
  }



  run()
  {
    var ticksBefore = getCpuTime();

    if(!this.spawnLocations[0].spawner)
      this.spawnLocations[0].spawner = getObjectsByPrototype(StructureSpawn).find(s => s.my);

    if(getTicks() == 1){
      this.requestCreepsForSquad(squad, this.spawnLocations[0]);
    }
    console.log(`start of commander run() CpuTime: ${getCpuTime() - ticksBefore}`);


    ticksBefore = getCpuTime();
    this.runCreepSpawningQueues();
    console.log(`runCreepSpawningQueues CpuTime: ${getCpuTime() - ticksBefore}`);

    ticksBefore = getCpuTime();
    this.enrollCreepsToSquadsInFillQueue();
    console.log(`enrollCreepsToSquadsInFillQueue CpuTime: ${getCpuTime() - ticksBefore}`);

    console.log("\nvvvvvvvvvv squad.act(); vvvvvvvvv\n");
    ticksBefore = getCpuTime();
    if(this.squadList.length){
      this.squadList.forEach((squad, i)=>{
        squad.act();
      });
    }
    console.log("\n^^^^^^^^^^ squad.act(); ^^^^^^^^^^^^^");
    console.log(`from commander run all squads CpuTime: ${getCpuTime() - ticksBefore}`);


    if(this.debug){
      this.debugCode();
    }
  }




  runCreepSpawningQueues(){
    this.spawnLocations.forEach((spawn, i) => {
    var newCreep = this.runSpawner(spawn);
    if(newCreep) this.creepPool.push(newCreep);
  });}

  requestCreepsForSquad(squad, spawn){
    squad.unfilledRoles.forEach((role, i) =>{
      this.queueRoleToArray(role, spawn);
    });
    this.squadFillQueue.push(squad);
  }
  queueRoleToArray(role, spawn){
    this.queueBodyToArray(role.bodyMakeUp, spawn);
  }
  queueBodyToArray(body, spawn){
    if(spawn !== undefined) spawn = this.spawnLocations[0];
    spawn.bodyQueue.push(body);
  }

  runSpawner(location)
  {
    if(location.bodyQueue.length == 0) return false;
    var newCreep = location.spawner.spawnCreep(location.bodyQueue[0]).object;
    if(newCreep) location.bodyQueue.shift();
    return newCreep;
  }

  // Removes full squads from squadFillQueue and adds hasBeenActivated squadList
  enrollCreepsToSquadsInFillQueue(){
    if (this.squadFillQueue.length == 0 || this.creepPool.length == 0) return false;
    console.log("is running enrollCreepsToSquadsInFillQueue");
    this.squadFillQueue.forEach((squad, i)=>{
      if(squad.fillSquad(this.creepPool)){
        this.squadFillQueue.splice(i,1);
      }
      if(squad.currentRoles.length > 0 && squad.hasBeenActivated == false){
        squad.hasBeenActivated = true;
        this.squadList.push(squad);
      }
    });
  }


  debugCommander()
  {
    var str =
      `
      ||||||||| debugCommander ||||||||||
      Commander of type: Not Set Up!!
      ||||||||||||||||||||||||||||||||||||`
    console.log(str);
    return str;
  }

}
