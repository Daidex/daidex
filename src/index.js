import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import RedBox from 'redbox-react';

import App from 'src/App.js';

const root = document.getElementById('root')

if (__DEV__) { // eslint-disable-line
  render(
    <AppContainer errorReporter={RedBox}>
      <App />
    </AppContainer>,
    root
  )
} else {
  render(<App />, root)
}

if (module.hot) {
  module.hot.accept('./App.js', () => {
    render(
      <AppContainer errorReporter={RedBox}>
        <App />
      </AppContainer>,
      root
    )
  })
}
