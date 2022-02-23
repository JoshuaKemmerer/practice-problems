# My initial thought is to approach this problem by assuming that the whole first string is a common prefix
# then check the next string, match each character until a difference is found, that's the new common prefix
# if no match for the common prefix is found in some string S, then there is no common prefix, so return ""
# 

class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        commonPrefix = strs[0]
        lengthOfStringList = len(strs)
        
        i = 1
        while i < lengthOfStringList:
            j = 0
            nextString = strs[i]
            lengthOfCommonPrefix = len(commonPrefix)
            lengthOfNextString = len(nextString)
            
            while j < lengthOfCommonPrefix and j < lengthOfNextString:
                if commonPrefix[j] != nextString[j]:
                    if j == 0:
                        return ""
                    commonPrefix = commonPrefix[:j]
                    lengthOfCommonPrefix = len(commonPrefix)
                j += 1
            
            if lengthOfCommonPrefix > lengthOfNextString:
                commonPrefix = nextString
                lengthOfCommonPrefix = len(commonPrefix)
            i += 1
        return commonPrefix