// import * as brks from './barracks'
import { ALIVE, FULL } from './global'

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
  var creepToSpawn = sqd.queuedUnits[0]
  if (!creepToSpawn) {
    sqd.status = FULL
    return false
  }

  var creepMakeUp = getBodyParts(creepToSpawn.body, creepToSpawn.ratio, creepToSpawn.weight)
  var spawnedCreep = spawner.spawnCreep(creepMakeUp).object

  if (spawnedCreep) {
    sqd.units[sqd.numberOfUnits] = sqd.queuedUnits.shift()

    sqd.units[sqd.numberOfUnits].squad = sqd
    sqd.units[sqd.numberOfUnits].creep = spawnedCreep
    sqd.units[sqd.numberOfUnits].bodyCount = creepMakeUp.length
    sqd.units[sqd.numberOfUnits].status = ALIVE

    sqd.numberOfUnits += 1
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
