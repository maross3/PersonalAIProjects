import { HEAL } from 'game/constants'
import { StructureSpawn } from 'game/prototypes'
import { getObjectsByPrototype, getCpuTime } from 'game/utils'

import { FULL } from './global'
import {
  primitiveBrainSquad, primitiveThreePointSquad, privateMover, privateHealer,
  privateOffense, privateRanger, createSquad, spawnSquad, primitiveDefender,
  defenderSquad
} from './barracks'
import { } from './debugHelper'
import { } from './neutral'
import { } from './screepBrain'

import { } from './defensive'

// just about ready for my first arena :)

// needs base defenders
// refactor this spawning method, it is good!
var movers = createSquad(primitiveBrainSquad, [privateMover, privateMover])
var defenders = createSquad(defenderSquad, [primitiveDefender, primitiveDefender])
var secondLineDefenders = createSquad(defenderSquad, [primitiveDefender, primitiveDefender])
// var moverBrain;
var privateThreePointSquad = createSquad(primitiveThreePointSquad, [privateOffense, privateRanger, privateHealer])
var secondThreePointSquad = createSquad(primitiveThreePointSquad, [privateOffense, privateRanger, privateHealer])
var thirdThreePointSquad = createSquad(primitiveThreePointSquad, [privateOffense, privateRanger, privateHealer])

var spawner
var spawnTimer = 3
var spawnDelay = 3
export function loop () {
  spawnTimer++

  if (!spawner) spawner = getObjectsByPrototype(StructureSpawn)[0]

  if (spawnTimer > spawnDelay) {
    var spawnedCreep

    if (movers.status !== FULL) { // squad to spawn variable
      spawnedCreep = spawnSquad(movers, spawner)
    } else if (defenders.status !== FULL) {
      spawnedCreep = spawnSquad(defenders, spawner)
    } else if (secondLineDefenders.status !== FULL) {
      spawnedCreep = spawnSquad(secondLineDefenders, spawner)
    } else if (privateThreePointSquad.status !== FULL) {
      spawnedCreep = spawnSquad(privateThreePointSquad, spawner)
      if (spawnedCreep) {
        if (spawnedCreep.targetToFollow) {
          if (spawnedCreep.body[0] === HEAL) spawnedCreep.targetToFollow = privateThreePointSquad.units[1].creep
          else spawnedCreep.targetToFollow = privateThreePointSquad.units[0].creep
        }
      }
    } else if (secondThreePointSquad.status !== FULL) {
      spawnedCreep = spawnSquad(secondThreePointSquad, spawner)
      if (spawnedCreep) {
        if (spawnedCreep.targetToFollow) {
          if (spawnedCreep.body[0] === HEAL) spawnedCreep.targetToFollow = secondThreePointSquad.units[1].creep
          else spawnedCreep.targetToFollow = secondThreePointSquad.units[0].creep
        }
      }
    } else if (thirdThreePointSquad.status !== FULL) {
      spawnedCreep = spawnSquad(thirdThreePointSquad, spawner)
      if (spawnedCreep) {
        if (spawnedCreep.targetToFollow) {
          if (spawnedCreep.body[0] === HEAL) spawnedCreep.targetToFollow = thirdThreePointSquad.units[1].creep
          else spawnedCreep.targetToFollow = thirdThreePointSquad.units[0].creep
        }
      }
    }
    if (spawnedCreep) spawnDelay = spawnedCreep.bodyCount
  }

  if (spawnTimer > spawnDelay) spawnTimer = 0
  if (movers.units.length > 0) movers.act()
  if (defenders.units.length > 0) defenders.act()
  if (secondLineDefenders.units.length > 0) secondLineDefenders.act()
  if (privateThreePointSquad.units.length > 0) privateThreePointSquad.act()
  if (secondThreePointSquad.units.length > 0) secondThreePointSquad.act()
  if (thirdThreePointSquad.units.length > 0) thirdThreePointSquad.act()

  console.log(getCpuTime())
}
