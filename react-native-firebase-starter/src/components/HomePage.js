import {AppRegistry, Image, ListView, Reactnative, StyleSheet, Text, View} from 'react-native';
import {Button, SearchBar, WhiteSpace, WingBlank} from 'antd-mobile';
import React, {Component} from 'react';

import firebase from 'react-native-firebase';

const styles = require('../static/css/AppStyle.js')

class HomePage extends React.Component{
    
    state = {
        start: '',
        end:'',
      };

    static navigationOptions = {
        header: null
    };

    onChange= (value) => {
        console.log(value);
        if(value == this.state.start){
            this.setState({ this:state.start });
        }else if(value == this.state.end){
            this.setState({ this:state.end });
        }else{
            
        }
    };

    startClear = () => {
        console.log(start_lo.value)
        this.setState({start_lo:''});
    };

    endClear = () => {
        console.log(end);
        this.setState({end:''});
    };

    handleClick = () => {
        this.manualFocusInst.focus();
    };
      

    render(){
        const start_lo = this.state.start;
        const end_lo = this.state.end;
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.container}>
                <WingBlank><Text>ต้นทาง</Text></WingBlank>
                <SearchBar
                    start_lo={this.state.start}
                    placeholder="เลือกต้นทาง"
                    onSubmit={start_lo => console.log(start_lo, 'onSubmit')}
                    onFocus={() => console.log('onFocus')}
                    onBlur={() => console.log('onBlur')}
                    onCancel={this.startClear}
                    cancelText="ยกเลิก"
                    onChange={this.onChange}
                />
                <WhiteSpace/>
                <WingBlank><Text>ปลายทาง</Text></WingBlank>
                <SearchBar
                    end_lo={this.state.end}
                    placeholder="เลือกปลายทาง"
                    onSubmit={end_lo => console.log(end_lo, 'onSubmit')}
                    onFocus={() => console.log('onFocus')}
                    onBlur={() => console.log('onBlur')}
                    onCancel={this.endClear}
                    cancelText="ยกเลิก"
                    onChange={this.onChange}
                />
                <Button type="primary" style={styles.button} onClick={()=>navigate('Activity',{start: start_lo, end: end_lo})}>ยืนยัน</Button>
                <WhiteSpace/>
                <Image style={styles.img} source={require('../static/img/img-not-found.jpg')}/>
            </View>
        )
    }
}

export default HomePage;