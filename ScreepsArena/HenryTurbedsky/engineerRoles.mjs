import { getObjectsByPrototype, getRange, findClosestByPath } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source } from '/game/prototypes';
import { searchPath } from 'game/path-finder';
import {RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE, ATTACK } from '/game/constants';
import * as Tools from './tools'
import * as RoleTools from './roleTools'


export var worker = {
  roleType: "worker",
  creep: "none",
  bodyMakeUp: [WORK, CARRY, MOVE],
  act: mineAndFill,
  ideal: mineAndFill,
  retreat: mineAndFill,
  move: mineAndFill,
  debug: RoleTools.debugRole,
};

export var fastWorker = {
  roleType: "fastWorker",
  creep: "none",
  bodyMakeUp: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE,],
  act: mineAndFill,
  ideal: mineAndFill,
  retreat: mineAndFill,
  move: mineAndFill,
  debug: RoleTools.debugRole,
};


function mineAndFill()
{
  if(!this.spawner) this.spawner = getObjectsByPrototype(StructureSpawn)[0];
  if(!this.energySource) this.energySource = getObjectsByPrototype(Source)[0];

  if(this.creep.store.getFreeCapacity(RESOURCE_ENERGY)) Tools.harvestFromSource(this.creep, this.energySource); // makesure this.creep is calling on individual creeps
  else if(this.creep.transfer(this.spawner, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) this.creep.moveTo(this.spawner);
};
