import { getObjectsByPrototype, createConstructionSite, findClosestByPath } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source, ConstructionSite } from '/game/prototypes';
import {RESOURCE_ENERGY, ERR_NOT_IN_RANGE } from '/game/constants';
import { } from '/arena';



export function squadCenter(squad)
{
  var tempX = 0;
  var tempY = 0;
  squad.currentRoles?.forEach((role, i) => {
    tempX += role.creep.x;
    tempY += role.creep.y;
  });
  tempX = Math.ceil(tempX/squad.currentRoles.length);
  tempY = Math.ceil(tempY/squad.currentRoles.length);

  return {x:tempX, y:tempY};
}

export function closestCreepToSquad(squad, creepArray)
{
  return findClosestByPath(squadCenter(squad), creepArray);
}
