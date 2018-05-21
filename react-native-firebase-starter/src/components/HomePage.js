import {AppRegistry, BackHandler, Image, ListView, Reactnative, Text, ToolbarAndroid, View} from 'react-native';
import {Button, SearchBar} from 'antd-mobile';
import React, {Component} from 'react';

import ActivitiesPage from './ActivitiesPage.js';
import firebase from 'react-native-firebase';

const styles = require('../static/css/AppStyle.js')

class HomePage extends React.Component{
    
    constructor(){
        super();
        state = {
            start:'',
            end:'',
          };
    }

    static navigationOptions = {
        header: null
    };

    static exitApp(){
        android.os.Process.killProcess(android.os.Process.myPid());
    }

    componentDidMount(){
        BackHandler.exitApp;
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
                    onCancel={(start) => this.setState(state => ({...state, start:start || ""}))}
                    cancelText="ยกเลิก"
                    onChange={(start) => this.setState({start})}
                />
                <Text>ปลายทาง</Text>
                <SearchBar
                    placeholder="เลือกปลายทาง"
                    onCancel={(end) => this.setState(state => ({...state, end:end || ""}))}
                    cancelText="ยกเลิก"
                    onChange={(end) => this.setState({end})}
                />
                <Button type="primary" style={styles.button} onClick={()=>navigate('Activity',{start: this.state.start, end: this.state.end})}>ยืนยัน</Button>
                <Image style={styles.img} source={{uri:'https://firebasestorage.googleapis.com/v0/b/maptool-f99d8.appspot.com/o/aloha%2Fmap?alt=media&token=0e32d32a-8277-4de5-b221-ee66de0a0551'}}/>
            </View>
        </View>
        )
    }
}
    export default HomePage;