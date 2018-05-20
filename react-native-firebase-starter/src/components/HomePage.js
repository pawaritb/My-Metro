import {AppRegistry, Image, ListView, Reactnative, Text, View} from 'react-native';
import {Button, SearchBar, WhiteSpace, WingBlank} from 'antd-mobile';
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

    endClear = () => {
        console.log(end);
        this.setState({end:''});
    };

    handleClick = () => {
        this.manualFocusInst.focus();
    };

    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.container}>
                <WingBlank><Text>ต้นทาง</Text></WingBlank>
                <SearchBar
                    placeholder="เลือกต้นทาง"
                    onCancel={(start) => this.setState({start:''})}
                    cancelText="ยกเลิก"
                    onChange={(start) => this.setState({start})}
                />
                <WhiteSpace/>
                <WingBlank><Text>ปลายทาง</Text></WingBlank>
                <SearchBar
                    placeholder="เลือกปลายทาง"
                    onFocus={() => console.log('onFocus')}
                    onBlur={() => console.log('onBlur')}
                    onCancel={() => console.log('clear')}
                    cancelText="ยกเลิก"
                    onChange={(end) => this.setState({end})}
                />
                <Button type="primary" style={styles.button} onClick={()=>navigate('Activity',{start: this.state.start, end: this.state.end})}>ยืนยัน</Button>
                <WhiteSpace/>
                <Image style={styles.img} source={require('../static/img/img-not-found.jpg')}/>
            </View>
        )
    }
}
    export default HomePage;