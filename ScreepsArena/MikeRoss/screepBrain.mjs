
// return valid nodes from root of tree
function getValidNodes(root){

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

var node = {
  left: 0,
  right: 0,
  status: FAILURE,
  behavior: 0
}
