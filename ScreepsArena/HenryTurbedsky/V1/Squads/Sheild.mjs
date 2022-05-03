import { getObjectsByPrototype, getRange, findClosestByPath, findClosestByRange } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source, ConstructionSite, StructureTower } from '/game/prototypes';
import { RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE, ATTACK, TOUGH, HEAL, RANGED_ATTACK } from '/game/constants';
import { Visual } from '/game/visual';
import { getTicks } from 'game'

import * as Tools from '../Tools/tools'
import * as SquadTools from '../Tools/squadTools'

import {} from '../Roles/engineerRoles'
import {sheild} from '../Roles/meleeRoles'


export class Sheild {

  static currentRoles;
  static unfilledRoles;
  static fullSquad;

  static hasBeenActivated;

  static debugColor;
  static debugCode;
  static debug;

  constructor(){
    this.currentRoles = [];
    this.unfilledRoles = [ Object.create(sheild), Object.create(sheild), Object.create(sheild),];
    this.fullSquad = false;

    this.hasBeenActivated = false;

    this.debugColor = "#ffffff";
    this.debugCode = SquadTools.debugSquad;
    this.debug = false;
  }

  act()
  {

    if(this.currentRoles.length <= 0) return;

    this.distance = getRange(SquadTools.squadCenter(this), this.target);

    if(this.distance > 20)
    {
      this.currentRoles.forEach((roles, i)=>{
        roles.move(this.target);
      });
    }
    else if (getRange(SquadTools.squadCenter(this), findClosestByRange(SquadTools.squadCenter(this), getObjectsByPrototype(Creep).filter(c => !c.my))) < 15)
    {
      this.currentRoles.forEach((roles, i)=>{
        roles.act();
      });
    }
    else
    {
      this.currentRoles.forEach((roles, i)=>{
        roles.ideal();
      });
    }



      if(this.debug){
        SquadTools.squadDebugLines(this);
        //this.debugCode();
      }




  }


  setTarget(target){
    this.target = target;
    this.unfilledRoles.forEach((role, i) => {
        role.target = target;
    });
  }




}
