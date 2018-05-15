import { Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { applyMiddleware, createStore } from 'redux';

import AppReducer from './src/reducers';
import { AppRegistry } from 'react-native';
import AppWithNavigationState from './src/navigators/AppNavigator';
import { Provider } from 'react-redux';
import React from 'react';
import { compose } from 'redux';
import firebase from 'react-native-firebase';
import { middleware } from './src/utils/redux';
import thunk from 'redux-thunk';

const store = createStore(AppReducer, compose(applyMiddleware(middleware, thunk)))

class MymetroApp extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Mymetro', () => MymetroApp);

export default MymetroApp;

