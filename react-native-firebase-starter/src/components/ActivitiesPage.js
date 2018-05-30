import {AppRegistry, Image, ListView, Reactnative, Text, ToolbarAndroid, View} from 'react-native';
import React, {Component} from 'react';

import ListItem from '../components/ListItem.js';
import firebase from 'react-native-firebase';

const styles = require('../static/css/AppStyle.js');

const firebaseconfig ={
    apiKey:"AIzaSyBQoOKQX-nD9lFzUi5Ye2vCoKzReRYf7Uc",
    authDomain:"maptool-f99d8.firebaseapp.com",
    databaseURL:"https://maptool-f99d8.firebaseio.com/",
    storageBucket:"maptool-f99d8.appspot.com",
}
const firebaseApp = firebase.initializeApp(firebaseconfig);

const tasks = [];
const count =[];
class ActivitiesPage extends React.Component{

    constructor(props) {
        super(props);
        this.getref = firebaseApp.database();
        this.tasksRef = this.getref.ref('users/lBPn0ycw6ydQhOPnIFUoQskYJJ53/connects/');
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            dataSource: dataSource,
        };
    }
    
    static navigationOptions = {
        header: null
    };
    
    listenForTasks(tasksRef) {

        const {state} = this.props.navigation
        var st = state.params.start;
        var ed = state.params.end;

        tasksRef.on('value', (dataSnapshot) => {
            dataSnapshot.forEach((child) => {
                const temp = child.val()
                const tempKey = Object.keys(temp)
                const tempVal = temp[tempKey[0]]
                count.push({
                    stationName: tempVal.stationName,
                    stationLine: tempVal.stationLine,
                })
                const started = temp[tempKey[0]]
                const isInterchange = temp[tempKey[1]]
                const ended = temp[tempKey[2]]
                
                for(i=0;i<count.length;i++){    
                    if(st==state.params.start){
                        tasks.push({
                            img: require('../static/img/circle.png'),
                            name: st, 
                        })
                        st = JSON.stringify(ended.stationName);
                        console.log('Start Push: '+st+' current NOde: '+JSON.stringify(started.stationName))
                    }
                    if(started.stationName != undefined && ed!=started.stationName){
                        var line1 = JSON.stringify(ended.stationLine);
                        var next = JSON.stringify(ended.stationName);
                        console.log(st+' : '+next)
                        if(st==next){
                            var line2 = JSON.stringify(started.stationLine);
                            console.log('Line1: '+line1+' : Line2:'+line2)
                            if(line1==line2){
                                console.log('Push: '+st)
                                tasks.push({
                                    img: require('../static/img/line.png'),
                                    name: st,
                                })
                                st = next;
                            }
                        }
                    }
                    if(ed==started.stationName){
                        console.log('End Push: '+ed)
                        tasks.push({
                            img: require('../static/img/circle.png'),
                            name: ed, 
                        })
                        break;
                    }
                }
                /* var i=0;
                tempVal.forEach(function(){
                    tasks.push({
                            _key: tempKey[0], //ได้ key แล้ว
                            numarray: tempVal[i],
                        });
                        i=i+1;
                });//NORMAL PUSH DATA TO LISTVIEW
                */
               this.setState({
                   dataSource: this.state.dataSource.cloneWithRows(tasks)
                });
            });
        });
    }
    
    render() {
        const {state} = this.props.navigation
        //console.log("Start:"+state.params.start +"   End:"+state.params.end+" Data Source:"+this.state.dataSource.toString);
        {/*state.params.__(ตัวแปรที่ส่ง)__*/}
        return (
        <View style={styles.container}>
            <View style={styles.head2}>
                <View style={styles.colum}>
                    <View style={styles.row}>
                        <Text style={styles.infotext}>{state.params.start}</Text>
                        <Image style={styles.arrow} resizeMode='contain' source={require('../static/img/arrow.png')}/>
                        <Text style={styles.infotext}>{state.params.end}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.body}>
            <ListView
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={this._renderItem.bind(this.tasks)}
                style={styles.listView}
                scrollRenderAheadDistance={500}/>
            </View>
        </View>
        );
    }

    componentDidMount() {
        // start listening for firebase updates
        this.listenForTasks(this.tasksRef);

    }

    _renderItem(task) {
        return (
            <View style={styles.liContainer}>
                <Image source={task.img} style={styles.circle}/>
                <Text style={styles.listItem}>{task.name}</Text>
            </View>
        );
    }
    
}export default ActivitiesPage;      