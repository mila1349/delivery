import React, {useRef, useState} from 'react'
import './style.scss'
import {Link} from 'react-router-dom'
import Form from './Form'
import {useSelector, useDispatch} from 'react-redux'
import {updateUser} from '../../actions/user'

function Account() {
    const input = useRef(null)
    const [open, setOpen] = useState(false)
    const user = useSelector((state) => state.user.user);
    const packages = useSelector((state) => state.packages);
    const dispatch = useDispatch()

    //total package of user summary
    const all = packages.filter(({idUser}) => idUser===user.id).length
    const sent = packages.filter(({isArrived,idUser}) => idUser===user.id && isArrived === 1 ).length
    const inProgress = packages.filter(({isArrived, idUser}) => idUser===user.id && isArrived === 0).length

    const updateImage =()=>{
        input.current.click()
    }

    function getFile(file) {
        const formData = new FormData();
        formData.append('data', JSON.stringify(user))
        formData.append('user',file)
        dispatch(updateUser(user.id, formData))
    }
    console.log(user.image)
    return (
        <div className='account'>
            <Form
                user={user}
                open={open}
                setOpen={setOpen}
            />
            <section className='photo-profile'>
                <div className="photo">
                    <img src="images/change-image-profile.png" alt="" className="change-profile-img" onClick={updateImage}/>
                    {user.image===undefined || user.image===null?<img  src='images/noUser.png' alt="" className='foto'/>:<img  src={`${user?.image}`} alt="" className='foto'/>}
                    <input type="file" ref={input} onChange={(e)=>getFile(e.target.files[0])}/>
                </div>
            </section>
            <section className='description'>
                <div className='desc-info'>
                    <div className="name">
                        <h2>{user.name}</h2>
                        <img src="images/update-profile.png" alt="" onClick={()=>setOpen(true)}/>
                    </div>
                    
                    <p>{user.email}</p>
                </div>
                <div className='desc-info'>
                    <p>{user.address}</p>
                    <p>{user.phone}</p>
                </div>
                <div className='package-total'>
                    <span>
                        <h2>{all}</h2>
                        <p>Paket</p>
                    </span>
                    <span>
                        <h2>{sent}</h2>
                        <p>Terkirim</p>
                    </span>
                    <span>
                        <h2>{inProgress}</h2>
                        <p>Dikirim</p>
                    </span>
                    <Link to="/kirim">
                        <button className='button'>kirim</button>
                    </Link>
                </div>
                {/* <form action="">
                    <input type="file" />
                    <button>submit</button>
                </form> */}
            </section>
        </div>
    )
}

export default Account
