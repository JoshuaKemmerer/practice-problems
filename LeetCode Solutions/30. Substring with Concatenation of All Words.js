/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 * 
 * Time Complexity
 */
 var findSubstring = function(s, words) {
    var lengthOfWord = 0;
    var twc = {}; // table of word counts
    
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        lengthOfWord = word.length;
        if (twc.hasOwnProperty(word)) {
            twc[word] = twc[word] + 1;
        } else {
            twc[word] = 1;
        }
    }
    
    var counter = Object.keys(twc).length;
    var lengthOfWordsConcatenated = words.length * lengthOfWord;
    var validIndices = [];
    
    var left = 0;
    var right = lengthOfWordsConcatenated - 1;
    while (right < s.length) {
        var travelingL = left;
        var newTwc = {...twc };
        var newCounter = counter;
        
        for (var i = 0; i < words.length; i++) {
            var word = s.substring(travelingL, travelingL + lengthOfWord);
            
            if (newTwc.hasOwnProperty(word)) {
                newTwc[word] = newTwc[word] - 1;
                
                if (newTwc[word] === 0) {
                    newCounter -= 1;
                }
            } else {
                break;
            }
            
            travelingL += lengthOfWord;
        }
        
        if (newCounter === 0) {
            validIndices.push(left);
        }
        
        left += 1;
        right += 1;
    }
    
    return validIndices;
};