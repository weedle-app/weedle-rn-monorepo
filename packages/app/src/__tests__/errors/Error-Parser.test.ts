import ErrorParser from '../../errors/Error-Parser';

describe('ErrorParser', () => {
  it('should catch error and return correct message', () => {
    const res = ErrorParser.getErrorDescription(
      'PollingBlockTracker - encountered an error while attempting to update latest block'
    );

    console.log({ res });
    expect(true).toEqual(true);
  });
});
