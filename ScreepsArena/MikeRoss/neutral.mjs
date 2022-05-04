import { getObjectsByPrototype, createConstructionSite, findClosestByRange } from 'game/utils'
import { StructureSpawn, StructureContainer, ConstructionSite } from 'game/prototypes'
import { RESOURCE_ENERGY, ERR_NOT_IN_RANGE } from 'game/constants'
import { RUNNING } from './global'
import { followTarget } from './defensive'
var constSite

// ========================================
//       *****CreepFunctions*****
// ========================================
export function buildStructureAt (creep, structure, x, y) {
  if (!constSite) {
    createConstructionSite(x, y, structure)
    constSite = getObjectsByPrototype(ConstructionSite)[0] // needs to be my
  }
  if (!constSite) return

  if (creep.build(constSite) === ERR_NOT_IN_RANGE) creep.moveTo(constSite)
  if (constSite.progressTotal === 0) constSite = null
}

export function depositToSpawner (creep, spawner) {
  if (creep.store.getFreeCapacity(RESOURCE_ENERGY)) return
  if (creep.transfer(spawner, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) creep.moveTo(spawner)
}

export function harvestFromSource (creep, source) {
  if (!creep.getFreeCapacity(RESOURCE_ENERGY)) return
  if (creep.harvest(source) === ERR_NOT_IN_RANGE) creep.moveTo(source)
}

export function withdrawFromSource (creep, source) {
  if (!creep.store.getFreeCapacity(RESOURCE_ENERGY)) return RUNNING

  if (typeof source === 'undefined') source = findClosestByRange(creep, getObjectsByPrototype(StructureContainer))
  else if (creep.withdraw(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) creep.moveTo(source, { reusePath: 50 })
  else console.log('Mine!')
}

export function fillSpawn () {
  if (!this.spawner) this.spawner = getObjectsByPrototype(StructureSpawn).find(s => s.my)
  if (!this.energySource) this.energySource = findClosestByRange(this.creep, getObjectsByPrototype(StructureContainer))
  if (!this.energySource.store) return
  if (!this.energySource.store.getUsedCapacity(RESOURCE_ENERGY)) {
    this.energySource = findClosestByRange(this.creep, getObjectsByPrototype(StructureContainer).filter(s => !s.store.getFreeCapacity()))
  }

  if (this.creep.store.getFreeCapacity(RESOURCE_ENERGY)) withdrawFromSource(this.creep, this.energySource)
  else if (this.creep.transfer(this.spawner, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) this.creep.moveTo(this.spawner)
  return RUNNING
}

export function waitForTicks (unit, ticks) {
  if (!this.unitTicks) this.unitTicks = 0

  if (this.unitTicks === ticks) {
    this.unitTicks = 0
    return true
  }
  return false
}

// ========================================
//       *****SquadFunctions*****
// ========================================
export function findCenterOfUnits (units) {
  var tempX = 0
  var tempY = 0
  units.forEach((role, i) => {
    tempX += role.creep.x
    tempY += role.creep.y
  })

  tempX = tempX / units.length
  tempY = tempY / units.length
  return { x: tempX, y: tempY }
}

export function initializeThreePointSquad () {
  this.queuedUnits[1].targetToFollow = this.queuedUnits[0]
  this.queuedUnits[2].targetToFollow = this.queuedUnits[1]
}

export function setUpFollower () {
  var temp = this.targetToFollow
  if (!temp) return
  this.targetToFollow = temp.creep
  this.brain = followTarget
}
