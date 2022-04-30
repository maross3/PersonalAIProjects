import { HEAL } from 'game/constants'
import { StructureSpawn } from 'game/prototypes'
import { getObjectsByPrototype, getCpuTime } from 'game/utils'

import { FULL } from './global'
import { primitiveBrainSquad, primitiveThreePointSquad, privateMover, privateHealer, privateOffense, privateRanger, createSquad, spawnSquad } from './barracks'
import { } from './debugHelper'
import { } from './neutral'
import { } from './screepBrain'

import { } from './defensive'

var movers = createSquad(primitiveBrainSquad, [privateMover, privateMover, privateMover])
// var moverBrain;
var privateThreePointSquad = createSquad(primitiveThreePointSquad, [privateOffense, privateRanger, privateHealer])
var spawner

export function loop () {
  if (!spawner) spawner = getObjectsByPrototype(StructureSpawn)[0]
  // if(!moverBrain) moverBrain = new binaryBrain(privateMover.brain);
  if (movers.status !== FULL) {
    var spawnedMover = spawnSquad(movers, spawner)
    if (spawnedMover) {
    // var newBrain = Object.create(moverBrain);
    // spawnedMover.brain = newBrain.treeMap;
    }
  } else if (privateThreePointSquad.status !== FULL) {
    var spawnedThreePoint = spawnSquad(privateThreePointSquad, spawner)
    if (spawnedThreePoint) {
      if (spawnedThreePoint.targetToFollow) {
        if (spawnedThreePoint.body[0] === HEAL) spawnedThreePoint.targetToFollow = privateThreePointSquad.units[1].creep
        else spawnedThreePoint.targetToFollow = privateThreePointSquad.units[0].creep
      // console.log(privateThreePointSquad.units);
      }
    // var newBrain = new binaryBrain(spawnedThreePoint.behaviors);
    // spawnedMover.brain = newBrain.treeMap;
    }
  }

  if (movers.units.length > 0) movers.act()
  if (privateThreePointSquad.units.length > 0) privateThreePointSquad.act()
  console.log(getCpuTime())
}
