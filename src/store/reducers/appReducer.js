import {
  TOGGLE_LOADING,
  CHANGE_VIEW,
  SET_NETWORK,
  SET_WALLET,
  INIT_EXCHANGE,
} from 'src/store/actions/appActions'
import appStates from 'src/store/states/appStates'
import { setToState } from 'src/utils'

export const initialState = {
  ui: {
    view: appStates.view.connectingWithMetaMask,
    previousView: appStates.view.connectingWithMetaMask,
    loading: false
  },
  data: {
    network: {},
    wallet: {
      loaded: false
    }
  }
}

const allowedNetworks = {
  1: {
    id: 1,
    name: 'MainNet'
  },
  42: {
    id: 42,
    name: 'Kovan'
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
        'data.wallet': {
          ...state.data.wallet,
          address: action.payload.address
        }
      })

    case SET_NETWORK:
      return setToState(state, {
        'data.network': allowedNetworks[action.payload.networkId] || {}
      })

    case SET_WALLET:
      return setToState(state, {
        'data.wallet': {
          ...state.data.wallet,
          ...action.payload
        }
      })

    default:
      return state
  }
}
