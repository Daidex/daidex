import { cloneDeep, forEach, set } from 'lodash';

export const createAction = actionType => (payload = null) => (payload
  ? {
    type: actionType,
    payload,
  }
  : {
    type: actionType,
  });

export const setToState = (state, nextValue) => {
  const nextState = cloneDeep(state);
  forEach(nextValue, (value, key) => {
    set(nextState, key, value);
  });
  return nextState;
};

export const isMetaMask = () => {
  return (
    typeof window.web3 !== 'undefined' && window.web3.currentProvider.isMetaMask
  )
}
