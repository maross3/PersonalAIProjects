import { getObjectsByPrototype, getTicks, findInRange, createConstructionSite, findClosestByPath, findClosestByRange } from '/game/utils';
import { Creep, StructureSpawn, StructureContainer, Source, StructureExtension, ConstructionSite } from '/game/prototypes';
import {RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY, MOVE, ATTACK, ERR_NOT_ENOUGH_RESOURCES, ERR_INVALID_TARGET } from '/game/constants';
import { } from '/arena';
// ========================================
//    *****iterative traversal*****
// ========================================
function getPreOrder(root){ // PRE order

  if(!root) return [];
  if(!root.left && !root.right) return [root.val];

  var stack = [root];
  var result = [];

  while(typeof root !== 'undefined'){
      root = stack.pop();

      if(root)
      {
          result.push(root);

          if(root.right) stack.push(root.right);
          if(root.left) stack.push(root.left);
      }
  }

  return result;
}

function getInOrder(root){ // IN order
  var stack = [];
  var result = [];

  var curNode = root;
  while(curNode || stack.length > 0){
    while(curNode){
      stack.push(curNode);
      curNode = curNode.left;
  }
    curNode = stack.pop();
    result.push(curNode.val);
    curNode = curNode.right;
  }
  return result;
}

function getPostOrder(root){  // POST order
  if(!root) return [];

  var stack = [root];
  var result = [];

  while(stack.length > 0){
      root = stack.pop();
      result.unshift(root.val);

      if(root.left) stack.push(root.left);
      if(root.right) stack.push(root.right);
  }
  return result;
}

function getOrderedLevels(root){ // LEVEL order
  var result = [];
  var stack = [root];

  while(stack.length > 0){
    var level = [];
    var subArr = [];

    for(let node of stack){
      if(node){
        subArr.push(node.val);
        level.push(node.left, node.right);
      }
    }

    if(subArr.length > 0) result.push(subArr);
    stack = level;
  }
  return result;
}

// ========================================
//     *****recursive traversal*****
// ========================================
function getRecursivePreOrder(root){ // PRE order
  var stack = [];
  recursivePreOrderHelper(root, stack);
  return stack;
}

function recursivePreOrderHelper(root, stck){ // PRE order helper
  if(!root) return;
  stck.push(root.val);
  recursivePreOrderHelper(root.left, stck);
  recursivePreOrderHelper(root.right, stck);
}

function getRecursiveInOrder(root){ // IN order
  var stack = [];
  recursiveInOrderHelper(root, stack);
  return stack;
}

function recursiveInOrderHelper(root, stck){ // IN order helper
    if(!root) return;
    recursiveInOrderHelper(root.left, stck);
    stck.push(root.val);
    recursiveInOrderHelper(root.right, stck);
}

function getRecursivePostOrder(root){ //POST order
  stack = [];
  recursivePostOrderHelper(root, stack);
  return stack;
}

function recursivePostOrderHelper(root, stck) { //POST order helper
  if(!root) return;
  recursivePostOrderHelper(root.left, stack);
  recursivePostOrderHelper(root.right, stack);
  stack.push(root.val);
}

var levels;
function getRecursiveLevelOrder(root){ // LEVEL order
    levels = [];
    if(!root) return levels;
    recursiveLevelOrderHelper(root, 0);
    return levels;
}

function recursiveLevelOrderHelper(root, level){ // LEVEL order helper
  if(levels.length == level)
    levels.push([]);

  levels[level].push(root.val);
  level++;

  if(root.left)
    recursiveLevelOrderHelper(root.left, level);

  if(root.right)
    recursiveLevelOrderHelper(root.right, level);
}


// TODO: clean this up
class bnode {

    static behavior;
    static val;

    constructor(val, behavior){
      this.behavior = behavior;
      this.val = val;

      this.left = null;
      this.right = null;
      this.status = null;
  }
}

var root;
var treeRoot;

function createRecursiveTree(arr, root, i) {
    if (i < arr.length) {
        let temp = new bnode(arr[i], arr[i]);
        root = temp;

        root.left = createRecursiveTree(arr, root.left, 2 * i + 1);
        root.right = createRecursiveTree(arr, root.right, 2 * i + 2);
    }
    return root;
}

var orderedTree;
var testTree;

export function testingtesting(){
  if(!orderedTree){
    treeRoot = new bnode(0, 0)
    var testing = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    testTree = createRecursiveTree(testing, treeRoot, 0);
    orderedTree = getRecursiveLevelOrder(testTree);
  }
    console.log(orderedTree);
}
