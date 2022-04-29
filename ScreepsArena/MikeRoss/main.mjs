import { WORK, CARRY, MOVE, ATTACK } from '/game/constants';
import { Creep, StructureSpawn, StructureContainer, Source } from '/game/prototypes';
import { getObjectsByPrototype, getCpuTime } from '/game/utils';

import {QUEUED, ALIVE, BASE, FIELD } from './global';
import { minerCreep, baseSquad, generalistWorkerCreep, rampartWorkerCreep, createSquad, spawnSquad, binaryBrainSquad, binaryBrainSquadRole } from './barracks';
import {visualizeSquad } from './debugHelper';
import { harvestFromSource } from './neutral';


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
  creep: "Builder Creep",
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
  return "Does " + unit.creep + " have a job?"
  return unit.jobType;
}

function hasCombatParts(unit){
  return "Does " + unit.creep + " have attack parts?"
  return unit.body.includes(ATTACK);
}

// home base jobs
function patrolBase(unit){
  return unit.creep + " is patroling the base!";
}
function fillSpawn(unit){
  return unit.creep + " is filling the base spawn!";
}
function buildDefenses(unit){
  return unit.creep + " is building base defenses!";
}

// feild jobs
function findAndBuild(unit){
  return unit.creep + " is finding and building in the field!";
}

function findAndFill(unit){
  return unit.creep + " is finding and filling in the field!";
}

function attack(unit, target){
  return unit + " is ATTACKING " + target + "!";
}
function idle(unit){
  return unit.creep + " is idle!";
}

// ========================================
//   *****Debug Brain Creation*****
// ========================================
var testArray = [0, leftBranchObj.hasJob, idle, BASE, FIELD, rightBranchObj.hasCombatParts,
                  rightBranchObj.combatNegative[0], leftBranchObj.jobOneFns[0], leftBranchObj.jobOneFns[1],
                    leftBranchObj.jobTwoFns[0], leftBranchObj.jobTwoFns[1],
                      rightBranchObj.combatPositive[0], rightBranchObj.combatPositive[1], 0, 0];
// debugging
//var testArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

var brain;

// setting up squad to test binary decision tree
var squadOneCreeps = [minerCreep, minerCreep];
var squadOne;


export function loop() {
  if(!spawner) spawner = getObjectsByPrototype(StructureSpawn)[0];
  if(!brain) brain = new binaryBrain(testArray);
  if(!squadOne) squadOne = createSquad(binaryBrainSquad, squadOneCreeps);
  squadOne.treeMap = brain.treeMap;
  spawnSquad(squadOne, spawner);
  squadOne.act();
  console.log(brain.treeMap);
  console.log(getCpuTime()); //debug
}
