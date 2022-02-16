import * as api from '../api/user'
import {updateUserSuccess, errorCustom} from '../constants/dataAlert'
import {USER_AUTH, USER_UPDATE} from '../constants/actionTypes'
import {ALERT_CHANGE, PACKAGES_CLEAR} from '../constants/actionTypes'

export const createUser=(google, value, history)=>async (dispatch)=>{
    try {

        console.log("google:",google)
        if(google){
            const {data}=await api.createUserGoogle(value)
            dispatch({type: USER_AUTH, payload:data})
        }else{
            const {data}=await api.createUser(value)
            dispatch({type: USER_AUTH, payload:data})
            dispatch({type: PACKAGES_CLEAR})
            history.push('/')
        }
        
    } catch (e) {
        if (e.response && e.response.data) {
            //display error pop up e.response.data.message
            dispatch({type: ALERT_CHANGE, payload:errorCustom(e.response.data.message)})
        }
    }
}

export const checkUser=(value, history)=>async (dispatch)=>{
    try {
        const {data}=await api.checkUser(value)
        dispatch({type: USER_AUTH, payload:data})
        dispatch({type: PACKAGES_CLEAR})
        history.push('/')
    } catch (e) {
        // console.log(error.message)
        if (e.response && e.response.data) {
            //display error pop up e.response.data.message
            dispatch({type: ALERT_CHANGE, payload:errorCustom(e.response.data.message)})
        }
    }
}

export const updateUser=(id, user)=>async (dispatch)=>{
    try {
        const {data} = await api.updateUser(id, user)
        dispatch({type: USER_UPDATE, payload:data})

         //display successfull pop up
         dispatch({type: ALERT_CHANGE, payload: updateUserSuccess})
    } catch (e) {
        if (e.response && e.response.data) {
            //display error pop up e.response.data.message
            dispatch({type: ALERT_CHANGE, payload:errorCustom(e.response.data.message)})
        }
    }
}

export const loginAdmin=(password)=>async (dispatch)=>{
    try {
        const {data} = await api.loginAdmin(password)
        dispatch({type: USER_AUTH, payload:data})

    } catch (e) {
        if (e.response && e.response.data) {
            //display error pop up e.response.data.message
            dispatch({type: ALERT_CHANGE, payload:errorCustom(e.response.data.message)})
        }
    }
}
