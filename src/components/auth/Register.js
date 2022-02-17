import React, {useState} from 'react'
import Modal from '../popUp/Modal';
import {useDispatch, useSelector} from 'react-redux'
import {errorConfirm} from '../../constants/dataAlert'
import {createUser} from '../../actions/user'
import {GoogleLogin} from 'react-google-login'
import {Link, useHistory} from 'react-router-dom'
import {ALERT_CHANGE, PACKAGES_CLEAR} from '../../constants/actionTypes'

function Register() {
    const currentUser = useSelector((state) => state.user?.user);
    const [user, setUser] = useState({name:'', email:'', password:'', confirmPassword:''})
    const dispatch = useDispatch()
    let history = useHistory();
    
    const handleRegister=(e)=>{
        e.preventDefault()
        //check wheter password & confirm password match
        if(user.pass===user.confirmPass){
            dispatch(createUser(false,user,history))
        }else{
            dispatch({type: ALERT_CHANGE, payload: errorConfirm})
        }
    }

    const googleSuccess = async (res)=>{
        const result = res?.profileObj 
        dispatch(createUser(true,{name:result.name, email:result.email, password:result.googleId, token:res?.tokenId, image:result.imageUrl}))
        dispatch({type: PACKAGES_CLEAR})
        history.push('/')
    }
    const googleFailure =(error)=>{
        console.log('google sign in was unsuccessfull')
        console.log(error)
    }

    return (
        <div className='auth'>
            <Modal/>
            <img src="images/register2.png" alt="" />
            <div className="form-container">
                <form action="" className='auth-form' onSubmit={(e)=>handleRegister(e)}>
                    <h2>Daftar Akun</h2>
                    <input type="text" placeholder='Nama' required onChange={(e)=>setUser({...user, name:e.target.value})}/>
                    <input type="email" placeholder='Email Address' required onChange={(e)=>setUser({...user, email:e.target.value})}/>
                    <input type="password" placeholder='Password' required onChange={(e)=>setUser({...user, password:e.target.value})}/>
                    <input type="password" placeholder='Ulangi Password' required onChange={(e)=>setUser({...user, confirmPassword:e.target.value})}/>
                    <button className='button' type='submit'>Daftar</button>
                </form>
                <p>atau daftar dengan</p>
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
                    <Link to='login'>
                        sudah punya akun masuk disini
                    </Link>
                </p> 
            </div>
            
        </div>
    )
}

export default Register
