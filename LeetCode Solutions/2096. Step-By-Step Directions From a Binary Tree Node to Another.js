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
 * @param {number} startValue
 * @param {number} destValue
 * @return {string}
 */
 var getDirections = function(root, startValue, destValue) {
    var pathToStartValue = "";
    var pathToDestValue = "";
    
    /* the root will not always have both the startValue and the destValue
    // a child node of root could have startValue and destValue as its children
    // once you find the destValue, you return to your parent "foundDestination", 
    then your parent knows to add the instruction (L or R) to get there, and if startValue is not known, 
    it checks the opposite child. If the opposite child doesn't have startValue, then you return to your parent
    "foundDestination", {current steps to destination}, the next parent will want to prepend the step it took to
    get to destValue, and it does the same logic as before, if startValue is not known, it checks opposite child.
    
    Once the startValue is found on the opposite child (or parent, if parent is the start, don't add any steps),
    the steps to get from startValue to the common parent node can be prepended to the current list of steps
    
    startValue is always going to have a "U" added to its list of steps, until it gets to the common parent of destValue
    */
    
    var constructResult = () => pathToStartValue + pathToDestValue;
    
    var goToNode = (child) => {
        if (child == null) return null;
        if (child.val === startValue) {
            var leftChildResult = goToNode(child.left);
            var rightChildResult = goToNode(child.right);
            
            // if destValue is any one of current child's children, we should return "foundBoth" to our caller
            if (leftChildResult === "foundDest") {
                pathToDestValue = "L" + pathToDestValue;
                return "foundBothAtCommonParent";
            } else if (rightChildResult === "foundDest") {
                pathToDestValue = "R" + pathToDestValue;
                return "foundBothAtCommonParent";
            } else {// destValue must be a child of one of current child's parents
                pathToStartValue += "U";
                return "foundStart";
            }
        } else if (child.val === destValue) {
            // check if start is one of current child's children
            var leftChildResult = goToNode(child.left);
            var rightChildResult = goToNode(child.right);
            if (leftChildResult === "foundStart") return "foundBothAtCommonParent";
            if (rightChildResult === "foundStart") return "foundBothAtCommonParent";
            return "foundDest";
        } else {// child is neither startValue or destValue, so check its children
            var leftChildResult = goToNode(child.left);
            var rightChildResult = goToNode(child.right);
            
            if (leftChildResult === "foundDest") {
                pathToDestValue = "L" + pathToDestValue;// add the direction to destValue before returning to parent
                if (rightChildResult === "foundStart") {
                    return "foundBothAtCommonParent";
                }
                return "foundDest";
            } else if (leftChildResult === "foundBothAtCommonParent") {
                return "foundBothAtCommonParent";
            } else if (leftChildResult === "foundStart") {
                if (rightChildResult === "foundDest") {
                    pathToDestValue = "R" + pathToDestValue;
                    return "foundBothAtCommonParent";
                }
                pathToStartValue += "U";// only add a "U" if we haven't found the common parent yet
                return "foundStart";
            }
            
            if (rightChildResult === "foundDest") {
                pathToDestValue = "R" + pathToDestValue;
                return "foundDest";
            } else if (rightChildResult === "foundStart") {
                pathToStartValue += "U";
                return "foundStart";
            }
            
            if (rightChildResult === "foundBothAtCommonParent") return "foundBothAtCommonParent";
            
            return null; // both children must be null, or their children don't have startValue or destValue
        }
    };
    
    goToNode(root);
    return constructResult();
};


/*

Note, I failed with these inputs:

Input:
[7,8,3,1,null,4,5,6,null,null,null,null,null,null,2]
7
5
Output:
"U"
Expected:
"RR"

Input:
[1,3,8,7,null,4,5,6,null,null,null,null,null,null,2]
2
1
Output:
"U"
Expected:
"UUUU"


[5,1,2,3,null,6,4]
3
6
[2,1]
2
1
[2, 1, null, 3]
2
3
[2, 1, null, 3]
3
2
[7,8,3,1,null,4,5,6,null,null,null,null,null,null,2]
7
5
[1,3,8,7,null,4,5,6,null,null,null,null,null,null,2]
2
1

Accepted Submission Results:

Runtime: 306 ms, faster than 88.39% of JavaScript online submissions for Step-By-Step Directions From a Binary Tree Node to Another.
Memory Usage: 109.6 MB, less than 59.35% of JavaScript online submissions for Step-By-Step Directions From a Binary Tree Node to Another.
*/