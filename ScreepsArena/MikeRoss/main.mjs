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

// needs base defenders
// refactor this spawning method, it is good!
var movers = createSquad(primitiveBrainSquad, [privateMover, privateMover, privateMover])
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
  // if(!moverBrain) moverBrain = new binaryBrain(privateMover.brain);
  if (spawnTimer > spawnDelay) {
    if (movers.status !== FULL) {
      var spawnedMover = spawnSquad(movers, spawner)
      if (spawnedMover) {
        spawnDelay = spawnedMover.creep.body.length
        spawnTimer = 0
      }
    } else if (defenders.status !== FULL) {
      var spawnedDef = spawnSquad(defenders, spawner)
      if (spawnedDef) {
        spawnDelay = spawnedDef.creep.body.length
        spawnTimer = 0
      }
    } else if (secondLineDefenders.status !== FULL) {
      var newSpawn = spawnSquad(secondLineDefenders, spawner)
      if (newSpawn) {
        spawnDelay = newSpawn.creep.body.length
        spawnTimer = 0
      }
    } else if (privateThreePointSquad.status !== FULL) {
      var spawnedThreePoint = spawnSquad(privateThreePointSquad, spawner)
      if (spawnedThreePoint) {
        spawnDelay = spawnedThreePoint.weight
        spawnTimer = 0
        if (spawnedThreePoint.targetToFollow) {
          if (spawnedThreePoint.body[0] === HEAL) spawnedThreePoint.targetToFollow = privateThreePointSquad.units[1].creep
          else spawnedThreePoint.targetToFollow = privateThreePointSquad.units[0].creep
        // console.log(privateThreePointSquad.units);
        }
      // var newBrain = new binaryBrain(spawnedThreePoint.behaviors);
      // spawnedMover.brain = newBrain.treeMap;
      }
    } else if (secondThreePointSquad.status !== FULL) {
      var secondSpawned = spawnSquad(secondThreePointSquad, spawner)
      if (secondSpawned) {
        spawnDelay = secondSpawned.weight
        spawnTimer = 0
        if (secondSpawned.targetToFollow) {
          if (secondSpawned.body[0] === HEAL) secondSpawned.targetToFollow = secondThreePointSquad.units[1].creep
          else secondSpawned.targetToFollow = secondThreePointSquad.units[0].creep
        // console.log(privateThreePointSquad.units);
        }
      }
    } else if (thirdThreePointSquad.status !== FULL) {
      var thirdSpawned = spawnSquad(thirdThreePointSquad, spawner)
      if (thirdSpawned) {
        spawnDelay = thirdSpawned.weight
        spawnTimer = 0
        if (thirdSpawned.targetToFollow) {
          if (thirdSpawned.body[0] === HEAL) thirdSpawned.targetToFollow = thirdThreePointSquad.units[1].creep
          else thirdSpawned.targetToFollow = thirdThreePointSquad.units[0].creep
        // console.log(privateThreePointSquad.units);
        }
      }
    }
  }

  if (movers.units.length > 0) movers.act()
  if (defenders.units.length > 0) defenders.act()
  if (secondLineDefenders.units.length > 0) secondLineDefenders.act()
  if (privateThreePointSquad.units.length > 0) privateThreePointSquad.act()
  if (secondThreePointSquad.units.length > 0) secondThreePointSquad.act()
  if (thirdThreePointSquad.units.length > 0) thirdThreePointSquad.act()

  console.log(getCpuTime())
}
