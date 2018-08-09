import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import CoreLayout from 'src/components/Layouts/CoreLayout'

import store, { history } from 'src/store'
import routes, { renderRoutes } from 'src/routes'

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <BrowserRouter>
        <CoreLayout>
          {renderRoutes(routes)}
        </CoreLayout>
      </BrowserRouter>
    </ConnectedRouter>
  </Provider>
)

export default App
