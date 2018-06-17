import {AppRegistry, Image, ListView, Reactnative, Text, ToolbarAndroid, View} from 'react-native';
import React, {Component} from 'react';

import ListItem from '../components/ListItem.js';
import TimerMixin from 'react-timer-mixin';
import firebase from 'react-native-firebase';

const styles = require('../static/css/AppStyle.js');

const tasks = [];
const count =[];
const paths = [];
var start;
var end;
var connects = [];

class ActivitiesPage extends React.Component{

    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            dataSource: dataSource,
            connects : [],
        };
    }
    
    static navigationOptions = {
        header: null
    };
    
    listenForTasks(tasksRef) {

        const {state} = this.props.navigation
        start = state.params.start;
        end = state.params.end;
        connects = state.params.connects;
        console.log('Start'+start+': End'+end+'  connect:  '+connects)
        
            this.setState({connects});
            tasks = this.findPath();
        if(tasks != null && tasks != undefined){
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(tasks)
            }
            ,console.log(tasks));
        }
    }

    findPath(){
        //get start station
        var count = 0;
        var startIndex;
        var next;
        var previous;
        var nextLine;
        var changeStation;
        var endline;
        var startline;
        var condition;

        console.log(this.state.connects.length)
        for(var i =0 ; i< connects.length;i++){
            if(connects[i].startStation==start){
                next = connects[i].endStation;
                nextLine = connects[i].endLine;
                console.log("start"+connects[i].startStation+"-"+next)
                tasks.push({
                    img: require('../static/img/circle.png'),
                    name: connects[i].startStation, 
                    line: connects[i].startLine,
                });
                break;
            }
        }

        
        //findStartLine
        for(var i=0; i<connects.length;i++){
            if(start == connects[i].startStation){
                startline = connects[i].startLine;
            }
        }
        
        //findEndLine
        for(var i=0; i<connects.length;i++){
            if(end == connects[i].startStation){
                endline = connects[i].startLine;
            }
        }

        if(startline == endline){
            condition = 0;
        }else{
            condition = 1;
        }

        switch (condition) {
            case 0://case in same line
                //find path in next until react lenght
                for(var i = 0; i < connects.length;i++){
                    if(count > 72){
                        break;
                    }
                    if(connects[i].startStation==next){
                        next = connects[i].endStation;
                        tasks.push({
                            img: require('../static/img/line.png'),
                            name: connects[i].startStation, 
                            line: connects[i].startLine,
                        });
                        i=-1;
                        count = count+1;
                    }
                    if(next == end){
                        tasks.push({
                            img: require('../static/img/circle.png'),
                            name: next, 
                            line: endline,
                        });
                        return tasks;
                    }
                }
                //inverse
                tasks = [];
                count = 0;
                for(var i =0 ; i< connects.length;i++){
                    if(connects[i].endStation==start){
                        previous = connects[i].startStation;
                        console.log("start"+connects[i].endStation+"-"+previous)
                        tasks.push({
                            img: require('../static/img/circle.png'),
                            name: connects[i].endStation, 
                            line: connects[i].endLine,
                        });
                        break;
                    }
                }
                for(var i = 0; i < connects.length;i++){
                    if(count > 72){
                        break;
                    }
                    if(connects[i].endStation==previous){
                        previous = connects[i].startStation;
                        tasks.push({
                            img: require('../static/img/line.png'),
                            name: connects[i].endStation, 
                            line: connects[i].endLine,
                        });
                        i=-1;
                        count = count+1;
                    }
                    if(previous == end){
                        tasks.push({
                            img: require('../static/img/circle.png'),
                            name: previous, 
                            line: endline,
                        });
                        return tasks;
                    }
                }
            case 1:// case interchange
                //find interchange station
                count = 0;
                var interchangeStation = [];
                for(var i = 0; i < connects.length; i++){
                    if(connects[i].interchange==true){
                        interchangeStation.push(connects[i]);
                        console.log(interchangeStation.length)
                    }
                }
                //find path until it reach end
                for(var i=0;i<connects.length;i++){
                    console.log(tasks)
                    //so if it have interchange to anothe line go into another line
                    if(count > 72){
                        break;
                    }
                    for(var j=0;j<interchangeStation.length;j++){
                        //if it interchangeStation it might be an interchange check end of this station if it not same line do it
                        console.log(interchangeStation)
                        if(i>0){
                            if(next==interchangeStation[j].startStation && nextLine==interchangeStation[j].startLine){
                                tasks.push({
                                    img: require('../static/img/line.png'),
                                    name: interchangeStation[j].startStation, 
                                    line: interchangeStation[j].startLine,
                                });
                                tasks.push({
                                    img: require('../static/img/line.png'),
                                    name: interchangeStation[j].endStation, 
                                    line: interchangeStation[j].endLine,
                                });
                                for(var k=0;k<connects.length;k++){
                                    if(connects[k].startStation==interchangeStation[j].startStation && connects[k].endStation!=interchangeStation[j].endStation){
                                        next = connects[k].startStation;
                                        nextLine = connects[k].startLine;
                                    }else if(connects[k].endStation==interchangeStation[j].endStation && connects[k].endStation!=interchangeStation[j].startStation){
                                        next = connects[k].endStation;
                                        nextLine = connects[k].endLine;
                                    }
                                }
                                i=-1;
                                count = count+1;
                            }else if(next==interchangeStation[j].endStation && nextLine == interchangeStation[j].endLine){
                                tasks.push({
                                    img: require('../static/img/line.png'),
                                    name: interchangeStation[j].endStation,
                                    line: interchangeStation[j].endLine, 
                                });
                                tasks.push({
                                    img: require('../static/img/line.png'),
                                    name: interchangeStation[j].startStation, 
                                    line: interchangeStation[j].startLine,
                                });
                                for(var k=0;k<connects.length;k++){
                                    if(connects[k].endStation==interchangeStation[j].startStation && connects[k].endStation!=interchangeStation[j].endStation){
                                        next = connects[k].endStation;
                                        nextLine = connects[k].endLine;
                                    }else if(connects[k].startStation==interchangeStation[j].endStation && connects[k].endStation!=interchangeStation[j].startStation){
                                        next = connects[k].startStation;
                                        nextLine = connects[k].startLine;
                                    }
                                }
                                i=-1;
                                count = count+1;
                            }
                        }
                        //that check all interchange station and if in same line run this flow
                    }
                    if(i>0){
                        if(connects[i].startStation==next){
                            next = connects[i].endStation;
                            tasks.push({
                                img: require('../static/img/line.png'),
                                name: connects[i].startStation,
                                line: connects[i].startLine,
                            });
                            i=-1;
                            count = count+1;
                        }
                        if(next == end){
                            tasks.push({
                                img: require('../static/img/circle.png'),
                                name: next,
                                line: endline, 
                            });
                            return tasks;
                        }
                    }
                }
                //find path with interchange inverse

                break;
        }
        //can't find path
        tasks=[];
        return tasks;
    }
    
    componentDidMount() {
        // start listening for firebase updates
        this.listenForTasks(this.tasksRef);

    }

    _renderItem(task) {
        return (
            <View style={styles.liContainer}>
            {console.log(task)}
                <Image source={task.img} style={styles.circle}/>
                <Text style={styles.listItem}>{task.name} : {task.line}</Text>
            </View>
        );
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
                    renderRow={this._renderItem.bind(tasks)}
                    style={styles.listView}
                    scrollRenderAheadDistance={500}/>
                </View>
            </View>
        );
    }
    
}export default ActivitiesPage;         