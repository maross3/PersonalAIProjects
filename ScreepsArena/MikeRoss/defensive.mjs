import { Creep } from 'game/prototypes'
import { getObjectsByPrototype, getRange, findClosestByRange } from 'game/utils'
import { ERR_NOT_IN_RANGE } from 'game/constants'
import { COMBAT } from './global'
import { calculateAngle, shortDistanceDirection, calculateDistance } from './mathUtils'

// needs to be tested in the arena
export function selfDefense (self) {
  var enemies = getObjectsByPrototype(Creep).filter(c => !c.my)
  var closestEnemy = findClosestByRange(self.creep, enemies)

  if (closestEnemy && getRange(closestEnemy, self.creep) <= 35) {
    self.status = COMBAT
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
    if (this.creep.y !== 10) this.creep.moveTo({ x: this.creep.x, y: 10 })
  } else if (this.creep.y !== 80) this.creep.moveTo({ x: this.creep.x, y: 80 })

  this.enemy = selfDefense(this)

  if (this.enemy) {
    if (this.creep.attack(this.enemy) === ERR_NOT_IN_RANGE) this.creep.moveTo(this.enemy)
  }
}
