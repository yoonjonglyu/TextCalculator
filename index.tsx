function evaluate(expression: string): number {
  // 여기에 코드를 작성해주세요.
  // eval(expression)
  const nums = [];
  const exps = [];
  getExpArr(expression).forEach((item) => {
    if (typeof item === 'number') {
      nums.push(item);
    } else {
      if (item === '(') {
        exps.push(item);
      } else if (item === ')') {
        while (exps.length > 0) {
          const state = exps.pop();
          if (state === '(') break;

          const numB = nums.pop();
          const numA = nums.pop();
          nums.push(calculate(state, numA, numB));
        }
      } else {
        if (exps.length > 0) {
          const prev = exps.pop();
          if (getOperatorRatio(prev) >= getOperatorRatio(item)) {
            const numB = nums.pop();
            const numA = nums.pop();
            nums.push(calculate(prev, numA, numB));
            exps.push(item);
          } else {
            exps.push(prev, item);
          }
        } else exps.push(item);
      }
    }
  });
  while (exps.length > 0) {
    const numB = nums.pop();
    const numA = nums.pop();
    nums.push(calculate(exps.pop(), numA, numB));
  }

  return nums[0];
}

type Operator = '+' | '-' | '*' | '/';
function calculate(operator: Operator, numA: number, numB: number) {
  switch (operator) {
    case '+':
      return numA + numB;
    case '-':
      return numA - numB;
    case '*':
      return numA * numB;
    case '/':
      return numA / numB;
    default:
      break;
  }
}

function getExpArr(expression: string): Array<string | number> {
  const result = [];

  const state = [...expression]
    .filter((char) => char !== ' ')
    .reduce((state, item) => {
      if (getOperatorRatio(item)) {
        if (item === '(') {
          // 열린 괄호처리
          result.push(item);
        } else if (state.length === 0 && result[result.length - 1] !== ')') {
          // 음수 처리
          state.push(item);
        } else {
          if (state.length > 0) result.push(parseFloat(state.join('')));
          result.push(item);
          state = [];
        }
      } else state.push(item);

      return state;
    }, []);

  if (state.length > 0) result.push(parseFloat(state.join('')));

  return result;
}
function getOperatorRatio(operator: string): number {
  return {
    '+': 2,
    '-': 2,
    '*': 3,
    '/': 3,
    '(': 1,
    ')': 1,
  }[operator];
}

evaluate('1 + 2 * 3'); // 7
evaluate('(1 + 2) * 3'); // 9
evaluate('1 / 32.5 + 167 * (3498 - 1155) * -721 * (4885 - 1) / 0.5'); // -2755685654567.969
