import { WORK, CARRY, MOVE, ATTACK } from '/game/constants';
import { Creep, StructureSpawn, StructureContainer, Source } from '/game/prototypes';
import { getObjectsByPrototype, getCpuTime } from '/game/utils';

import {QUEUED, ALIVE, BASE, FIELD } from './global';
import { minerCreep, baseSquad, generalistWorkerCreep, rampartWorkerCreep } from './barracks';
import {visualizeSquad } from './debugHelper';
import { harvestFromSource, spawnSquad } from './neutral';


import { binaryBrain } from './screepBrain';
var spawner;

// ========================================
//   *****Testing BB DataScructure*****
// ========================================
var brain;
var builderTree = {
  unit: "none",
  left: leftBranchObj,
  right: rightBranchObj
}

var leftBranchObj = {
  hasJob: hasJob,
  jobTypes: [BASE, FIELD],
  jobOneFns: [fillSpawn, buildDefenses],
  jobTwoFns: [findAndBuild, findAndFill]
}

var rightBranchObj = {
  hasCombatParts: hasCombatParts,
  combatPositive: [attack, patrolBase],
  combatNegative: [patrolBase]
}

var build = {
  creep: "empty build",
  body: [WORK, CARRY, MOVE],
  ratio: [0.5,0.25,0.25],
  squad: "none",
  status: QUEUED,
  act: null,
  jobType: BASE
}

function assignLeftBranchUnit(unit){
  builderTree.unit = unit;
  builderTree.left = Object.create(leftBranchObj);
  builderTree.right = Object.create(rightBranchObj);
}
assignLeftBranchUnit(build);

// ========================================
//      *****_dummy functions*****
// ========================================
function hasJob(unit){
  return unit.jobType;
}

function hasCombatParts(unit){
  return unit.body.includes(ATTACK);
}

// home base jobs
function patrolBase(unit){
  console.log(unit.creep + " is patroling base");
}
function fillSpawn(unit){
  console.log(unit.creep + "is filling spawn!");
}
function buildDefenses(unit){
  console.log(unit.creep + "building defenses!");
}

// feild jobs
function findAndBuild(unit){
  console.log(unit.creep + "finding and building!");
}

function findAndFill(unit){
  console.log(unit.creep + "finding and filling!")
}

function attack(unit, target){
  console.log("ATTACKING!");
}

// ========================================
//   *****Debug Brain Creation*****
// ========================================
var testArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
var brain;

export function loop() {
  if(!brain) brain = new binaryBrain(testArray);

  console.log(brain.treeMap);
  console.log(getCpuTime()); //debug
}
