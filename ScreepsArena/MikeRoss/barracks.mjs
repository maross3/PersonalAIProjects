import { getObjectsByPrototype, getCpuTime } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source } from '/game/prototypes';
import {RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE, ATTACK } from '/game/constants';
import { } from '/arena';
import { harvestFromSource, defaultSquadRole } from './tasks'
import { workerRole } from './neutral'

export var QUEUED = 0;
export var ALIVE = 1;

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
