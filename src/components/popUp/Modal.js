import React, {useState} from 'react'
import './style.scss'
import {useSelector, useDispatch} from 'react-redux'
import {ALERT_CLOSE} from '../../constants/actionTypes'

function Modal() {
    const alert = useSelector((state) => state.alert);
    const dispatch = useDispatch()

    function handleClick(){
        dispatch({type: ALERT_CLOSE, payload:'none'})
    }

    return (
        <div className='modal-bg' style={{display:alert.display}}>
            <div className="pop-up">
                <img src={`images/${alert.img}`} alt="" />
                <h2>{alert.title}</h2>
                <p>{alert.desc}</p>
                <div className={`button ${alert.type==='success'?'a':'b'}`} onClick={()=>handleClick()}>OK</div>
            </div>
        </div>
    )
}

export default Modal
