class ErrorParser {
  private static errorsToCatch = [
    'PollingBlockTracker - encountered an error while attempting to update latest block',
  ];

  private static errorMessages: Record<
    number,
    { message: string; eventName: string; code: number }
  > = {
    0: {
      message:
        'Could not connect to the network url and chainId you provided, please check the network is reachable.',
      eventName: 'wdl:network:error',
      code: 0,
    },
  };

  static getErrorDescription(errorMessage: string) {
    const errorIndex = this.errorsToCatch.findIndex((partialMsg) =>
      errorMessage.includes(partialMsg)
    );

    if (errorIndex !== -1) {
      return this.errorMessages[errorIndex] || null;
    }

    return null;
  }
}

export default ErrorParser;
