import { AppNavigator } from '../navigators/AppNavigator';
import InfoReducers from '../modules/info/reducers'
import { NavigationActions } from 'react-navigation';
import { combineReducers } from 'redux';

//import SideBar from './sideBar';




// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('Home');
const firstNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('Activity');
const secondNavState = AppNavigator.router.getStateForAction(secondAction);
const initialNavState = AppNavigator.router.getStateForAction(
  firstNavState
);

function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

//const initialAuthState = { isLoggedIn: false };

/*function auth(state = initialAuthState, action) {
  switch (action.type) {
    case 'Login':
      return { ...state, isLoggedIn: true };
    case 'Logout':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}*/

const AppReducer = combineReducers({
  nav,
  //sidebar: SideBar,
  info: InfoReducers,
});

export default AppReducer;