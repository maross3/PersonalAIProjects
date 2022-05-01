import { getObjectsByPrototype, getTicks } from 'game/utils'
import { StructureSpawn, StructureContainer, Source } from 'game/prototypes'
import { RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE, ATTACK, HEAL, TOUGH, RANGED_ATTACK } from 'game/constants'

import { QUEUED, ALIVE, FAILURE, RUNNING, SUCCESS, FULL } from './global'
import { selfDefense, followTarget, guardBase } from './defensive'
import { attack, genericSupport, genericRangedAttack, attackEnemyBase } from './offensive'
import { harvestFromSource, findCenterOfUnits, withdrawFromSource, depositToSpawner, fillSpawn } from './neutral'
// ========================================
//          *****Creeps*****
// ========================================
export var minerCreep = { // W,C,M
  creep: 'none',
  body: [WORK, CARRY, MOVE],
  ratio: [0.5, 0.25, 0.25],
  squad: 'none',
  status: QUEUED,
  act: minerRole
}

export var generalistWorkerCreep = { // generalist W,C,M,A
  creep: 'none',
  body: [WORK, CARRY, MOVE, ATTACK],
  ratio: [0.25, 0.25, 0.25, 0.25],
  squad: 'none',
  status: QUEUED,
  act: minerRole
}

export var rampartWorkerCreep = { // W,C,M
  creep: 'none',
  body: [WORK, CARRY, MOVE],
  ratio: [0.25, 0.25, 0.50],
  squad: 'none',
  status: QUEUED,
  act: extensionRushFillRole
}

export var privateMover = {
  creep: 'none',
  body: [WORK, CARRY, MOVE],
  ratio: [0.33, 0.33, 0.33],
  weight: 5,
  squad: 'none',
  status: QUEUED,
  behaviors: [],
  brain: fillSpawn
}

export var privateHealer = {
  creep: 'none',
  body: [HEAL, MOVE, TOUGH],
  ratio: [0.25, 0.5, 0.25],
  weight: 4,
  squad: 'none',
  status: QUEUED,
  behaviors: [],
  brain: followTarget,
  targetToFollow: 'none',
  handleCombat: genericSupport
}

export var privateOffense = {
  creep: 'none',
  body: [ATTACK, MOVE, TOUGH],
  ratio: [0.5, 0.25, 0.25],
  weight: 5,
  squad: 'none',
  status: QUEUED,
  behaviors: [],
  target: 'none',
  brain: attackEnemyBase,
  handleCombat: attackEnemyBase
}

export var privateRanger = {
  creep: 'none',
  body: [RANGED_ATTACK, MOVE],
  ratio: [0.5, 0.5],
  weight: 4,
  squad: 'none',
  status: QUEUED,
  behaviors: [],
  brain: followTarget,
  targetToFollow: 'none',
  handleCombat: genericRangedAttack
}

