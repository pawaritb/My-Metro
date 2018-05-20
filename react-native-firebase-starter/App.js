import ActivitiesPage from './src/components/ActivitiesPage';
import { AppRegistry } from 'react-native';
import HomePage from './src/components/HomePage';
import React from 'react';
import {StackNavigator} from 'react-navigation'

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomePage,
    },
    Activity: {
      screen: ActivitiesPage,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

class MymetroApp extends React.Component {
  render() {
    return <RootStack />;
  }
}

AppRegistry.registerComponent('Mymetro', () => MymetroApp);

export default MymetroApp;