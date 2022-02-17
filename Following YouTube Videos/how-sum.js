const howSum = (targetSum, numbers, memo = {}) => {
  if (targetSum in memo) return memo[targetSum];
  if (targetSum === 0) return [];
  if (targetSum < 0) return null;

  for (let num of numbers) {
    var potentialSum = howSum(targetSum - num, numbers, memo);

    if (potentialSum !== null) {
      potentialSum.push(num);
      memo[targetSum] = potentialSum;
      return potentialSum;
    }
  }

  memo[targetSum] = null;
  return null;
};

console.log(howSum(7, [2, 3]));// expect [2, 2, 3]
console.log(howSum(7, [5, 3, 4, 7]));// expect [3, 4]!, or [7]
console.log(howSum(7, [2, 4]));// expect null
console.log(howSum(8, [2, 3, 5]));// expect [2, 2, 2, 2], [2, 3, 3], or [3, 5]
console.log(howSum(300, [7, 14]));// expect null
