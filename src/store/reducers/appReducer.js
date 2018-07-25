import { TOGGLE_LOADER } from 'src/store/actions/appActions';
import { setToState } from 'src/utils';

export const initialState = {
  ui: {
    loading: false,
  },
  data: {},
};

export default function appReducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_LOADER:
      return setToState(state, {
        'ui.loading': !state.ui.loading,
      });

    default:
      return state;
  }
}
