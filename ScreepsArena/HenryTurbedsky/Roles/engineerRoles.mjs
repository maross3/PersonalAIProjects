import { getObjectsByPrototype, getRange, findClosestByPath, findClosestByRange } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source } from '/game/prototypes';
import { searchPath } from 'game/path-finder';
import { RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE, ATTACK, TOUGH, HEAL, RANGED_ATTACK } from '/game/constants';

import * as Tools from '../Tools/tools'
import * as RoleTools from '../Tools/roleTools'

import * as Defensive from '../Actions/defensive'
import * as Neutral from '../Actions/neutral'
import * as Offensive from '../Actions/offensive'


export var worker = {
  roleType: "worker",
  creep: "none",
  bodyMakeUp: [WORK, CARRY, MOVE,],
  act: Neutral.mineAndFill,
  ideal: Neutral.mineAndFill,
  retreat: Neutral.mineAndFill,
  move: Neutral.mineAndFill,
  debug: RoleTools.debugRole,
  get position(){
    if(this.creep == "none") return undefined;
    return {x:this.creep.x, y:this.creep.y}
  },
};

export var fastWorker = {
  roleType: "fastWorker",
  creep: "none",
  bodyMakeUp: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE,],
  act: Neutral.mineAndFill,
  ideal: Neutral.mineAndFill,
  retreat: Neutral.mineAndFill,
  move: Neutral.mineAndFill,
  debug: RoleTools.debugRole,
  get position(){
    if(this.creep == "none") return undefined;
    return {x:this.creep.x, y:this.creep.y}
  },
};
