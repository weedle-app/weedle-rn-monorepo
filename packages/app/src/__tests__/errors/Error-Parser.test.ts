import ErrorParser from '../../errors/Error-Parser';

const errorList = {
  0: {
    message:
      'Could not connect to the network url and chainId you provided, please check the network is reachable.',
    eventName: 'wdl:network:error',
    code: 0,
  },
};

describe('ErrorParser', () => {
  it('should catch error and return correct message', () => {
    const res = ErrorParser.getErrorDescription(
      'PollingBlockTracker - encountered an error while attempting to update latest block'
    );

    expect(res).toMatchObject({
      message: errorList[0].message,
      eventName: errorList[0].eventName,
    });
  });
  it('should return null when the error does not exist', () => {
    const res = ErrorParser.getErrorDescription('Some Error');

    expect(res).toBeNull();
  });
  it('should return null if error message does not exactly match errors being watched', () => {
    const res = ErrorParser.getErrorDescription(
      'encountered an error while attempting to update latest block'
    );

    expect(res).toBeNull();
  });
});
