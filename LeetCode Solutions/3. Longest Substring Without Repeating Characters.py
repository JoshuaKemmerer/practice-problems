"""
Solution Discussion

1. Create a dictionary of reached characters, and store the last index of that found character
1. Go through each character
    1. If it has been found before, set the current minimum index to max(index value found in the dictionary of reached characters + 1, current minimum index). No need to recalculate the current longest count since we know it's not growing
    1. If character not found, recalculate the length of the current substring:
        -> index of current - index of current minimum index = currentLongestCount
    1. Set the outputLongestCount = max(outputLongestCount, currentLongestCount)

"""
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        if len(s) == 0:
            return 0
        if len(s) == 1:
            return 1
        sAsList = list(s)
        currentMinIndex = 0
        outputLongestCount = 1
        found = {} # store the found characters as the key, and the last found index as the value
        
        for i, char in enumerate(sAsList):
            if char in found:
                # if the index of the matched character is before the current min index, we don't need to update the current min index
                if found[char] >= currentMinIndex:
                    currentMinIndex = max(found[char] + 1, currentMinIndex)
            currentLongestCount = i - currentMinIndex + 1
            if i != 0:
                outputLongestCount = max(outputLongestCount, currentLongestCount)
            found[char] = i
        return outputLongestCount
    
"""
Solution Completion Discussion:

Issues:
- Had an off-by-one mistake in calculating currentLongestCount, I did `i - currentMinIndex` at first
- Test case for "tmmzuxt" was wrong, output was 4, expected 5
- Took me a while to figure out that `currentMinIndex` should only be updated when the char was 
    previously found AND the index there is greater than or equal to the current value of `currentMinIndex`
- And I moved the line `currentLongestCount = i - currentMinIndex + 1` to outside of the `if char in found` block
"""