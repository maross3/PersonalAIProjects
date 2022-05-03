import { getObjectsByPrototype } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source, ConstructionSite, StructureTower } from '/game/prototypes';
import { RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE, ATTACK, TOUGH, HEAL, RANGED_ATTACK } from '/game/constants';
import { Visual } from '/game/visual';

import {worker} from '../Roles/engineerRoles'
import { Squad } from './Squad'


export class TestSquad extends Squad {

  constructor(){
    super([ Object.create(worker), Object.create(worker), Object.create(worker),]);
  }

  act(){
    if(this.currentRoles.length > 0){
      this.currentRoles.forEach((roles, i)=>{
        roles.act();
      });

      if(this.debug){
        this.squadDebugLines();
        this.debugSquad();
      }
    }
  }


}
