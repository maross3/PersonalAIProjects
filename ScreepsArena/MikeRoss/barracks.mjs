import { getObjectsByPrototype, getTicks } from '/game/utils';
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
  act: extensionRushFillRole
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

// this grabs the capacity before it actually spawns the creep
// fix success condition
function extensionRushFillRole()  {
  if(!this.spawner) this.spawner = getObjectsByPrototype(StructureSpawn)[0];
  if(!this.energySource) this.energySource = getObjectsByPrototype(StructureContainer)[0];
  if(!this.creep.store) return;

  withdrawFromSource(this.creep, this.energySource);
  depositToSpawner(this.creep, this.spawner);

  //this.spawner.store.getUsedCapacity(RESOURCE_ENERGY) > 250: needs to have delay
  if(this.squad.numberOfUnits == 2 && getTicks() % 50 == 0) return SUCCESS;
  console.log("running");
  return RUNNING;
}

// sources spawn every 50 ticks
function extensionRushBuildRole() {
  console.log("building ramparts");
  return RUNNING;
}

// ========================================
//          *****Squads*****
// ========================================
export var baseSquad = {
  units: [],
  queuedUnits: [],
  numberOfUnits: 0,
  act: extensionRushSquadRole
};

// ========================================
//        *****SquadRoles*****
// ========================================
export function defaultSquadRole() {
  if(this.numberOfUnits == 0) return;
  var closestThreat = selfDefense(findCenterOfUnits(this.units));
  this.units.forEach((unit, i) => {
    if(closestThreat !=  false && unit.body.includes(ATTACK)) attack(unit.creep, closestThreat);
    else if(unit.act != extensionRushFillRole) unit.act = extensionRushFillRole;
    unit.act();
  });
} // legacy

var currentNode;
export function extensionRushSquadRole() { // behavior tree to rush ramps
  if(!this.tree) this.tree = setUpBehaviorTree();
  if(this.numberOfUnits == 0) return;

  if(!currentNode) currentNode = this.tree.left;

  var closestThreat = selfDefense(findCenterOfUnits(this.units));

  this.units.forEach((unit, i) => {

    if(currentNode.status == RUNNING) currentNode = currentNode;
    else if(currentNode.status == SUCCESS) currentNode = currentNode.right;
    else if(currentNode.status == FAILURE) currentNode = this.tree.left;
    else currentNode.status = this.tree.left;

    if(!currentNode.behavior) currentNode = this.tree.right;

    unit.act = currentNode.behavior;
    currentNode.status = unit.act();
  });
}

// ========================================
// *****DataStructures of Mass Destruction*****
// ========================================
function setUpBehaviorTree(){
  var root = Object.create(node);
  var left = Object.create(node);
  var right = Object.create(node);
  root.left = left;
  root.right = right;

  root.left.behavior = extensionRushFillRole;
  root.left.status = RUNNING;
  root.right.behavior = extensionRushBuildRole;
  return root;
}

var node = {
  left: 0,
  right: 0,
  status: FAILURE,
  behavior: 0
}