export var primitiveDefender = {
  creep: 'none',
  body: [TOUGH, ATTACK, MOVE],
  ratio: [0.5, 0.25, 0.25],
  weight: 6,
  squad: 'none',
  status: QUEUED,
  behaviors: [],
  brain: guardBase
}
// ========================================
//        *****CreepRoles*****
// ========================================
function minerRole () {
  if (!this.spawner) this.spawner = getObjectsByPrototype(StructureSpawn)[0]
  if (!this.energySource) this.energySource = getObjectsByPrototype(Source)[0]
  if (!this.creep.store) return

  if (this.creep.store.getFreeCapacity(RESOURCE_ENERGY)) harvestFromSource(this.creep, this.energySource) // makesure this.creep is calling on individual creeps
  else if (this.creep.transfer(this.spawner, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) this.creep.moveTo(this.spawner)
};

function extensionRushFillRole () {
  if (!this.spawner) this.spawner = getObjectsByPrototype(StructureSpawn)[0]
  if (!this.energySource) this.energySource = getObjectsByPrototype(StructureContainer)[0]
  if (!this.creep.store) return

  withdrawFromSource(this.creep, this.energySource)
  depositToSpawner(this.creep, this.spawner)

  // this.spawner.store.getUsedCapacity(RESOURCE_ENERGY) > 250: needs to have delay
  if (this.squad.numberOfUnits === 2 && getTicks() % 50 === 0) return SUCCESS
  return RUNNING
}

/* TODO
function privateMoverBrain(){
  if (!this.breakingBillboard) this.breakingBillboard = false

  if (!this.breakingBillboard)
    primitiveBinaryBrainModule(this)
}
*/

// ========================================
//       *****BrainModules*****
// ========================================
/* safe to delete?
function primitiveBinaryBrainModule (unit) {
  if (!this.binaryNeuron) this.binaryNeuron = unit.brain
  if (!this.actionPotential) this.actionPotential = 0

  if (!this.binaryNeuron[this.actionPotential]) {
    console.log(this.actionPotential + ' did not reach synapse!')
    this.actionPotential = 0
    return
  }

  if (this.binaryNeuron[this.actionPotential].left.behavior(unit) === RUNNING) return
  else if (this.binaryNeuron[this.actionPotential].left.behavior(unit) === SUCCESS) {
    this.actionPotential = this.binaryNeuron[this.actionPotential].left.val
    return
  }
  if (this.binaryNeuron[this.actionPotential].right.behavior(unit) === RUNNING) return
  if (this.binaryNeuron[this.actionPotential].right.behavior(unit) === FAILURE) {
    this.actionPotential = 0
    return
  }
  if (this.binaryNeuron[this.actionPotential].right.behavior(unit) === SUCCESS) {
    this.actionPotential = this.binaryNeuron[this.actionPotential].right.val
  }
}

TODO
function shortOfSquadBillboard(){
   // add run away logic and release cond.
}
*/
// ========================================
//          *****Squads*****
// ========================================
export var baseSquad = {
  units: [],
  queuedUnits: [],
  numberOfUnits: 0,
  act: defaultSquadRole
}

export var binaryBrainSquad = {
  units: [],
  queuedUnits: [],
  numberOfUnits: 0,
  treeMap: null,
  act: binaryBrainSquadRole
}

export var primitiveBrainSquad = {
  units: [],
  queuedUnits: [],
  numberOfUnits: 0,
  status: QUEUED,
  act: genericBrainDictator
}

export var primitiveThreePointSquad = {
  units: [],
  queuedUnits: [],
  numberOfUnits: 0,
  status: QUEUED,
  act: genericBrainDictator
}

export var defenderSquad = {
  units: [],
  queuedUnits: [],
  numberOfUnits: 0,
  status: QUEUED,
  act: genericBrainDictator
}
// ========================================
//        *****SquadRoles*****
// ========================================
export function defaultSquadRole () {
  if (this.numberOfUnits === 0) return
  var closestThreat = selfDefense(findCenterOfUnits(this.units))
  this.units.forEach((unit, i) => {
    if (closestThreat !== false && unit.body.includes(ATTACK)) attack(unit.creep, closestThreat)
    else if (unit.act !== extensionRushFillRole) unit.act = extensionRushFillRole
    unit.act()
  })
} // legacy

export function binaryBrainSquadRole () {
  if (this.numberOfUnits === 0) return
  if (!this.currentNode) this.currentNode = 0
  this.units.forEach((unit, i) => {
    if (this.treeMap.length < this.currentNode) {
      console.log(this.currentNode + ' was called but not found!')
      this.currentNode = 0
      return
    }

    if (this.treeMap[this.currentNode].left.behavior(unit) === RUNNING) return
    else if (this.treeMap[this.currentNode].left.behavior(unit) === SUCCESS) {
      this.currentNode = this.treeMap[this.currentNode].left.val
      return
    }
    if (this.treeMap[this.currentNode].right.behavior(unit) === RUNNING) return
    if (this.treeMap[this.currentNode].right.behavior(unit) === FAILURE) {
      this.currentNode = 0
      return
    }
    if (this.treeMap[this.currentNode].right.behavior(unit) === SUCCESS) {
      this.currentNode = this.treeMap[this.currentNode].right.val
    }
  })
}

export function genericBrainDictator () {
  this.units.forEach((unit, i) => {
    if (unit.breakingBillboard) console.log('breaking billboard!')
    unit.brain()
  })
}

// ========================================
//        *****SquadCreation*****
// ========================================
export var createSquad = (squad, units) => {
  var resultSquad = Object.create(squad)
  resultSquad.units = []
  resultSquad.queuedUnits = []

  for (let i = 0; i < units.length; i++) {
    var tempCreep = Object.create(units[i])

    tempCreep.squad = squad
    resultSquad.queuedUnits.push(tempCreep)
  }
  return resultSquad
}

export function spawnSquad (sqd, spawner) {
  var creepToSpawn = sqd.queuedUnits[sqd.numberOfUnits]
  if (!creepToSpawn) {
    sqd.status = FULL
    return false
  }
  var creepMakeUp = getBodyParts(creepToSpawn.body, creepToSpawn.ratio, creepToSpawn.weight)
  var spawnedCreep = spawner.spawnCreep(creepMakeUp).object

  if (spawnedCreep) {
    creepToSpawn.creep = spawnedCreep
    creepToSpawn.status = ALIVE

    sqd.units[sqd.numberOfUnits] = sqd.queuedUnits[sqd.numberOfUnits]
    sqd.numberOfUnits += 1
    creepToSpawn.squad = sqd
    return creepToSpawn
  }
}

function getBodyParts (body, ratio, total) {
  var temp = []
  for (let i = 0; i < body.length; i++) {
    for (let j = 0; j < ratio[i] * total; j++) {
      temp.push(body[i])
    }
  }
  return temp
}
