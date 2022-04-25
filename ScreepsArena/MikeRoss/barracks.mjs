import { getObjectsByPrototype } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source } from '/game/prototypes';
import {RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE, ATTACK } from '/game/constants';
import { } from '/arena';

import {QUEUED, ALIVE, FAILURE, RUNNING, SUCCESS } from './global';
import {selfDefense} from './defensive';
import { attack } from './offensive';
import { harvestFromSource, findCenterOfUnits, withdrawFromSource, depositToSpawner} from './neutral';

// ========================================
//          *****Creeps*****
// ========================================
export var minerCreep = { // W,C,M
  creep: "none",
  body: [WORK, CARRY, MOVE],
  ratio: [0.5,0.25,0.25],
  squad: "none",
  status: QUEUED,
  act: minerRole
};

export var generalistWorkerCreep = { // generalist W,C,M,A
  creep: "none",
  body: [WORK, CARRY, MOVE, ATTACK],
  ratio: [0.25, 0.25, 0.25, 0.25],
  squad: "none",
  status: QUEUED,
  act: minerRole
}

export var rampartWorkerCreep = { // W,C,M
  creep: "none",
  body: [WORK, CARRY, MOVE],
  ratio: [0.25, 0.25, 0.50],
  squad: "none",
  status: QUEUED,
  act: rampartRushFillRole
}

// ========================================
//        *****CreepRoles*****
// ========================================
function minerRole() {
  if(!this.spawner) this.spawner = getObjectsByPrototype(StructureSpawn)[0];
  if(!this.energySource) this.energySource = getObjectsByPrototype(Source)[0];
  if(!this.creep.store) return;

   if(this.creep.store.getFreeCapacity(RESOURCE_ENERGY)) harvestFromSource(this.creep, this.energySource); // makesure this.creep is calling on individual creeps
   else if(this.creep.transfer(this.spawner, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) this.creep.moveTo(this.spawner);
};

function rampartRushFillRole()  {
  if(!this.spawner) this.spawner = getObjectsByPrototype(StructureSpawn)[0];
  if(!this.energySource) this.energySource = getObjectsByPrototype(StructureContainer)[0];
  if(!this.creep.store) return;

  withdrawFromSource(this.creep, this.energySource);
  depositToSpawner(this.creep, this.spawner);

  if(this.squad.numberOfUnits == 2 && this.spawner.store.getUsedCapacity(RESOURCE_ENERGY) > 250) return SUCCESS;
  console.log("running");
  return RUNNING;
}

function rampartRushBuildRole() {
  console.log("building ramparts");
}

// ========================================
//          *****Squads*****
// ========================================
export var baseSquad = {
  units: [],
  queuedUnits: [],
  numberOfUnits: 0,
  act: rampartRushSquadRole
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
    else if(unit.act != rampartRushFillRole) unit.act = rampartRushFillRole;

    unit.act();


  });
}
var currentNode;

export function rampartRushSquadRole() {
  if(!this.tree) this.tree = setUpBehaviorTree();
  if(this.numberOfUnits == 0) return;

  if(!currentNode) currentNode = this.tree.left.status;

  var closestThreat = selfDefense(findCenterOfUnits(this.units));

  this.units.forEach((unit, i) => {
    if(unit.act() == RUNNING) currentNode = this.tree.left.status;
    else if(unit.act() == SUCCESS) currentNode = this.tree.right.status;

    unit.act = currentNode;

  });
}



function setUpBehaviorTree(){
  var root = Object.create(node);
  var left = Object.create(node);
  var right = Object.create(node);
  root.left = left;
  root.right = right;

  root.left.status = rampartRushFillRole;
  root.right.status = rampartRushBuildRole;
  return root;
}

var node = {
  left: 0,
  right: 0,
  status: FAILURE,
}
