import { getDateDiffSeconds } from './getDateDiff';

describe('getDateDiffSeconds',() => {
  it('returns difference between dates in seconds', () => {
    expect(getDateDiffSeconds(
      new Date('2022-02-12T02:58:59.598+00:00'),
      new Date('2022-02-12T02:59:06.598+00:00'),
    )).toBe(7);
  });
})
