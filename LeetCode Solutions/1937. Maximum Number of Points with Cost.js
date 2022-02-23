/**
 * @param {number[][]} points
 * @return {number}
 */
 var maxPoints = function(points) {
    var maxPoints = 0;
    
    for (var a = 0; a < 1; a++) {
        for (var b = 0; b < points[0].length; b++) {
            maxPoints = Math.max(maxPoints, points[a][b]);
        }
    }
    
    for (var i = 1; i < points.length; i++) {
        for (var j = 0; j < points[0].length; j++) {
            var value = points[i][j];
            
            var maxForCurrentCell = -1;
            for (var k = 0; k < points[0].length; k++) {
                var calculatedValue = value + points[i-1][k] - Math.abs(j - k);
                maxForCurrentCell = Math.max(calculatedValue, maxForCurrentCell);
            }
            points[i][j] = maxForCurrentCell;
            maxPoints = Math.max(maxPoints, maxForCurrentCell);
        }
    }
  
    return maxPoints;
};


/*

If if use Dynamic Programming, I believe i could try to get the max in each row,

The brute-force solution would be to go through the first row, find the max, then:
For the second row, for each cell, find the max (which would be equal to points[i][j] + points[i-1][j1 - jn] - abs(jCurrent - jPrev)), then we could set that calculated max to the current cell we are calculating, and then continue to the next row. Also, keep track of the current max for each row, and once all of the rows are traversed, return the max

The current time complexity for the above solution is:

O(m * n * n) = O(mn^2)

Is there a way to make it O(mn)?

LeetCode Submission Results:

Runtime: 9572 ms, faster than 5.13% of JavaScript online submissions for Maximum Number of Points with Cost.
Memory Usage: 68.9 MB, less than 62.45% of JavaScript online submissions for Maximum Number of Points with Cost
*/