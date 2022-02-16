import React, {useState} from 'react'
import './style.scss'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {loginAdmin} from '../../actions/user'

function Login() {
    const [password, setPassword] = useState({password:''})
    const dispatch = useDispatch()
    let history = useHistory()

    const handleLogin=(e)=>{
        e.preventDefault()
        dispatch(loginAdmin(password))
        history.push('/admin')
    }

    return (
        <div className='auth'>
            <img src="images/admin-login.png" alt="" />
            <div className="form-container">
                <form action="" className='auth-form' onSubmit={(e)=>handleLogin(e)}>
                    <h2>Login untuk akses admin panel</h2>
                    <input type="password" placeholder='Password' required onChange={(e)=>setPassword({password:e.target.value})}/>
                    <button className='button' type='submit'>login</button>
                </form>
                <p>
                    <Link to='/' className='link-auth'>
                        kembali ke halaman utama
                    </Link>
                </p>
            </div>
            
        </div>
    )
}

export default Login
