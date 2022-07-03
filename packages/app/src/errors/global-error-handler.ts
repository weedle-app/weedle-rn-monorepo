import { DeviceEventEmitter } from 'react-native';

import ErrorParser from './Error-Parser';

const globalAny: any = global;

const defaultErrorHandler = globalAny.ErrorUtils.getGlobalHandler();

const getGlobalErrorHandler = () => {
  globalAny.ErrorUtils.setGlobalHandler((error: Error, isFatal: boolean) => {
    const errorMsg = ErrorParser.getErrorDescription(error.message);

    if (errorMsg) {
      const { eventName, ...rest } = errorMsg;
      DeviceEventEmitter.emit(eventName, rest);
    } else {
      defaultErrorHandler(error, isFatal);
    }
  });
};

export default getGlobalErrorHandler;
