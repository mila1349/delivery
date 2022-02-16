import {PACKAGES_FETCH_ALL, PACKAGES_CREATE, PACKAGES_UPDATE, PACKAGES_CLEAR} from '../constants/actionTypes'

export default (packages = [], action)=>{
    switch (action.type){
        case PACKAGES_FETCH_ALL:
            return action.payload;
        case PACKAGES_CREATE:
            return [...packages, action.payload];
        case PACKAGES_UPDATE:
            return packages.map((paket)=>paket._id===action.payload._id?action.payload:paket)
        case PACKAGES_CLEAR:
            return [];
        default:
            return packages;
    }
}