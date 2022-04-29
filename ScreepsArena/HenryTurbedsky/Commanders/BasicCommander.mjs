import { getObjectsByPrototype, getRange, findClosestByPath } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source } from '/game/prototypes';
import { RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE } from '/game/constants';
import { searchPath } from 'game/path-finder';
import { getTicks } from 'game';
import { } from '/arena';

import * as Tools from '../Tools/tools'
import * as RoleTools from '../Tools/roleTools'
import * as SquadTools from '../Tools/squadTools'
import * as CTools from '../Tools/commanderTools'

import { BasicSquad } from '../Squads/BasicSquad'
import { Sheild } from '../Squads/Sheild'



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

    if(getTicks() < 4 ){
      var squadBasicSquad = new BasicSquad();
      var squadSheild = new Sheild();

      squadBasicSquad.debug = true;
      squadSheild.debug = true;

      squadSheild.setTarget({x:25, y:25});

      this.putSquadOnQueue(squadBasicSquad, this.spawns[0]);
      this.putSquadOnQueue(squadSheild, this.spawns[0]);
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
    CTools.queueSquadToArray(squad, spawn.bodyQueue);
    this.squadFillQueue.push(squad);
  }

  runCreepSpawningQueues(){
      this.spawns.forEach((item, i) => {
      var newCreep = CTools.spawnFirstInQueue(item.spawner, item.bodyQueue);
      if(newCreep) this.creepPool.push(newCreep);
    });}

}
