import Api from '../../common/lib/api'
import TokenService from '../../common/lib/token'
import constants from './constants'
import createApiAction from '../../common/lib/api/createAction'

const loginApiAction = createApiAction(constants.LOGIN, { setLoading: true })
const logoutApiAction = createApiAction(constants.LOGOUT)
const meApiAction = createApiAction(constants.ME, { setLoading: true })
const getAllHotelApiAction = createApiAction(constants.ALL_HOTEL, { setLoading: true })
const getAllActivityApiAction = createApiAction(constants.ALL_ACTIVITY, { setLoading: true })
const getAllCarApiAction = createApiAction(constants.ALL_CAR, { setLoading: true })

const actions = {
  login: ({ username, password }) => loginApiAction.fetch(TokenService.requestToken, username, password),
  logout: () => logoutApiAction.fetch(TokenService.revokeToken),
  me: () => meApiAction.fetch(Api.getMe),
  getAllHotel: () => getAllHotelApiAction.fetch(Api.getAllHotel),
  getAllActivity: () => getAllActivityApiAction.fetch(Api.getAllActivity),
  getAllCar: () => getAllCarApiAction.fetch(Api.getAllCar),
}

export default actions
