import React, {useState} from 'react'
import './style.scss'
import {GoogleLogin} from 'react-google-login'
import {Link, useHistory} from 'react-router-dom'
import {checkUser} from '../../actions/user'
import {useDispatch, useSelector} from 'react-redux'
import {PACKAGES_CLEAR} from '../../constants/actionTypes'


function Login() {
    const currentUser = useSelector((state) => state.user?.user);
    const [user, setUser] = useState({email:'', password:'', token:''})
    const dispatch = useDispatch()
    let history = useHistory()

    const handleLogin=(e)=>{
        e.preventDefault()
        dispatch(checkUser(user,history))
    }


    const googleSuccess =async (res)=>{
        const result = res?.profileObj
        const token = res?.tokenId
        dispatch(checkUser({email:result.email, password:result.googleId, token:token}))
        dispatch({type: PACKAGES_CLEAR})
        history.push('/')
    }
    const googleFailure =(error)=>{
        console.log('google sign in was unsuccessfull')
        console.log(error)
    }
    return (
        <div className='auth'>
            <img src="images/login.png" alt="" />
            <div className="form-container">
                <form action="" className='auth-form' onSubmit={(e)=>handleLogin(e)}>
                    <h2>Selamat Datang</h2>
                    <input type="email" placeholder='Email Address' required onChange={(e)=>setUser({...user, email:e.target.value})}/>
                    <input type="password" placeholder='Password' required onChange={(e)=>setUser({...user, password:e.target.value})}/>
                    <button className='button' type='submit'>login</button>
                </form>
                <p>atau login dengan</p>
                <GoogleLogin
                    clientId='487292085207-et1jo8qnf7qjb20402tnt9fjrij8cra7.apps.googleusercontent.com'
                    render={(renderProps)=>(
                        <img src="images/googleLogo.png" alt="" className='google' onClick={renderProps.onClick} disabled={renderProps.disabled}/>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy='single_host_origin'
                />  
                <p>
                    <Link to='register' className='link-auth'>
                        tidak punya akun daftar disini
                    </Link>
                </p>
            </div>
            
        </div>
    )
}

export default Login
