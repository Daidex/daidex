import React from 'react';
import { Provider } from 'react-redux';

import store from 'src/store';

import Link from 'src/components/Atoms/Link';

const App = () => (
  <Provider store={store}>
    <Link href="https://radarrelay.com">
      Radar Relay
    </Link>
  </Provider>
)

export default App;
