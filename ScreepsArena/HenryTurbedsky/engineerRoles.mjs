import {RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE, ATTACK } from '/game/constants';
import * as Tools from './tools'


export var worker = {
  roleType: "worker",
  creep: "none",
  squad: "none",
  bodyMakeUp: [WORK, CARRY, MOVE],
  act: mineAndFill,
  ideal: mineAndFill,
  retreat: mineAndFill,
  move: mineAndFill,
  debug: Tools.debugRole,
};


function mineAndFill(source, fill)
{
  if(!Tools.harvestFromSource(this.creep, source));
    if(this.creep.transfer(fill, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) this.creep.moveTo(fill);
};
