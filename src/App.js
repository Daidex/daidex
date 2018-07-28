import React from 'react';
import { Provider } from 'react-redux';

import store from 'src/store';

import CoreLayout from 'src/components/Layouts/CoreLayout'

import Link from 'src/components/Atoms/Link'
import Button from 'src/components/Atoms/Button'
import Text from 'src/components/Atoms/Text'

import Navbar from 'src/components/Molecules/Navbar'

const App = () => (
  <Provider store={store}>
    <CoreLayout>
      <Link href="https://radarrelay.com" disabled>
        Radar Relay
      </Link>
      <Button theme="orange" onClick={() => console.log('clicked')}>
        Sell Now
      </Button>
      <Text theme="title">
        Trade ERC20 tokens using your own wallet
      </Text>
      <Navbar>
        <Link href="https://radarrelay.com">
          Exchange
        </Link>
        <Link href="https://radarrelay.com">
          How it works
        </Link>
        <Link href="https://radarrelay.com">
          Terms
        </Link>
        <Link href="https://radarrelay.com">
          Contract
        </Link>
      </Navbar>
    </CoreLayout>
  </Provider>
)

export default App;
