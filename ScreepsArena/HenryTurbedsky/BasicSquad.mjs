import { getObjectsByPrototype } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source, ConstructionSite, StructureTower } from '/game/prototypes';
import { RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE } from '/game/constants';
import { Visual } from '/game/visual';
import {worker, fastWorker} from './engineerRoles'

import * as Tools from './tools'
import * as SquadTools from './squadTools'

export class BasicSquad {

  static currentRoles;
  static unfilledRoles;
  static fullSquad;


  constructor(){
    this.currentRoles = [];
    this.unfilledRoles = [ Object.create(worker), Object.create(worker), Object.create(worker),];
    this.fullSquad = false;
  }

  act(){
    if(this.currentRoles.length > 0){
      this.currentRoles.forEach((roles, i)=>{
        roles.act();
      });
      var center = SquadTools.squadCenter(this)
      this.currentRoles.forEach((roles, i)=>{
        new Visual().line(roles.creep, center, {color: '#ff0000'});
      });
    }



    //new Visual().poly(Tools.pluck(this.currentRoles, "creep"), {color: '#ff0000'});
  }




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
