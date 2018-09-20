import {
  TOGGLE_LOADING,
  CHANGE_VIEW,
  SET_NETWORK,
  UPDATE_BALANCES,
  UPDATE_ACCOUNT,
  INIT_EXCHANGE,
  SET_MESSAGE_WRAP,
} from 'src/store/actions/appActions'
import { reduce, isUndefined } from 'lodash'
import appStates from 'src/store/states/appStates'
import { setToState } from 'src/utils'

import tokensByNetwork from 'src/store/networks.json'
import tokenName from 'src/store/tokenName.json'

export const initialState = {
  ui: {
    view: appStates.view.connectingWithMetaMask,
    previousView: appStates.view.connectingWithMetaMask,
    loading: false,
    wrap: {
      message: {
        msg: '',
        type: '',
      }
    }
  },
  data: {
    network: {

    },
    wallet: {
      loaded: false,
      balances: {}
    }
  }
}

const allowedNetworks = {
  1: {
    id: 1,
    name: 'Mainnet',
    tokens: tokensByNetwork.Mainnet
  },
  42: {
    id: 42,
    name: 'Kovan',
    tokens: tokensByNetwork.Kovan,
  }
}

const getViewByNetwork = (networkId) => { // eslint-disable-line
  return allowedNetworks[networkId]
    ? appStates.view.exchange
    : appStates.view.metaMaskIsNotMainNet
}

export default function appReducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_LOADING:
      return setToState(state, {
        'ui.loading': !state.ui.isLoading
      })

    case CHANGE_VIEW:
      return setToState(state, {
        'ui.view': action.payload.nextView,
        'ui.previousView': state.ui.view
      })

    case INIT_EXCHANGE:
      return setToState(state, {
        'ui.view': getViewByNetwork(state.data.network.id),
        'ui.previousView': state.ui.view,
        'data.wallet.address': action.payload.address,
      })

    case SET_NETWORK:
      return setToState(state, {
        'data.network': allowedNetworks[action.payload.networkId] || {}
      })

    case UPDATE_ACCOUNT:
      return setToState(state, {
        'data.wallet.address': action.payload.address
      })

    case UPDATE_BALANCES:
      return setToState(state, {
        'data.wallet.balances': {
          ...state.data.wallet.balances,
          ...reduce(action.payload.balances, (result, value, key) => {
            return {
              ...result,
              [key]: {
                symbol: key,
                balance: value.balance,
                name: tokenName[key] || 'Unknown',
                enabled: isUndefined(value.enabled) ? 'loading' : value.enabled,
                value: 0
              }
            }
          }, {})
        }
      })

    case SET_MESSAGE_WRAP:
      return setToState(state, {
        'ui.wrap.message': action.payload.message
      })

    default:
      return state
  }
}
