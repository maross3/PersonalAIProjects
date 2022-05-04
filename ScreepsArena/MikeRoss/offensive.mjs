import { getObjectsByPrototype, findClosestByRange } from 'game/utils'
import { StructureSpawn, Creep } from 'game/prototypes'
import { ERR_NOT_IN_RANGE } from 'game/constants'
import { COMBAT } from './global'
import { followTarget } from './defensive'

export function attack (creepSelf, creepTarget) {
  if (creepSelf.attack(creepTarget) === ERR_NOT_IN_RANGE) creepSelf.moveTo(creepTarget)
}

export function genericSupport () {
  if (!this.healTarget) this.damagedCreeps = this.squad.units.filter(u => u.creep.hits < u.creep.hitsMax * 0.75)

  if (this.damagedCreeps) {
    this.healTarget = this.damagedCreeps[0]
  }
  if (this.healTarget) {
    if (this.creep.rangedHeal(this.healTarget) === ERR_NOT_IN_RANGE) this.creep.moveTo(this.healTarget)
    else if (this.creep.hits < this.creep.hitsMax * 0.75) this.creep.heal(this.creep)
    else this.brain = followTarget
  }
}

export function genericRangedAttack () {
  if (!this.target) this.brain = followTarget
  if (this.creep.rangedAttack(this.target) === ERR_NOT_IN_RANGE) this.creep.moveTo(this.target)
}

export function attackEnemyBase () {
  if (!this.enemySpawner) this.enemySpawner = getObjectsByPrototype(StructureSpawn).find(s => !s.my)
  if (this.creep.hits < this.creep.hitsMax) {
    this.status = COMBAT
    this.target = findClosestByRange(this.creep, getObjectsByPrototype(Creep).filter(c => !c.my))

    this.squad.units.forEach(unit => {
      unit.target = this.target
      unit.brain = unit.handleCombat
    })
  }
  if (this.creep.attack(this.enemySpawner) === 0) {
    this.status = COMBAT
    this.target = this.enemySpawner

    this.squad.units.forEach(unit => {
      unit.target = this.enemySpawner
      unit.brain = unit.handleCombat
    })
  }
  if (this.creep.attack(this.enemySpawner) === ERR_NOT_IN_RANGE) this.creep.moveTo(this.enemySpawner)
}
