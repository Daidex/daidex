import React from 'react';
import { Provider } from 'react-redux';

import store from 'src/store';

import CoreLayout from 'src/components/Layouts/CoreLayout'

import Link from 'src/components/Atoms/Link';

const App = () => (
  <Provider store={store}>
    <CoreLayout>
      <Link href="https://radarrelay.com" disabled>
        Radar Relay
      </Link>
    </CoreLayout>
  </Provider>
)

export default App;
