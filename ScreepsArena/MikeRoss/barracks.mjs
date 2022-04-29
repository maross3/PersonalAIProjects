import { getObjectsByPrototype, getTicks, findInRange, createConstructionSite, findClosestByPath, findClosestByRange } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source, StructureExtension, ConstructionSite } from '/game/prototypes';
import {RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE, ATTACK, ERR_NOT_ENOUGH_RESOURCES, ERR_INVALID_TARGET } from '/game/constants';
import { } from '/arena';

import {QUEUED, ALIVE, FAILURE, RUNNING, SUCCESS } from './global';
import {selfDefense} from './defensive';
import { attack } from './offensive';
import { harvestFromSource, findCenterOfUnits, withdrawFromSource, depositToSpawner, getBodyParts } from './neutral';

import { drawLineToTarget } from './debugHelper';

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

// Refactor, hard
function extensionRushBuildRole() { // extensions not ideal
  //if(!this.sources || getTicks() % 50 == 0)

  if(!this.constSite) {
    this.source = getObjectsByPrototype(StructureContainer).filter(s => s.x > 4 && s.x < 95);
    if(this.source){
      var closestSource = findClosestByPath(this.creep, this.source);
      var xOff = closestSource.x + 1;
      var yOff = closestSource.y;

      this.constSite = createConstructionSite(xOff, yOff, StructureExtension);
      this.currentSource = closestSource;
    }
  } else{

    // TODO: to new node
    if(!this.constSite) this.constSite = findClosestByRange(this.creep, getObjectsByPrototype(ConstructionSite));
    if(!this.currentSource || !this.currentSource.x || this.creep.store.getFreeCapacity()) this.currentSource = findClosestByRange(this.creep, getObjectsByPrototype(StructureContainer));

    if(!this.currentSource) return FAILURE;
    if(!this.currentSource.x) return RUNNING;

    drawLineToTarget(this.creep, this.currentSource);
    withdrawFromSource(this.creep, this.currentSource);

    if(this.creep.build(this.constSite.object) == ERR_NOT_IN_RANGE) this.creep.moveTo(this.constSite.object);
    if(!this.constSite || this.creep.build(this.constSite.object) == ERR_INVALID_TARGET) return FAILURE;
    console.log("didn't fail");

}
  return RUNNING;
}

// ========================================
//          *****Squads*****
// ========================================
export var baseSquad = {
  units: [],
  queuedUnits: [],
  numberOfUnits: 0,
  act: defaultSquadRole
};

export var binaryBrainSquad = {
  units: [],
  queuedUnits: [],
  numberOfUnits: 0,
  treeMap: null,
  act: binaryBrainSquadRole
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

export function binaryBrainSquadRole(){
    if(this.numberOfUnits == 0) return;
    this.currentNode = 0;
    this.units.forEach((unit, i) => {
      if(this.treeMap[this.currentNode].left.behavior(unit) == FAILURE);
        console.log(this.treeMap[this.currentNode].right.behavior(unit));
    });
}

// ========================================
//        *****SquadCreation*****
// ========================================
export var createSquad = (squad, units) => {
  var resultSquad = Object.create(squad);
  resultSquad.units = [];
  resultSquad.queuedUnits = [];

  for(let i = 0; i < units.length; i++){
    var tempCreep = Object.create(units[i]);

    tempCreep.squad = squad;
    resultSquad.queuedUnits.push(tempCreep);
  }
  return resultSquad;
}

export function spawnSquad(sqd, spawner){

  var creepToSpawn = sqd.queuedUnits[sqd.numberOfUnits];
  if(!creepToSpawn) return;
  var creepMakeUp = getBodyParts(creepToSpawn.body, creepToSpawn.ratio, 5)
  var spawnedCreep = spawner.spawnCreep(creepMakeUp).object;

  if(spawnedCreep){
    creepToSpawn.creep = spawnedCreep;
    creepToSpawn.status = ALIVE;

    sqd.units[sqd.numberOfUnits] = sqd.queuedUnits[sqd.numberOfUnits];
    sqd.numberOfUnits += 1;
  }
}


// TODO: refactor into binaryBrain
var currentNode;
export function extensionRushSquadRole() { // extensions not ideal for arena.
  if(!this.tree) this.tree = setUpBehaviorTree();
  if(this.numberOfUnits == 0) return;

  if(!currentNode) currentNode = this.tree.left;
  var closestThreat = selfDefense(findCenterOfUnits(this.units));
  this.units.forEach((unit, i) => {

    if(currentNode.status == RUNNING) currentNode = currentNode;
    else if(currentNode.status == SUCCESS) currentNode = currentNode.right;
    else if(currentNode.status == FAILURE) currentNode = this.tree.left;
    else currentNode = this.tree.left;

    if(!currentNode.behavior) currentNode = this.tree.right;

    unit.act = currentNode.behavior;
    currentNode.status = unit.act();
  });
}

// ========================================
//        *****To be deleted*****
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
