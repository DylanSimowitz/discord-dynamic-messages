import { IDynamicMessageConfig } from '../interfaces/IDynamicMessageConfig';

export const throwError = (config: IDynamicMessageConfig, msg: string) => {
  const err = new Error(msg);
  if (config.volatile) {
    throw err;
  } else {
    config.onError(err);
  }
};
