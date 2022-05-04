import { getObjectsByPrototype, getRange, findClosestByPath, findClosestByRange } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source, ConstructionSite } from '/game/prototypes';
import { searchPath } from 'game/path-finder';
// import { RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE, ATTACK, TOUGH, HEAL, RANGED_ATTACK } from '/game/constants';
import { getTicks } from 'game'
import { Visual } from '/game/visual';

//import * as Tools from '../Tools/tools'


export class Role {

  static roleType;
  static creep;
  static bodyMakeUp;

  static act;
  static ideal;
  static retreat;
  static move;


  constructor(bodyMakeUp){
    this.bodyMakeUp = bodyMakeUp;
    this.creep = "none";
  }



  get position(){
    if(this.creep == "none") return undefined;
    return {x:this.creep.x, y:this.creep.y}
  }


  indexesOfCreepsMatchingRoleBody(creepArray)
  {
    var indexes = [];
    creepArray.forEach((creep, creepIndex) =>{
      if(typeof creep.id !== 'undefined'){
        if(!creep.bodyMakeUp) creep.bodyMakeUp = this.getCreepBody(creep);
        if(this.arraysMatch(creep.bodyMakeUp, this.bodyMakeUp))
          indexes.push(creepIndex);
      }
    });
    return indexes;
  }
  getCreepBody(creep){
    return this.pluck(creep.body, "type");
  }
  pluck(arr, key){
    return arr.map(i => i[key]);
  }
  arraysMatch(array1, array2){
    if(array1.length != array2.length)
      return false;

    var array1Sorted = array1.sort();
    var array2Sorted = array2.sort();

    array1Sorted.forEach((item, i) =>{
      if(item != array2Sorted[i])
        return false;
    });
    return true;
  }


  debugRole()
  {
    var str =
    `
    ---------- debugRole -------------
    Not Set Up!
    ----------------------------------`
    console.log(str);
    return str;
  }

}
