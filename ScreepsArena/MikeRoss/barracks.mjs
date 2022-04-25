import { getObjectsByPrototype } from '/game/utils';
import { Creep, StructureSpawn, Source } from '/game/prototypes';
import {RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE, ATTACK } from '/game/constants';
import { } from '/arena';

import {QUEUED, ALIVE } from './global';
import {selfDefense} from './defensive';
import { attack } from './offensive';
import { harvestFromSource, findCenterOfUnits } from './neutral';

// ========================================
//          *****Creeps*****
// ========================================
export var workerCreep = { // W,C,M
  creep: "none",
  body: [WORK, CARRY, MOVE],
  ratio: [0.5,0.25,0.25],
  squad: "none",
  status: QUEUED,
  act: workerRole
};

export var generalistWorkerCreep = {
  creep: "none",
  body: [WORK, CARRY, MOVE, ATTACK],
  ratio: [0.25, 0.25, 0.25, 0.25],
  squad: "none",
  status: QUEUED,
  act: workerRole
}

// ========================================
//        *****CreepRoles*****
// ========================================
export function workerRole() {
  if(!this.spawner) this.spawner = getObjectsByPrototype(StructureSpawn)[0];
  if(!this.energySource) this.energySource = getObjectsByPrototype(Source)[0];
  if(!this.creep.store) return;

   if(this.creep.store.getFreeCapacity(RESOURCE_ENERGY)) harvestFromSource(this.creep, this.energySource); // makesure this.creep is calling on individual creeps
   else if(this.creep.transfer(this.spawner, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) this.creep.moveTo(this.spawner);
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
//        *****SquadRoles*****
// ========================================
export function defaultSquadRole() {
  if(this.numberOfUnits == 0) return;

  // if the squad can attack
  var closestThreat = selfDefense(findCenterOfUnits(this.units));

  this.units.forEach((unit, i) => {
    if(closestThreat !=  false && unit.body.includes(ATTACK)) attack(unit.creep, closestThreat);
    else unit.act();
  });
}
