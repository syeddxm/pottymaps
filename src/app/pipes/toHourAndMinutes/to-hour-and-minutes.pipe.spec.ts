import { ToHourAndMinutesPipe } from './to-hour-and-minutes.pipe';

describe('ToHourAndMinutesPipe', () => {
  it('create an instance', () => {
    const pipe = new ToHourAndMinutesPipe();
    expect(pipe).toBeTruthy();
  });
});
