/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 * 
 * Submission Details:
 * 
 * Time Submitted   | Status  | Runtime | Memory  | Language
 * 02/16/2022 14:02 | Accepted| 100 ms  | 44.8 MB | javascript
 * 
 * Time Complexity: O(p + s) or O(s) where s = s.length, because there will always be more s steps than p steps
 * Space Complexity: O(K) where K = # of distinct characters
 */
 var findAnagrams = function(s, p) {
    var left = 0;
    var right = 0;
    // var charsToMatch = p.length;
    var tc = {}; // table of chars to match
    var startIndices = [];
    
    for (var i = 0; i < p.length; i++) {
        var charInP = p[i];
        if (tc.hasOwnProperty(charInP)) {
            tc[charInP] = tc[charInP] + 1;
        } else {
            tc[charInP] = 1;
        }
    }
    
    var counter = Object.keys(tc).length;
    // var charsThatMatch = 0;
    
    
    /**
    Quick example:
    
    s = 'aaab'
    p = 'a'
    tc = { a: 1 }, then counter = 1, if charAtRight = 'b', then we need to increment the counter, if charAtLeft = 'a', then increment the counter in 'tc', because we are losing a match
    
    s = "cbaebabacd"
    p = "abc"
    tc = {a: 1, b: 1, c: 1} counter = 3
    right = 0;
    left = 0;
    
    while (0 < 10):
        while (0 < (0 + 3 = 3)):
            charAtRight = c
            tc = { a:1, b:1, c:0}
            if (tc[c] === 0):
                counter = 2
            right = 1
        while (1 < 3):
            charAtRight = b
            tc = { a:1, b:0, c:0}
            if (tc[b] === 0):
                counter = 1
            right = 2
        while (2 < 3):
            charAtRight = a
            tc = { a:0, b:0, c:0}
            if (tc[a] === 0):
                counter = 0
            right = 3
        // end the while
        
        if (counter == 0):
            startIndices.push(0) // startIndices = [0]
            
        charAtLeft = 'c'
        if (tc[c] exists):
            tc = { a:0, b:0, c:1}
            counter += 1
        else:
            counter -= 1
    */
    while (right < s.length) {
        while (right < (left + p.length)) {
            // move right pointer until the end of the length of p, keep track of which characters were hit
            var charAtRight = s[right];
            if (tc.hasOwnProperty(charAtRight)) {
                tc[charAtRight] = tc[charAtRight] - 1;

                if (tc[charAtRight] === 0) {
                    counter -= 1;
                }
            } else {
                counter += 1;
            }
            
            right += 1;
        }

        // s.substring(left, right) must be an anagram of p if counter === 0
        if (counter === 0) {
            startIndices.push(left);
        }
        
        var charAtLeft = s[left];
        if (tc.hasOwnProperty(charAtLeft)) {
            tc[charAtLeft] = tc[charAtLeft] + 1;

            if (tc[charAtLeft] === 1) {
                counter += 1;
            }
        } else {
            counter -= 1;
        }
        
        left += 1;
    }
    
    return startIndices;
};