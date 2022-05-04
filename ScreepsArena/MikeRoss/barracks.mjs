import { } from 'game/utils'
import { } from 'game/prototypes'
import { CARRY, MOVE, ATTACK, HEAL, TOUGH, RANGED_ATTACK } from 'game/constants'
import { QUEUED, SUCCESS, FAILURE, RUNNING } from './global'
import { guardBaseChokePoints } from './defensive'
import { genericSupport, genericRangedAttack, attackEnemyBase } from './offensive'
import { fillSpawn, setUpFollower, initializeThreePointSquad } from './neutral'
// ========================================
//          *****Creeps*****
// ========================================

export var privateMover = {
  creep: 'none',
  body: [CARRY, MOVE],
  ratio: [0.5, 0.5],
  weight: 4,
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
  brain: setUpFollower,
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
  brain: setUpFollower,
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
  brain: guardBaseChokePoints
}

export var bomber = {
  creep: 'none',
  body: [ATTACK, MOVE],
  ratio: [0.4, 0.6],
  weight: 7,
  squad: 'none',
  status: QUEUED,
  behaviors: [],
  target: 'none',
  brain: attackEnemyBase,
  handleCombat: attackEnemyBase
}
/* TODO
function privateMoverBrain(){
  if (!this.breakingBillboard) this.breakingBillboard = false

  if (!this.breakingBillboard)
    primitiveBinaryBrainModule(this)
}

TODO
function shortOfSquadBillboard(){
   // add run away logic and release cond.
}
*/
// ========================================
//          *****Squads*****
// ========================================
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
  act: genericBrainDictator,
  setup: initializeThreePointSquad
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

// calling units a bottle neck (after pathfinding)
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
