import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import 'assets/img/favicon.ico'

import CoreLayout from 'src/components/Layouts/CoreLayout';

import store from 'src/store';
import routes, { renderRoutes } from 'src/routes';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <CoreLayout>
        {renderRoutes(routes)}
      </CoreLayout>
    </BrowserRouter>
  </Provider>
)

export default App;
