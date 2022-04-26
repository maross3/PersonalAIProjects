
// ========================================
//    *****iterative traversal*****
// ========================================
function getPreOrder(root){

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
} // PRE order // PRE order

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

function getPostOrder(root){
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
} // POST order

function getOrderedLevels(root){
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
} // LEVEL order

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

function getRecursivePostOrder(root){
  stack = [];
  recursivePostOrderHelper(root, stack);
  return stack;
} //POST order

function recursivePostOrderHelper(root, stck) {
  if(!root) return;
  recursivePostOrderHelper(root.left, stack);
  recursivePostOrderHelper(root.right, stack);
  stack.push(root.val);
} //POST order helper // POST order helper

function getRecursiveLevelOrder(root){ // LEVEL order
    this.levels = [];
    if(!root) return levels;
    recursiveLevelOrderHelper(root, 0);
    return levels;
}

function recursiveLevelOrderHelper(root, level){
  if(this.levels.length == level)
    this.levels.push([]);

  this.levels[level].push(root.val);
  level++;

  if(root.left)
    recursiveLevelOrderHelper(root.left, level);

  if(root.right)
    recursiveLevelOrderHelper(root.right, level);
} // LEVEL order helper

var node = {
  left: 0,
  right: 0,
  status: FAILURE,
  behavior: 0
}
