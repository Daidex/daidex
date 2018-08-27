import {
  TOGGLE_LOADING,
  CHANGE_VIEW,
  SET_NETWORK,
  UPDATE_BALANCES,
  UPDATE_ACCOUNT,
  INIT_EXCHANGE,
} from 'src/store/actions/appActions'
import appStates from 'src/store/states/appStates'
import { setToState } from 'src/utils'

import tokensByNetwork from 'src/store/networks.json'

export const initialState = {
  ui: {
    view: appStates.view.connectingWithMetaMask,
    previousView: appStates.view.connectingWithMetaMask,
    loading: false
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
          ...action.payload.balances
        }
      })

    default:
      return state
  }
}
