const selectors = {
  loginStatus: state => state.info.loginStatus.data,
  logoutStatus: state => state.info.logoutStatus.data,
  me: state => state.info.me.data,
  hotelList: state => state.info.hotelList.data,
  activityList: state => state.info.activityList.data,
  transportList: state => state.info.transportList.data,
}

export default selectors
