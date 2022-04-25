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




export class BasicCommander {

  static commanderType;

  static spawnQueues;
  static squadList;
  static squadQueue;
  static creepPool;

  static debugCode;
  static debug;

  constructor(){
    this.commanderType = "BasicCommander";

    this.spawns = [{ spawner: null, bodyQueue: [] }];
    this.squadList = [];
    this.squadQueue = [];
    this.creepPool = [];

    this.debugCode = CTools.debugCommander;
    this.debug = false;
  }




  run()
  {
    if(!this.spawns[0].spawner) this.spawns[0].spawner = getObjectsByPrototype(StructureSpawn).find(s => s.my);
    var squad = new BasicSquad();

    if(getTicks() < 5)
    {
      CTools.queueSquadToArray(squad, this.spawns[0].bodyQueue);
      this.squadQueue.push(squad);
    }


    if(this.spawns[0].bodyQueue.length != 0){
      var newCreep = CTools.spawnBodyFromQueue(this.spawns[0].spawner, this.spawns[0].bodyQueue);
      if(newCreep) this.creepPool.push(newCreep);
    }


    if (this.spawns[0].bodyQueue.length > 0){
      this.squadQueue.forEach((squad, i)=>{
        if(SquadTools.fillSquad(squad, this.creepPool)){
          this.squadList.push(squad);
          this.squadQueue.splice(i,1);
        }
      });
    }

    if(this.squadList.length > 0){
      this.squadList.forEach((squad, i)=>{
        squad.act();
      });
    }



    if(this.debug){
      this.debugCode();
    }
    // console.log("this.squadQueue");
    // console.log(this.squadQueue);
    // console.log("this.squadList");
    // console.log(this.squadList);
  }




}
