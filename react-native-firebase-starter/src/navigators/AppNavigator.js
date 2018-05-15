import ActivitiesPage from '../components/ActivitiesPage'
import HomePage from '../components/HomePage'
import PropTypes from 'prop-types'
import React from 'react'
import { StackNavigator } from 'react-navigation'
import { addListener } from '../utils/redux'
import { connect } from 'react-redux'

export const AppNavigator = StackNavigator({
    Home: { screen: HomePage },
    Activity: { screen: ActivitiesPage},
  })
  
  class AppWithNavigationState extends React.Component {
    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      nav: PropTypes.object.isRequired
    }
  
    render() {
      const { dispatch, nav } = this.props
      return (
        <AppNavigator
          navigation={{
            dispatch: dispatch,
            state: nav,
            addListener
          }}
        />
      )
    }
  }
  
  const mapStateToProps = state => ({
    nav: state.nav
  })
  
  export default connect(mapStateToProps)(AppWithNavigationState)