import React from 'react';

import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import {store} from './store/store';

function createRootApp() {
  const root = createRoot(document.getElementById('root'));

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

createRootApp();
