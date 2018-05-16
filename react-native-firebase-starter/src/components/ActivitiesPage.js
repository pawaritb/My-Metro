import {AppRegistry, ListView, Reactnative, StyleSheet, Text, ToolbarAndroid, View} from 'react-native';
import React, {Component} from 'react';

import ListItem from '../components/ListItem.js';
import firebase from 'react-native-firebase';

const styles = require('../static/css/AppStyle.js')
const StatusBar = require('../components/StatusBar');
const ActionButton = require('../components/ActionButton');

const firebaseconfig ={
    apiKey:"AIzaSyBQoOKQX-nD9lFzUi5Ye2vCoKzReRYf7Uc",
    authDomain:"maptool-f99d8.firebaseapp.com",
    databaseURL:"https://maptool-f99d8.firebaseio.com/",
    storageBucket:"maptool-f99d8.appspot.com",
}
const firebaseApp = firebase.initializeApp(firebaseconfig);

class ActivitiesPage extends React.Component{

    constructor(props) {
        super(props);
        this.getref = firebaseApp.database().ref();
        this.tasksRef = this.getref.child('users').child('-LBb_zaWeURLFjeh2j-z').child('map');
        console.log(this.tasksRef);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            dataSource: dataSource
        };
    }

    listenForTasks(tasksRef) {
        tasksRef.on('value', (dataSnapshot) => {
            var tasks = [];
            dataSnapshot.forEach((child) => {
                const temp = child.val()
                const tempKey = Object.keys(temp)
                const tempVal = temp[tempKey[0]]
                console.log(tempVal[0])
                tasks.push({
                    _key: tempKey[0], //ได้ key แล้ว
                    numarray: tempVal
                });
            });
        
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(tasks)
            });
        });
    }
    
    render() {
        const {state} = this.props.navigation
        {/*state.params.__(ตัวแปรที่ส่ง)__*/}
        return (
        <View style={styles.container}>
            <ToolbarAndroid
                style={styles.navbar}
                title="Todo List" />
            <ListView
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={this._renderItem.bind(this)}
                style={styles.listView}/>
        </View>
        );
    }

    componentDidMount() {
        // start listening for firebase updates
        this.listenForTasks(this.tasksRef);
    }

    _renderItem(task) {
        return (
          <ListItem task={task} />
        );
    }
    
}  

export default ActivitiesPage;