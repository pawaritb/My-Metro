import {AppRegistry, BackHandler, Image, ListView, Reactnative, Text, ToolbarAndroid, View} from 'react-native';
import {Button, SearchBar} from 'antd-mobile';
import React, {Component} from 'react';

import ActivitiesPage from './ActivitiesPage.js';
import firebase from 'react-native-firebase';

const styles = require('../static/css/AppStyle.js')
const firebaseApp = firebase.app();
const getref = firebaseApp.database();
const tasksRef = getref.ref('users/lBPn0ycw6ydQhOPnIFUoQskYJJ53/connects/');

var connects = [];

class HomePage extends React.Component{
    
    constructor(){
        super();
        state = {
            start:'',
            end:'',
            connects:[],
          };
        this.loaddata();
    }

    loaddata(){
        tasksRef.on('value', (dataSnapshot) => {
            dataSnapshot.forEach((child) => {
                const temp = child.val();
                const key = Object.keys(temp);
                connects.push({
                    startStation: temp[key[0]].stationName,
                    startLine: temp[key[0]].stationLine,
                    interchange: temp.isInterchange,
                    endStation: temp[key[2]].stationName,
                    endLine: temp[key[2]].stationLine
                });
            });
        });
        console.log('Suscess');
    }

    static navigationOptions = {
        header: null
    };

    static exitApp(){
        android.os.Process.killProcess(android.os.Process.myPid());
    }

    componentDidMount(){
        clear = () => {
            this.setState({ value: '' });
          };
    }

    componentWillUnmount(){

    }

    handleClick = () => {
        this.manualFocusInst.focus();
    };

    render(){
        const { navigate } = this.props.navigation;

        return(
            <View style={styles.container}>
            <View style={styles.head}>
            <Image source={require('../static/img/logo.png')} resizeMode="cover" resizeMode="contain" style={styles.imglogo}/>
            </View>
            <View style={styles.body}>
                <Text style={styles.title}>เลือกสถานีต้นทางและปลายทาง</Text>
                <Text>ต้นทาง</Text>
                <SearchBar
                    placeholder="เลือกต้นทาง"
                    onCancel={(start) => this.setState({start:''})}
                    cancelText="ยกเลิก"
                    onChange={(start) => this.setState({start})}
                />
                <Text>ปลายทาง</Text>
                <SearchBar
                    placeholder="เลือกปลายทาง"
                    onCancel={(end) => this.setState({end:''})}
                    cancelText="ยกเลิก"
                    onChange={(end) => this.setState({end})}
                />
                <Button type="primary" style={styles.button} onClick={()=>navigate('Activity',{start: this.state.start, end: this.state.end, connects:connects})}>ยืนยัน</Button>
                <Image style={styles.img} source={{uri:'https://firebasestorage.googleapis.com/v0/b/maptool-f99d8.appspot.com/o/aloha%2Fmap?alt=media&token=0e32d32a-8277-4de5-b221-ee66de0a0551'}}/>
            </View>
        </View>
        )
    }
}
    export default HomePage;