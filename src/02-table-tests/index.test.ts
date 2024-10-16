import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 4, b: 3, action: Action.Subtract, expected: 1 },
  { a: 5, b: 1, action: Action.Subtract, expected: 4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 5, b: 1, action: Action.Multiply, expected: 5 },
  { a: 4, b: 2, action: Action.Multiply, expected: 8 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 5, b: 1, action: Action.Divide, expected: 5 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 5, b: 1, action: Action.Exponentiate, expected: 5 },
  { a: 5, b: 1, action: 'invalid', expected: null },
  { a: 'a', b: 'b', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  it.each(testCases)(
    'should calculate $a $action $b = $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
