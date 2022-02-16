import {ALERT_CLOSE, ALERT_CHANGE} from '../constants/actionTypes'

const initialState = {
    type:'success',
    display:'none',
    img:'check.png',
    title:'Berhasil',
    desc:'Paket anda berhasil didaftarkan',
    btnText:'OK'
}

export default (alert = initialState, action)=>{
    switch (action.type){
        case ALERT_CLOSE:
            return alert={
                ...alert,
                display:action.payload
            };
        case ALERT_CHANGE:
            return action.payload
        default:
            return alert;
    }
}