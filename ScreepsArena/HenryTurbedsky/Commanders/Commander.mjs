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

  static spawns;

  static infoScores = {};

  static debugCode;
  static debug;

  constructor(){
    this.squadList = [];
    this.creepPool = [];

    this.squadFillQueue = [];

    this.spawns = [{ spawner: null, bodyQueue: [] }];

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
    if(!this.spawns[0].spawner) this.spawns[0].spawner = getObjectsByPrototype(StructureSpawn).find(s => s.my);
    var squad = new Squad();

    squadSheild.setTarget({x:35, y:35});

    if(getTicks() == 1){
      this.putSquadOnQueue(squad, this.spawns[0]);
    }

    this.runCreepSpawningQueues();

    this.squadList = this.squadList.concat(CTools.enrollCreepsToSquadsInArray(this.squadFillQueue, this.creepPool));


    if(this.squadList.length > 0){
      this.squadList.forEach((squad, i)=>{
        squad.act();
      });
    }

    if(this.debug){
      this.debugCode();
    }
  }






  putSquadOnQueue(squad, spawn){
    squad.unfilledRoles?.forEach((role, i) =>{
      this.queueRoleToArray(role, bodyQueue);
    });
    this.squadFillQueue.push(squad);
  }

  runCreepSpawningQueues(){
      this.spawns.forEach((item, i) => {
      var newCreep = CTools.spawnFirstInQueue(item.spawner, item.bodyQueue);
      if(newCreep) this.creepPool.push(newCreep);
    });}







}
