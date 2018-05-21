const React = require('react-native')
const {StyleSheet} = React
const constants = {
  actionColor: '#24CE84'
};

var styles = StyleSheet.create({
  container:{
    width:'100%',
    height:'100%',
  },
  head:{
    width:'100%',
    height:125,
    backgroundColor:'#969696',
    padding:5,
  },
  head2:{
    width:'100%',
    height:125,
    backgroundColor:'#969696',
    padding:5,
    paddingTop:20,
  },
  body: {
    backgroundColor: '#efefef',
    flexDirection:'column',
    width: '100%',
    height: '80%',
    padding:10,
  },
  listview: {
    flex: 1,
  },
  listItem: {
    borderTopColor: '#888888',
    borderBottomColor: '#888888',
    flexDirection:'row',
    alignItems:'center',
    padding:20,
    width:'100%',
    height:'100%',
  },
  liContainer: {
    flex: 1,
    flexDirection:'row',
    paddingLeft:20,
  },
  ListItemTitle: {
    color: '#333',
    fontSize: 16,
  },
  button: {
    height:30,
    marginTop:10,
  },
  img:{
    height:"50%",
    width:"100%",
    marginTop:20,
  },
  navbarTitle: {
    color: '#444',
    fontSize: 16,
    fontWeight: "500"
  },
  statusbar: {
    backgroundColor: '#fff',
    height: 22,
  },
  center: {
    textAlign: 'center',
  },
  circle:{
    width:60,
    height:60,
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  action: {
    backgroundColor: constants.actionColor,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  title:{
    fontSize:18,
    fontWeight:'bold',
    margin:10,
    textAlign:'center',
    textAlignVertical:'center',
  },
  imglogo:{
    width:'100%',
    height:'100%',
  },
  row:{
    flexDirection:'row',
    flex:1,
  },
  colum:{
    flexDirection:'column',
    flex:1,
    alignItems:'center',
  },
  arrow:{
    width:50,
    height:100,
  },
  infotext:{
    fontSize:18,
    fontWeight:'bold',
    margin:10,
    textAlign:'center',
    textAlignVertical:'center',
    color:'white',
  }
})

module.exports = styles
module.exports.constants = constants;