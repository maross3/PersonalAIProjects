import { getObjectsByPrototype, getRange, findClosestByPath, findClosestByRange } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source } from '/game/prototypes';
import { searchPath } from 'game/path-finder';
import { RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE, ATTACK, TOUGH, } from '/game/constants';
import { getTicks } from 'game'
import { Visual } from '/game/visual';

import * as Tools from '../Tools/tools'
import * as RoleTools from '../Tools/roleTools'


export var sheild = {
  roleType: "sheild",
  creep: "none",
  bodyMakeUp: [ ATTACK, MOVE, TOUGH, TOUGH, TOUGH ],

  act: guard,
  ideal: ideal,
  retreat: function(){},
  move: move,

  target: null,

  debug: RoleTools.debugRole,
};


function guard(){
  var enememy = findClosestByRange(this.target, getObjectsByPrototype(Creep).filter(c => !c.my))
  if(this.creep.attack(enememy) == ERR_NOT_IN_RANGE) this.creep.moveTo(enememy);
}

function ideal(){
  this.creep.move(((getTicks()/4)%8)+1);
}

function move(target){
  this.creep.moveTo(target);
}
