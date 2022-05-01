import { Creep } from 'game/prototypes'
import { getObjectsByPrototype, getRange, findClosestByRange, getTicks } from 'game/utils'
import { ERR_NOT_IN_RANGE } from 'game/constants'
import { COMBAT } from './global'
import { calculateAngle, shortDistanceDirection, calculateDistance } from './mathUtils'

// needs to be tested in the arena
export function selfDefense (self) {
  var enemies = getObjectsByPrototype(Creep).filter(c => !c.my)
  var closestEnemy = findClosestByRange(self, enemies)
  if (closestEnemy && getRange(closestEnemy, self) <= 10) {
    this.creep.status = COMBAT
    return closestEnemy
  }
  return false
}

/*
// TODO
export function patrolBase (unit) {

}
*/

// very basic path finding to cut resources
export function followTarget () {
  if (!this.creep) return
  var distance = calculateDistance(this.creep, this.targetToFollow)
  if (distance < 2) return
  var angle = calculateAngle(this.creep, this.targetToFollow)

  if (distance >= 2 && distance <= 10) {
    this.creep.move(shortDistanceDirection(angle))
  } else {
    this.creep.moveTo(this.targetToFollow)
  }
}

export function guardBaseChokePoints () {
  if (!this.creep) return

  if (!this.top) {
    if (this.squad.units.length === 1) this.top = true
    else this.top = false
  }

  if (this.top === false) {
    if (this.creep.y !== 10) this.creep.moveTo({ x: 5, y: 10 })
  } else if (this.creep.y !== 80) this.creep.moveTo({ x: 5, y: 80 })

  if (getTicks() % 10 === 0) var enemy = selfDefense(this.creep)
  if (enemy) {
    if (this.creep.attack(enemy) === ERR_NOT_IN_RANGE) this.creep.moveTo(enemy)
  }
}
