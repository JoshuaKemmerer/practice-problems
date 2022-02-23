/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
 var binaryTreePaths = function(root) {
    if (root.left == null && root.right == null) return [root.val.toString()];
    
    var paths = [];
    
    var parentPath = root.val.toString();
    
    var goToChildAndAddPathToLeaves = (child, currentPath) => {
        var currentPath = `${currentPath}->${child.val.toString()}`;
        if (child.left == null && child.right == null) paths.push(currentPath);
        else if (child.left != null) goToChildAndAddPathToLeaves(child.left, currentPath);
        if (child.right != null) goToChildAndAddPathToLeaves(child.right, currentPath);
    };
    
    if (root.left != null) goToChildAndAddPathToLeaves(root.left, parentPath);
    if (root.right != null) goToChildAndAddPathToLeaves(root.right, parentPath);
    
    return paths;
};


/*

Submission results:
Runtime: 101 ms, faster than 44.37% of JavaScript online submissions for Binary Tree Paths.
Memory Usage: 44.1 MB, less than 15.14% of JavaScript online submissions for Binary Tree Paths.

*/