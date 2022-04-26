
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

function getRecursiveLevelOrder(root){ // LEVEL order
    this.levels = [];
    if(!root) return levels;
    recursiveLevelOrderHelper(root, 0);
    return levels;
}

function recursiveLevelOrderHelper(root, level){ // LEVEL order helper
  if(this.levels.length == level)
    this.levels.push([]);

  this.levels[level].push(root.val);
  level++;

  if(root.left)
    recursiveLevelOrderHelper(root.left, level);

  if(root.right)
    recursiveLevelOrderHelper(root.right, level);
}

var node = {
  left: 0,
  right: 0,
  status: FAILURE,
  behavior: 0
}
