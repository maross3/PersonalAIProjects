import { getObjectsByPrototype, getRange, findClosestByPath, findClosestByRange } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source } from '/game/prototypes';
import { searchPath } from 'game/path-finder';
import { RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE, ATTACK, TOUGH, HEAL, RANGED_ATTACK } from '/game/constants';
import { getTicks } from 'game'
import { Visual } from '/game/visual';

import * as Tools from '../Tools/tools'
import * as RoleTools from '../Tools/roleTools'

import * as Defensive from '../Actions/defensive'
import * as Neutral from '../Actions/neutral'
import * as Offensive from '../Actions/offensive'


export var sheild = {
  roleType: "sheild",
  creep: "none",
  bodyMakeUp: [ ATTACK, MOVE, TOUGH, TOUGH, TOUGH ],
  act: Defensive.guardTarget,
  ideal: Neutral.moveCircle,
  retreat: Neutral.move,
  move: Neutral.move,
  target: null,
  debug: RoleTools.debugRole,
  get position(){
    if(this.creep == "none") return undefined;
    return {x:this.creep.x, y:this.creep.y}
  },
};
