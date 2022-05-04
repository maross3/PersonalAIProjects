/* global ERR_NOT_IN_RANGE RESOURCE_ENERGY, WORK, CARRY, MOVE */

var baseWorker = {
  creep: 'none',
  body: [WORK, WORK, WORK, CARRY, MOVE],
  act: fillSpawn
}

var stationaryWorker = {
  body: [WORK, WORK, WORK, WORK, CARRY, MOVE]
}

module.exports = { buildRoads, keepExtenFull, fillSpawn, baseWorker, repairStructure, stationaryWorker }

function repairStructure (creep, source, structure) {
  if (!creep) return
  setCreepMemory(creep)

  if (!creep.memory.filling) {
    if (creep.harvest(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) creep.moveTo(source)
  } else if (creep.repair(structure) === ERR_NOT_IN_RANGE) creep.moveTo(structure)
}

function buildRoads (creep, road, source) {
  if (!creep) return
  setCreepMemory(creep)

  if (!creep.memory.filling) {
    if (creep.harvest(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) creep.moveTo(source)
  } else if (creep.build(road) === ERR_NOT_IN_RANGE) creep.moveTo(road)
}

function keepExtenFull (creep, source, extensions, contrl) {
  setCreepMemory(creep)

  if (!creep.memory.filling) {
    if (creep.harvest(source) === ERR_NOT_IN_RANGE) creep.moveTo(source)
  } else {
    var emptyExts = findEmptyExtensions(extensions)
    if (emptyExts[0]) {
      if (creep.transfer(emptyExts[0], RESOURCE_ENERGY)) creep.moveTo(emptyExts[0])
    } else {
      if (creep.transfer(contrl, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) creep.moveTo(contrl)
    }
  }
}

function findEmptyExtensions (exts) {
  return exts.filter(e => e.store[RESOURCE_ENERGY] < 50)
}

function setCreepMemory (creep) {
  if (creep.store.getFreeCapacity() === 0) creep.memory.filling = true
  if (creep.store.getUsedCapacity() === 0) creep.memory.filling = false
}

function fillSpawn (creep, source, spawn) {
  if (!creep) return
  setCreepMemory(creep)

  if (!creep.memory.filling) {
    if (creep.harvest(source) === ERR_NOT_IN_RANGE) creep.moveTo(source)
  } else if (creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) creep.moveTo(spawn)
}
