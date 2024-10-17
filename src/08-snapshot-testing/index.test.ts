import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const input = [1, 2, 3];
    const expected = {
      next: {
        next: {
          next: {
            next: null,
            value: null,
          },
          value: 3,
        },
        value: 2,
      },
      value: 1,
    };

    expect(generateLinkedList(input)).toStrictEqual(expected);
  });

  test('should generate linked list from values 2', () => {
    const input = [1, 2, 3];
    const linkedList = generateLinkedList(input);

    expect(linkedList).toMatchSnapshot();
  });
});
