import checkLength from './checkLength';

test('returns an array of options of the correct length', () =>
    expect(
        checkLength(
            [
                [0, 0],
                [0, 1],
                [0, 3],
            ],
            2
        )
    ).toEqual([
        [0, 0],
        [0, 1],
    ]));

test('returns an array of options of the correct length', () =>
    expect(
        checkLength(
            [
                [0, 0],
                [0, 1],
                [0, 2],
                [0, 3],
                [0, 4],
            ],
            5
        )
    ).toEqual([
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
    ]));
