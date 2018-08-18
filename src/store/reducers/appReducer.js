import {
  TOGGLE_LOADING,
  CHANGE_VIEW
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
    wallet: {
      loaded: false
    }
  }
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
        'ui.previousView': state.ui.view,
      })

    default:
      return state
  }
}
