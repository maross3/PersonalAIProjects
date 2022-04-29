import { WORK, CARRY, MOVE, ATTACK } from '/game/constants';
import { Creep, StructureSpawn, StructureContainer, Source } from '/game/prototypes';
import { getObjectsByPrototype, getCpuTime } from '/game/utils';

import {QUEUED, ALIVE, BASE, FIELD } from './global';
import { minerCreep, baseSquad, generalistWorkerCreep, rampartWorkerCreep, createSquad, spawnSquad } from './barracks';
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
var testArray = [0, leftBranchObj.hasJob(build), idle(build), BASE, FIELD, rightBranchObj.hasCombatParts(build),
                  rightBranchObj.combatNegative[0](build), leftBranchObj.jobOneFns[0](build), leftBranchObj.jobOneFns[1](build),
                    leftBranchObj.jobTwoFns[0](build), leftBranchObj.jobTwoFns[1](build),
                      rightBranchObj.combatPositive[0](build), rightBranchObj.combatPositive[1](build), 0, 0];
// debugging
//var testArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

var brain;

// setting up squad to test binary decision tree
var squadOneCreeps = [minerCreep, minerCreep];
var squadOne;


export function loop() {
  if(!squadOne) squadOne = createSquad(baseSquad, squadOneCreeps);
  if(!spawner) spawner = getObjectsByPrototype(StructureSpawn)[0];
  if(!brain) brain = new binaryBrain(testArray);

  spawnSquad(squadOne, spawner);
  squadOne.act();
  console.log(brain.treeMap);
  console.log(getCpuTime()); //debug
}
