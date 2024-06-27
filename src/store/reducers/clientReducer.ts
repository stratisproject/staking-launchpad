import { Action, ActionTypes } from '../actions';
import { ClientId } from '../actions/clientActions';

export type clientState = {
  executionClient: ClientId;
  consensusClient: ClientId;
};

const executionClientIds = [
  ClientId.STEREUM,
  ClientId.BESU,
  ClientId.NETHERMIND,
  ClientId.ERIGON,
  ClientId.GETH,
];

const consensusClientIds = [
  ClientId.PRYSM,
  ClientId.LIGHTHOUSE,
  ClientId.NIMBUS,
  ClientId.TEKU,
];

const initialState: clientState = {
  executionClient: executionClientIds[0],
  consensusClient: consensusClientIds[0],
};

export const clientReducer = (
  state: clientState = initialState,
  action: Action
) => {
  if (action.type === ActionTypes.updateClient) {
    if (action.payload.ethClientType === 'execution') {
      return {
        ...state,
        executionClient: action.payload.clientId,
      };
    }

    if (action.payload.ethClientType === 'consensus') {
      return {
        ...state,
        consensusClient: action.payload.clientId,
      };
    }
  }
  return state;
};
