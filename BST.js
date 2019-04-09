'use strict';

class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    //BigO notation: Average case: O(log(n)), worse case (unbalanced tree): O(n)
    //Best case: O(1), empty tree
    // If the tree is empty then this key being inserted is the root node of the tree
    if (this.key === null) {
      this.key = key;
      this.value = value;
    }
    /* If the tree already exists, then start at the root, 
       and compare it to the key you want to insert.
       If the new key is less than the node's key 
       then the new node needs to live in the left-hand branch */
    else if (key < this.key) {
      /* If the existing node does not have a left child, 
           meaning that if the `left` pointer is empty, 
           then we can just instantiate and insert the new node 
           as the left child of that node, passing `this` as the parent */
      if (this.left === null) {
        this.left = new BinarySearchTree(key, value, this);
      }
      /* If the node has an existing left child, 
           then we recursively call the `insert` method 
           so the node is added further down the tree */
      else {
        //key > this.key
        this.left.insert(key, value);
      }
    }
    // Similarly, if the new key is greater than the node's key 
    //  then you do the same thing, but on the right-hand side 
    else {
      if (this.right === null) {
        this.right = new BinarySearchTree(key, value, this);
      }
      else {
        this.right.insert(key, value);
      }
    }
  }
  find(key) {
    //BigO notation: Best: O(1) root key === key Average: O(log(n)) don't have to search
    //all the data Worst: O(n), very unbalanced tree 
    //check if this.key === key
    // If the item is found at the root then return that value
    if (this.key === key) {
      return this.value;
    }
    /* If the item you are looking for is less than the root 
       then follow the left child.
       If there is an existing left child, 
       then recursively check its left and/or right child
       until you find the item */
    else if (key < this.key && this.left) {
      return this.left.find(key);
    }
    /* If the item you are looking for is greater than the root 
       then follow the right child.
       If there is an existing right child, 
       then recursively check its left and/or right child
       until you find the item */
    else if (key > this.key && this.right) {
      return this.right.find(key);
    }
    // You have searched the tree and the item is not in the tree
    else {
      throw new Error('Key Error');
    }
  }
  remove(key) {
    // BigO notation: Best Case: O(1) - the node is the root
    // Average case: O(log(n)) b/c we are dealing w/ BST. Worst Case O(n): We have a very uneven BST
    //3 scenarios: No children, 1 child, 2 children
    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      /* If the node only has a left child, 
           then you replace the node with its left child */
      else if (this.left) {
        this._replaceWith(this.left);
      }
      /* And similarly if the node only has a right child 
           then you replace it with its right child */
      else if (this.right) {
        this._replaceWith(this.right);
      }
      /* If the node has no children then
           simply remove it and any references to it 
           by calling "this._replaceWith(null)" */
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }
  _replaceWith(node) {
    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node;
      }
      else if (this === this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}

function tree(t){
  if(!t){
    return 0;
  }
  return tree(t.left) + t.value + tree(t.right);
}

// Height of a BST

function heightOfBST(bst) {
  // let count = 1;
  // // base case
  // if (bst.key === null) {
  //   return 0;
  // }
  // if (!bst.left && !bst.right) {
  //   return count;
  // }
  // // recursion begin
  // if (bst.left && bst.right) {
  //   return heightOfBST(bst.left, count + 1) > heightOfBST(bst.right, count + 1) ? heightOfBST(bst.left, count + 1) : heightOfBST(bst.right, count + 1);
  // }
  // if (bst.left) {
  //   return heightOfBST(bst.left, count + 1);
  // }
  // if (bst.right) {
  //   return heightOfBST(bst.right, count + 1);
  // }
  let leftHeight = 0;
  let rightHeight = 0;
  if(!bst) {
    return 0;
  }
  else { 
    leftHeight = heightOfBST(bst.left); 
    rightHeight = heightOfBST(bst.right);
    if (leftHeight > rightHeight) {
      return leftHeight + 1;
    } else {
      return rightHeight + 1;
    }
  }
}

// Is it a BST?

// function isBst(bst) {
//   if (!bst.key) {
//     return false;
//   }
//   else {
//     if (bst.key < bst.right.key && bst.key > bst.left.key) {
//       isBst(bst.right);
//       isBst(bst.left);
//     } else {
//       return false;
//     }
//     return true;
//   }
// }

// 3rd largest node

function thirdLargest(bst) {
  // do we have to sort the keys in order and subtract length by 3?
  const results = [];
  if (bst === null) {
    return null;
  } else {
    results.push(bst.key); 
    thirdLargest(bst.left);
    thirdLargest(bst.right);
  }
  return results;
}


function main() {
  const BST = new BinarySearchTree();
  BST.insert(3,3);
  BST.insert(1,1);
  BST.insert(4,4);
  BST.insert(6,6);
  BST.insert(9,9);
  BST.insert(2,2);
  BST.insert(5,5);
  BST.insert(7,7);
  // console.log(BST);
  // console.log(tree(BST));
  // console.log(heightOfBST(BST));
  // console.log(isBst(BST));
  console.log(thirdLargest(BST));
}

main();