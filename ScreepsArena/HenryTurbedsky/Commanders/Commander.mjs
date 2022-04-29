import { getObjectsByPrototype, getRange, findClosestByPath, findClosestByRange } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source, ConstructionSite } from '/game/prototypes';
import { RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE } from '/game/constants';
import { searchPath } from 'game/path-finder';
import { getTicks } from 'game';
import { } from '/arena';

import * as Tools from '../Tools/tools'
import * as RoleTools from '../Tools/roleTools'

import { Squad } from '../Squads/Squad'


export class BasicCommander {

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

    this.debugCode = CTools.debugCommander;
    this.debug = false;
  }




  run()
  {
    if(!this.spawnLocations[0].spawner) this.spawnLocations[0].spawner = getObjectsByPrototype(StructureSpawn).find(s => s.my);
    var squad = new Squad();

    squadSheild.setTarget({x:35, y:35});

    if(getTicks() == 1){
      this.requestCreepsForSquad(squad, this.spawnLocations[0]);
    }

    this.runCreepSpawningQueues();

    this.squadList = this.squadList.concat(this.enrollCreepsToSquadsInFillQueue());


    if(this.squadList.length > 0){
      this.squadList.forEach((squad, i)=>{
        squad.act();
      });
    }

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

  // Removes full squads from squadArray and returns an array newly actived squads.
  enrollCreepsToSquadsInFillQueue(){
    if (this.squadFillQueue.length <= 0) return false;

    this.squadFillQueue.forEach((squad, i)=>{
      if(squad.fillSquad(this.creepPool)){
        this.squadFillQueue.splice(i,1);
      }
      if(squad.currentRoles.length > 0 && squad.hasBeenActivated == false){
        squad.hasBeenActivated = true;
        this.squadList.push(squad);
      }
    });

    return activatedSquads;
  }
//// TODO: check if squad class works. But first need a commander that doesnt use squad Tools.
//// enrollCreepsToSquadsInFillQueue can still be better.



}
