import {USER_AUTH, USER_GET, USER_LOGOUT, USER_UPDATE} from '../constants/actionTypes'

export default (user = null, action)=>{
    switch (action.type){
        case USER_AUTH:
            localStorage.setItem('profile', JSON.stringify(action.payload))
            return action.payload;
        case USER_GET:
            return JSON.parse(localStorage.getItem('profile'))
        case USER_LOGOUT:
            localStorage.clear()
            return null
        case USER_UPDATE:
            return {...user, user:action.payload}
        default:
            return user;
    }
}