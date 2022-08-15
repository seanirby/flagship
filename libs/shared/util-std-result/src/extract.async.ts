import type { MaybePromise } from '@brandingbrand/standard-types';

import type { Result } from './result';
import { isOk } from './result';

export const extractAsync =
  <OkType, FailureType, Output>(
    onOk: (input: OkType) => MaybePromise<Output>,
    onFail: (input: FailureType) => MaybePromise<Output>
  ) =>
  async (input: MaybePromise<Result<OkType, FailureType>>): Promise<Output> => {
    const awaitedInput = await input;
    if (isOk(awaitedInput)) {
      return onOk(awaitedInput.ok);
    }
    return onFail(awaitedInput.failure);
  };
