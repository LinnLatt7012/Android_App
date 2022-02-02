/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import 'react-native-gesture-handler';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Provider } from 'react-redux';

// import { store } from './redux/store';
import RootNavigator from './navigation/RootNavigator';
// Add
import { PersistGate } from 'redux-persist/integration/react';

// Modify to add persistor
import { store, persistor } from './redux/store';

const App = () => {
  const isDarkMode = false;

  const backgroundStyle = {
    backgroundColor: "#00f",
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
  </Provider>
  );
};

export default App;
