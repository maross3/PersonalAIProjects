import { WORK, CARRY, MOVE, ATTACK } from '/game/constants';
import { Creep, StructureSpawn, StructureContainer, Source } from '/game/prototypes';
import { getObjectsByPrototype, getCpuTime } from '/game/utils';

import {QUEUED, ALIVE, BASE, FIELD, FAILURE, SUCCESS, RUNNING } from './global';
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
  jobTypes: [checkIfBaseRole, checkIfFieldRole],
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
  console.log(unit.jobType);
  console.log("Does " + unit.creep + " have a job?");

  if(unit.jobType){
    console.log("has a job");
    return SUCCESS;
  }
  else{
    console.log("Lazy bum fails job check");
    return FAILURE;
  }
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
  unit.creep + " is filling the base spawn!";
  return RUNNING;
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
  unit.creep + " is idle!";
  return RUNNING;
}

function checkIfBaseRole(unit){
  console.log("we runnin base role boi");
  return RUNNING;
  if(unit.jobType == BASE) return SUCCESS;
  return FAILURE;
}

function checkIfFieldRole(unit){
  if(unit.jobType == FIELD) return SUCCESS;
  return FAILURE;
}

// ========================================
//   *****Debug Brain Creation*****
// ========================================
var testArray = [0, leftBranchObj.hasJob, idle, leftBranchObj.jobTypes[0], leftBranchObj.jobTypes[1], rightBranchObj.hasCombatParts,
                  rightBranchObj.combatNegative[0], leftBranchObj.jobOneFns[0], leftBranchObj.jobOneFns[1],
                    leftBranchObj.jobTwoFns[0], leftBranchObj.jobTwoFns[1],
                      rightBranchObj.combatPositive[0], rightBranchObj.combatPositive[1], 0, 0];
// debugging
//var testArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

var brain;

// setting up squad to test binary decision tree
var squadOneCreeps = [build, build];
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
