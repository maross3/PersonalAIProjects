export class binaryBrain {

  // TODO:
  // convert all root parameters to use this.root
  // create a helper function that executes the tree in the sorted order
  static root;
  static levels;
  static depth;

  constructor(behaviors){
    console.log(behaviors);
    var curNode = new binaryNode(behaviors[0], behaviors[0]);

    this.createRecursiveTree(behaviors, curNode , 0);
    this.getRecursiveLevelOrder();
    this.depth = this.levels.length;
  }

  createRecursiveTree(arr, node, i) { // build tree
      let temp = new binaryNode(arr[i], arr[i]);
      node = temp;

      if(!this.root) this.root = node;
      if (i < arr.length) {
        if(2 * i + 1 < arr.length)
          node.left = this.createRecursiveTree(arr, node.left, 2 * i + 1);

        if(2 * i + 2 < arr.length)
          node.right = this.createRecursiveTree(arr, node.right, 2 * i + 2);
      }
      return node;
  }

// ========================================
//    *****iterative traversal*****
// ========================================
  getPreOrder(root){ // PRE order

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

  getInOrder(root){ // IN order
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

  getPostOrder(root){  // POST order
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

  getOrderedLevels(root){ // LEVEL order
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
  getRecursivePreOrder(root){ // PRE order
    var stack = [];
    recursivePreOrderHelper(root, stack);
    return stack;
  }

  recursivePreOrderHelper(root, stck){ // PRE order helper
    if(!root) return;
    stck.push(root.val);
    recursivePreOrderHelper(root.left, stck);
    recursivePreOrderHelper(root.right, stck);
  }

  getRecursiveInOrder(root){ // IN order
    var stack = [];
    recursiveInOrderHelper(root, stack);
    return stack;
  }

  recursiveInOrderHelper(root, stck){ // IN order helper
      if(!root) return;
      recursiveInOrderHelper(root.left, stck);
      stck.push(root.val);
      recursiveInOrderHelper(root.right, stck);
  }

  getRecursivePostOrder(root){ //POST order
    stack = [];
    recursivePostOrderHelper(root, stack);
    return stack;
  }

  recursivePostOrderHelper(root, stck) { //POST order helper
    if(!root) return;
    recursivePostOrderHelper(root.left, stack);
    recursivePostOrderHelper(root.right, stack);
    stack.push(root.val);
  }


  getRecursiveLevelOrder(){ // LEVEL order
      this.levels = [];
      if(!this.root) return this.levels;
      this.recursiveLevelOrderHelper(this.root, 0);
      return this.levels;
  }

  recursiveLevelOrderHelper(node, level){ // LEVEL order helper
    if(this.levels.length == level)
      this.levels.push([]);

    this.levels[level].push(node);
    level++;

    if(node.left)
      this.recursiveLevelOrderHelper(node.left, level);

    if(node.right)
      this.recursiveLevelOrderHelper(node.right, level);
  }
}

// TODO: clean this up, create a root node class
class binaryNode {

  static behavior;
  static val;

  static left;
  static right;
  static status;

  constructor(val, behavior){
      this.behavior = behavior;
      this.val = val;
  }
}
