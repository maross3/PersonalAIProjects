import { getObjectsByPrototype, getCpuTime } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source } from '/game/prototypes';
import {RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE, ATTACK } from '/game/constants';
import { } from '/arena';
import { harvestFromSource } from './tasks'
var QUEUED = 0;
var ALIVE = 1;

var spawner;


var workerCreep = {
  creep: "none",
  body: [WORK, CARRY, MOVE],
  ratio: [0.5,0.25,0.25],
  squad: baseSquad,
  status: QUEUED,
  act: workerRole
};

var creep1 = Object.create(workerCreep);
var creep2 = Object.create(workerCreep);
var creep3 = Object.create(workerCreep);

function workerRole()
{
  if(!this.spawner) this.spawner = getObjectsByPrototype(StructureSpawn)[0];
  if(!this.energySource) this.energySource = getObjectsByPrototype(Source)[0];
  if(!this.creep.store) return;

   if(this.creep.store.getFreeCapacity(RESOURCE_ENERGY)) harvestFromSource(this.creep, this.energySource); // makesure this.creep is calling on individual creeps
   else if(this.creep.transfer(this.spawner, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) this.creep.moveTo(this.spawner);
};

function attackRole(){

}

function defaultSquadRole() {
  this.units.forEach((unit, i) => {
    unit.act();
  });
}

var baseSquad = {
  units: [],
  queuedUnits: [creep1, creep2, creep3],
  numberOfUnits: 0,
  act: defaultSquadRole
};

function getBodyParts(body, ratio, total){
  var temp = [];
  for(let i = 0; i < body.length; i++){
    for(let j =0; j < ratio[i] * total; j++)
      temp.push(body[i]);
  }
  return temp;
}

function spawnSquad(sqd){
  var creepToSpawn = sqd.queuedUnits[sqd.numberOfUnits];

  // calculate body parts energy to spawner curEnergy condition
  var creepMakeUp = getBodyParts(creepToSpawn.body, creepToSpawn.ratio, 5)
  var spawnedCreep = spawner.spawnCreep(creepMakeUp).object;

  if(spawnedCreep){
    creepToSpawn.creep = spawnedCreep;
    creepToSpawn.status = ALIVE;
    sqd.units[baseSquad.numberOfUnits] = sqd.queuedUnits[sqd.numberOfUnits];
    sqd.numberOfUnits += 1;

    // empty variable for curEnergy spawn condition
  }
}


export function loop() {
  if(!spawner) spawner = getObjectsByPrototype(StructureSpawn)[0];




  if(baseSquad.numberOfUnits < 3) {
    spawnSquad(baseSquad);
    }
    // if x squad.numberOfUnits < z) spawn x squad

  if(baseSquad.numberOfUnits > 0) baseSquad.act();


  console.log(getCpuTime());
  // DoWork() {

  // }
}
