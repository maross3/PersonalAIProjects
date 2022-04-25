import { getObjectsByPrototype } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source, ConstructionSite, StructureTower } from '/game/prototypes';
import { RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE } from '/game/constants';
import { Visual } from '/game/visual';

import * as Tools from '../Tools/tools'
import * as SquadTools from '../Tools/squadTools'

import {worker} from '../Roles/engineerRoles'


export class BasicSquad {

  static currentRoles;
  static unfilledRoles;
  static fullSquad;

  static debugColor;
  static debugCode;
  static debug;

  constructor(){
    this.currentRoles = [];
    this.unfilledRoles = [ Object.create(worker), Object.create(worker), Object.create(worker),];
    this.fullSquad = false;
    this.debugColor = "#ffffff";
    this.debugCode = SquadTools.debugSquad;
    this.debug = false;
  }

  act(){
    if(this.currentRoles.length > 0){
      this.currentRoles.forEach((roles, i)=>{
        roles.act();
      });

      if(this.debug){
        SquadTools.squadDebugLines(this);
        squad.debugCode();
      }
    }


  };



}





// BuryDead()
// {
//   var temp;
//   this.currentSquad.forEach((creepRole, i) => {
//     if(!creepRole.IsAlive())
//     {
//       this.unfilledRoles.push(currentRoles[i]);
//       temp.push(i);
//     }
//   });
//   temp?.forEach((index, i) => {
//     this.currentSquad.splice(index-i, 1);
//   });
// }
