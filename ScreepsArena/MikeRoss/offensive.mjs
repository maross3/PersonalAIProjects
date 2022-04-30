import { getObjectsByPrototype } from 'game/utils'
import { StructureSpawn } from 'game/prototypes'
import { ERR_NOT_IN_RANGE } from 'game/constants'
import { COMBAT } from './global'
import { followTarget } from './defensive'

export function attack (creepSelf, creepTarget) {
  if (creepSelf.attack(creepTarget) === ERR_NOT_IN_RANGE) creepSelf.moveTo(creepTarget)
}

export function genericSupport () {
  var damagedCreeps = this.squad.units.filter(u => u.creep.hits < u.creep.hitsMax * 0.75)

  if (damagedCreeps) this.creep.rangedHeal(damagedCreeps[0])
  else if (this.creep.hits < this.creep.hitsMax * 0.75) this.creep.heal(this.creep)
  else this.brain = followTarget
}

export function genericRangedAttack () {
  if (!this.target) this.brain = followTarget
  this.creep.rangedAttack(this.target)
}

export function attackEnemyBase () {
  if (!this.enemySpawner) this.enemySpawner = getObjectsByPrototype(StructureSpawn).find(s => !s.my)

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
