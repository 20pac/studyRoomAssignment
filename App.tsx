import React, {useEffect, useState} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';

import Routes from './src/Routes';

import store from './src/store/store';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native';
import {LogBox} from 'react-native';

const App = () => {
  // LogBox.ignoreLogs(['Warning: ']);

  return (
    <Provider store={store}>
      <PaperProvider>
        <StatusBar backgroundColor="white" />
        <Routes />
      </PaperProvider>
    </Provider>
  );
};

export default App;
