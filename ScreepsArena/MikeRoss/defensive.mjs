import { Creep } from 'game/prototypes'
import { getObjectsByPrototype, getRange, findClosestByRange } from 'game/utils'

import { COMBAT } from './global'
import { calculateAngle, shortDistanceDirection, calculateDistance } from './mathUtils'

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
