import { } from 'game/constants'
import { StructureSpawn } from 'game/prototypes'
import { getObjectsByPrototype, getCpuTime } from 'game/utils'

import { FULL } from './global'
import {
  primitiveBrainSquad, primitiveThreePointSquad, privateMover, privateHealer,
  privateOffense, privateRanger, primitiveDefender,
  defenderSquad, bomber
} from './barracks'

import { createSquad, spawnSquad } from './creepFactory'

// just about ready for my first arena :)

// next up, create a squad/unit standard for factory
var squadsToSpawn = []
var movers = createSquad(primitiveBrainSquad, [privateMover, privateMover])
squadsToSpawn.push(movers)
var defenders = createSquad(defenderSquad, [primitiveDefender, primitiveDefender])
squadsToSpawn.push(defenders)
var secondLineDefenders = createSquad(defenderSquad, [primitiveDefender, primitiveDefender])
squadsToSpawn.push(secondLineDefenders)
var privateThreePointSquad = createSquad(primitiveThreePointSquad, [privateOffense, privateRanger, privateHealer])
squadsToSpawn.push(privateThreePointSquad)
var secondThreePointSquad = createSquad(primitiveThreePointSquad, [privateOffense, privateRanger, privateHealer])
squadsToSpawn.push(secondThreePointSquad)
var thirdThreePointSquad = createSquad(primitiveThreePointSquad, [privateOffense, privateRanger, privateHealer])
squadsToSpawn.push(thirdThreePointSquad)

var bomberSquad = createSquad(primitiveBrainSquad, [bomber, bomber, bomber, bomber, bomber, bomber, bomber])
squadsToSpawn.push(bomberSquad)

var spawner
var spawnTimer = 3
var spawnDelay = 3
export function loop () {
  spawnTimer++
  if (!spawner) spawner = getObjectsByPrototype(StructureSpawn).find(s => s.my)

  if (spawnTimer > spawnDelay && squadsToSpawn.length > 0) {
    var spawnedCreep = spawnSquad(squadsToSpawn[0], spawner)
    if (squadsToSpawn[0].status === FULL) {
      squadsToSpawn.shift()
      squadsToSpawn[0].setup()
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
  if (bomberSquad.units.length > 0) bomberSquad.act()
  console.log(getCpuTime())
}
