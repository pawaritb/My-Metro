import * as firebase from 'react-native-firebase';

import {AppRegistry, ListView, Reactnative, StyleSheet, Text, ToolbarAndroid, View} from 'react-native';
import React, {Component} from 'react';

import ListItem from '../components/ListItem.js';

class ActivitiesPage extends React.Component{

    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          });
          this.state = {
            dataSource: dataSource.cloneWithRows([
              { name: 'Sleep' }, { name: 'Eat' }, { name: 'Code' },
              { name: 'Sleep' }, { name: 'Eat' }, { name: 'Code' },
              { name: 'Sleep' }, { name: 'Eat' }, { name: 'Code' },
              { name: 'Sleep' }, { name: 'Eat' }, { name: 'Code' }])
        };
        this.itemsRef = firebaseApp.database().ref();
    }

    _renderItem(task) {
        return (
          <ListItem task={task} />
        );
    }

    componentDidMount() {
        this.listenForItems(this.itemsRef);
      }


    render() {
        return (
            <View>
         <ToolbarAndroid
                title="Todo List" />
            <ListView
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={this._renderItem.bind(this)}
            />
            </View>
          );
    }
}  

export default ActivitiesPage;