import { getObjectsByPrototype, getCpuTime } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source } from '/game/prototypes';
import {RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE, ATTACK } from '/game/constants';
import { } from '/arena';
import { harvestFromSource, defaultSquadRole } from './tasks'
import { workerRole } from './neutral'
import {QUEUED, ALIVE } from './global'

// ========================================
//          *****Creeps*****
// ========================================
export var workerCreep = {
  creep: "none",
  body: [WORK, CARRY, MOVE],
  ratio: [0.5,0.25,0.25],
  squad: baseSquad,
  status: QUEUED,
  act: workerRole
};

// ========================================
//          *****Squads*****
// ========================================
export var baseSquad = {
  units: [],
  queuedUnits: [],
  numberOfUnits: 0,
  act: defaultSquadRole
};

// ========================================
//        *****SquadHelpers*****
// ========================================
export function findCenterOfUnits(units)
{
  var tempX = 0;
  var tempY = 0;
  units.forEach((role, i) => {
    tempX += role.creep.x;
    tempY += role.creep.y;
  });

  tempX = tempX/units.length;
  tempY = tempY/units.length;
  return {x:tempX, y:tempY};
}
