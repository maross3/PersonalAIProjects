/* global ERR_NOT_IN_RANGE RESOURCE_ENERGY, WORK, CARRY, MOVE, FIND_STRUCTURES
  FIND_MY_CONSTRUCTION_SITES */

var baseWorker = {
  creep: 'none',
  body: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE],
  act: fillSpawn
}

var stationaryWorker = {
  body: [WORK, WORK, WORK, WORK, CARRY, MOVE]
}

module.exports = {
  keepExtenFull,
  fillSpawn,
  baseWorker,
  stationaryWorker,
  repairStructures,
  buildAllConstructionSites
}

function buildAllConstructionSites (creep, source) {
  if (!creep) return
  setCreepMemory(creep)
  var constSites = findMyConstSites(creep)

  if (creep.memory.filling) {
    if (!constSites[0]) creep.say('zZzZz')
    else if (creep.build(constSites[0]) === ERR_NOT_IN_RANGE) creep.moveTo(constSites[0])
  } else {
    if (creep.harvest(source) === ERR_NOT_IN_RANGE) creep.moveTo(source)
  }
}

function findMyConstSites (creep) {
  var constSites = creep.room.find(FIND_MY_CONSTRUCTION_SITES, {
    filter: (cs) => {
      return (cs)
    }
  })
  return constSites
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

function repairStructures (creep, source) {
  if (!creep) return
  setCreepMemory(creep)

  var structure = creep.room.find(FIND_STRUCTURES, {
    filter: (str) => {
      return (str.hits < str.hitsMax && str.pos.y > 2 && str.hitsMax < 500000)
    }
  })

  if (creep.memory.filling) {
    if (!structure[0]) creep.say('zZzZz')
    else if (creep.repair(structure[0]) === ERR_NOT_IN_RANGE) creep.moveTo(structure[0])
  } else {
    if (creep.harvest(source) === ERR_NOT_IN_RANGE) creep.moveTo(source)
  }
}
