import api from './manager'

export default {
  // Auth & User Module
  getMe() {
    return api.get('/accounts/me');
  },

  login(username, password) {
    return api.post('/auth/', { username, password });
  },

  logout() {
    return api.get('/accounts/logout');
  },
  // Hotel Module
  getAllHotel() {
    return api.get('/hotels/hotellist');
  },
  // Activity Module
  getAllActivity() {
    return api.get('/activities/activitylist');
  },
  // Transport Module
  getAllCar() {
    return api.get('/transport/carlist');
  },
}
