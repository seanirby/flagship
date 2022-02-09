import { ComposableLens, createLens, ILens } from '@brandingbrand/standard-lens';
import { map } from 'rxjs/operators';
import type { ActionSpecifier, AnyAction } from '../action-bus';
import type { Effect, SourcesList } from '../store/store.types';
import { createAsyncActionCreators } from './async.actions';
import { makeAsyncEffect } from './async.effect';
import {
  createCombinedReducer,
  createIdleState,
  createLensedReducers,
  createReducers,
} from './async.reducer';
import { createSelectors } from './async.selectors';
import type { AsyncAdaptor, AsyncState, CreateAsyncEffectOptions } from './async.types';

export type AsyncAdaptorOptions<ActionKey extends string, Payload, FailPayload, Structure> = {
  emitSource?: string | symbol;
  listenToSources?: SourcesList;
  actionKey: ActionKey;
  lens?: ILens<Structure, AsyncState<Payload, FailPayload>>;
};

export const createAsyncAdaptor = <
  ActionKey extends string,
  Payload,
  FailPayload,
  Structure = AsyncState<Payload, FailPayload>
>(
  options: AsyncAdaptorOptions<ActionKey, Payload, FailPayload, Structure>
): AsyncAdaptor<ActionKey, Payload, FailPayload, Structure> => {
  const payloadLens = createLens<AsyncState<Payload, FailPayload>>().fromPath('payload');
  const structureLens =
    options.lens ??
    (createLens<Structure>().fromPath() as unknown as ILens<
      Structure,
      AsyncState<Payload, FailPayload>
    >);
  const actionCreators = createAsyncActionCreators<ActionKey, Payload, FailPayload>(
    options.actionKey,
    options.emitSource
  );
  const reducers = createReducers<Payload, FailPayload>();
  const lensedReducers = createLensedReducers<Payload, FailPayload, Structure>(structureLens);
  const combinedReducer = createCombinedReducer(actionCreators, structureLens);
  const selectors = createSelectors(structureLens);
  const createState = (initialPayload: Payload): AsyncState<Payload, FailPayload> =>
    createIdleState(initialPayload);
  const createEffect = <
    DesiredActionSpecifier extends
      | ActionSpecifier<string, string | undefined, Params>
      | AnyAction<Params>,
    Params extends unknown[],
    CallbackResult = Payload,
    FailedCallbackResult = FailPayload
  >(
    effectOptions: CreateAsyncEffectOptions<
      DesiredActionSpecifier,
      Params,
      CallbackResult,
      Payload,
      FailedCallbackResult,
      FailPayload
    >
  ): Effect<Structure> => {
    const effect = makeAsyncEffect(actionCreators)(effectOptions);
    return (action$, state$) => effect(action$, state$.pipe(map(structureLens.get)));
  };
  const withLens = <OuterStructure>(lens: ILens<OuterStructure, Structure>) =>
    createAsyncAdaptor<ActionKey, Payload, FailPayload, OuterStructure>({
      ...options,
      lens: new ComposableLens(structureLens).withOuterLens(lens),
    });

  return {
    createState,
    actionCreators,
    combinedReducer,
    reducers,
    lensedReducers,
    selectors,
    createEffect,
    payloadLens,
    withLens,
  };
};