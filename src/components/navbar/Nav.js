import React, {useEffect} from 'react'
import './style.scss'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {USER_LOGOUT, USER_GET} from '../../constants/actionTypes'

function Nav() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch()

    const logout =()=>{
        dispatch({type: USER_LOGOUT})
    }

    useEffect(()=>{
      dispatch({type: USER_GET})
    },[dispatch])

    return (
        <div className='nav'>
            <Link to="/"> 
                <img src="images/packageLogo.png" alt="" />
            </Link>
           

            <ul>
                <li><p>
                     <Link to='/kirim'>Kirim</Link>
                </p></li>

                <li><p>
                    <Link to='/riwayat'>Riwayat</Link>
                </p></li>

                <li><p>
                    <Link to='/akun'>Akun</Link>
                </p></li>

                {user===null?(
                    <li><p>
                        <Link Link to='/login'>login</Link>
                    </p></li>
                ):(
                    <p onClick={()=>logout()} className='logout'>Logout</p>
                )}
                
            </ul>
        </div>
    )
}

export default Nav
