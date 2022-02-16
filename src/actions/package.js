import * as api from '../api/package'
import {successCreate, updatePackageSuccess, errorCustom, findPackageError, noPackagesHistory} from '../constants/dataAlert'
import {PACKAGES_FETCH_ALL, PACKAGES_CREATE, PACKAGES_UPDATE} from '../constants/actionTypes'
import {ALERT_CHANGE} from '../constants/actionTypes'


//get specific package
export const getPackage=(id)=>{
    return async (dispatch) =>{
        try{
            const {data}=await api.getPackage(id)
            if(data===null){
                dispatch({type: ALERT_CHANGE, payload: findPackageError})
            }else{
                return data
            }
            
        }catch (e){
             if (e.response && e.response.data) {
                //display error pop up e.response.data.message
                dispatch({type: ALERT_CHANGE, payload: findPackageError})
            }
        }
    }

}

//get all packages sent by specific user
export const getPackageUser=(id)=>async (dispatch)=>{
    try {
        const {data}=await api.fetchPackagesUser(id)
        console.log("package user",data)
        dispatch({type: PACKAGES_FETCH_ALL, payload:data})
    } catch (e) {
        if (e.response && e.response.data) {
            //display error pop up e.response.data.message
            dispatch({type: ALERT_CHANGE, payload:noPackagesHistory})
        }
    }
}

//get all packages
export const getPackages=()=>{
    return async (dispatch) =>{
        try{
            const {data}=await api.fetchPackages()
            return data
        }catch (e){
             if (e.response && e.response.data) {
                //display error pop up e.response.data.message
                dispatch({type: ALERT_CHANGE, payload:errorCustom(e.response.data.message)})
            }
        }
    }


    // try {
    //     const {data}=await api.fetchPackages()
    //     // dispatch({type: PACKAGES_FETCH_ALL, payload:data})
    // } catch (e) {
    //     if (e.response && e.response.data) {
    //         //display error pop up e.response.data.message
    //         dispatch({type: ALERT_CHANGE, payload:errorCustom(e.response.data.message)})
    //     }
    // }
}

//create package
export const createPackage=(value)=>async (dispatch)=>{
    // return async (dispatch) =>{
    //     try{
    //         const {data}=await api.createPackage(value)
    //         return data
    //     }catch (e){
    //         if (e.response && e.response.data) {
    //             console.log("here action erro",e)
    //             //display error pop up e.response.data.message
    //             dispatch({type: ALERT_CHANGE, payload:errorCustom(e.response.data.message)})
    //         }
    //     }
    // }

    try {

        const {data}=await api.createPackage(value)
        dispatch({type: PACKAGES_CREATE, payload:data})
        
        //display successfull pop up
        dispatch({type: ALERT_CHANGE, payload: successCreate})
    } catch (e) {
        if (e.response && e.response.data) {
                console.log("here action erro")
            //display error pop up e.response.data.message
            dispatch({type: ALERT_CHANGE, payload:errorCustom(e.response.data.message)})
        }
    }
}


//update package
export const updatePackage=(id, paket)=>{

    return async (dispatch) =>{
        try{
            const {data}=await api.updatePackage(id, paket)
            dispatch({type: ALERT_CHANGE, payload: updatePackageSuccess})
            return data
        }catch (e){
            if (e.response && e.response.data) {
                //display error pop up e.response.data.message
                dispatch({type: ALERT_CHANGE, payload:errorCustom(e.response.data.message)})
            }
        }
    }

    // try {
    //     const {data} = await api.updatePackage(id, paket)
    //     dispatch({type: PACKAGES_UPDATE, payload:data})

    //     //display successfull pop up
    //     dispatch({type: ALERT_CHANGE, payload: updatePackageSuccess})
    // } catch (e) {
    //     if (e.response && e.response.data) {
    //         //display error pop up e.response.data.message
    //         dispatch({type: ALERT_CHANGE, payload:errorCustom(e.response.data.message)})
    //     }
    // }
}


