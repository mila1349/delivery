import React from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {USER_LOGOUT} from '../../constants/actionTypes'

function NavAdmin() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user);

    const logout =()=>{
        dispatch({type: USER_LOGOUT})
    }
    return (
        <div className='nav'>
            <Link to="/"> 
                <img src="images/packageLogo.png" alt="" />
            </Link>
           

            <ul>
                <li><p>
                    <Link to='/'>Home</Link>
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

export default NavAdmin
