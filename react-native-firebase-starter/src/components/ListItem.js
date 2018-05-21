import React, {Component} from 'react';

import Image from 'react-native';
import ReactNative from 'react-native';

const styles = require('../static/css/AppStyle.js')
const { View, TouchableHighlight, Text } = ReactNative;

class ListItem extends Component {
  render() {
    /*if(JSON.stringify(this.props.task.numarray.เตาปูน)!=undefined){
      var w = JSON.stringify(this.props.task.numarray.เตาปูน);
      var s =  w.replace(/[:,}{]/g,'.').split('.')
      for(i=0;i<s.length;i++)
      if(s[i].match("next")){
        console.log(this.props.task._key+" station: "+s[i+1]+" :I: "+i)
      }
    }*/
    return (
      <View style={styles.listItem}>
        <Image source={{uri:this.props.task.img}} style={styles.circle}/>
        <Text style={styles.listItemTitle}>{this.props.task.name}</Text>
      </View>
    );
  }
}

module.exports = ListItem;