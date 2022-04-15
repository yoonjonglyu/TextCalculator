function evaluate(expression: string): number {
  // 여기에 코드를 작성해주세요.
  // eval(expression)
  const nums = [];
  const exps = [];
  getExpArr(expression).forEach((item) => {
    typeof item === 'number' ? nums.push(item) : exps.push(item);
  });
  console.log(nums, exps);
  return calculate('+', 1, 2);
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
  const exps = {
    '+': true,
    '-': true,
    '*': true,
    '/': true,
    '(': true,
    ')': true,
  };

  const state = [...expression]
    .filter((char) => char !== ' ')
    .reduce((state, item) => {
      if (exps[item]) {
        if (item === '(') {
          // 열린 괄호처리
          result.push(item);
        } else if (item === ')') {
          // 닫힌 괄호 처리
          if (state.length > 0) result.push(parseFloat(state.join('')));
          result.push(item);
          state = [];
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

evaluate('1 + 2 * 3'); // 7
evaluate('(1 + 2) * 3'); // 9
evaluate('1 / 32.5 + 167 * (3498 - 1155) * -721 * (4885 - 1) / 0.5'); // -2755685654567.969