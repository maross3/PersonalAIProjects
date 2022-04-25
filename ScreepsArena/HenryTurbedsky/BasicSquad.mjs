import { getObjectsByPrototype } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source, ConstructionSite, StructureTower } from '/game/prototypes';
import {RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE } from '/game/constants';
import {worker} from './engineerRoles'


export class BasicSquad {

  static currentRoles;
  static unfilledRoles;
  static fullSquad;


  constructor(){
    this.currentRoles = [];
    this.unfilledRoles = [ Object.create(worker), Object.create(worker) ];
    this.fullSquad = false;
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
