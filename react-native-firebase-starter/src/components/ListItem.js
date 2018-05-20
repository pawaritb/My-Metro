import React, {Component} from 'react';

import ReactNative from 'react-native';

const styles = require('../static/css/AppStyle.js')
const { View, TouchableHighlight, Text } = ReactNative;

class ListItem extends Component {
  render() {
    return (
      <View style={styles.listItem}>
        <Text style={styles.listItemTitle}>{this.props.task._key}</Text>
      </View>
    );
  }
}

module.exports = ListItem;