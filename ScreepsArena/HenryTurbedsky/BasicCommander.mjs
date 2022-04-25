import { getObjectsByPrototype, getRange, findClosestByPath } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source } from '/game/prototypes';
import { RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE } from '/game/constants';
import { searchPath } from 'game/path-finder';
import { } from '/arena';

import * as Tools from './tools'
import * as SquadTools from './squadTools'
import * as RoleTools from './roleTools'

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
        if(SquadTools.fillSquad(squad, this.creepBuffer)){
          this.squadList.push(squad);
          this.squadQueue.splice(i,1);
        }
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





  spawnBodyQueue(spawn)
  {
    var newCreep = this.spawnRole(spawn, this.bodyQueue[0]);
    if(newCreep){
      this.creepBuffer.push(newCreep);
      this.bodyQueue.shift();
    }
  }


  spawnRole(spawn, body)
  {
    var obj = spawn.spawnCreep(body).object;
    if(obj) obj.bodyMakeUp = body;

    return obj;
  }


}
