import React, {useState} from 'react'
import Dropzone from 'react-dropzone'
import {useDispatch} from 'react-redux'
import {updateUser} from '../../actions/user'

function Form({user, open, setOpen}) {
    const [data, setData] = useState({name:user.name, email:user.email, image:user.image, phone:user.phone, address:user.address, google:user.google})
    const [file, setFile ] = useState(null)
    const dispatch = useDispatch()

    const handleChange =(e)=>{
        e.preventDefault()
        const isEmpty = !Object.values(data).some(x => x !== null && x !== '');
        if(!isEmpty){
            const formData = new FormData();
            formData.append('data', JSON.stringify(data))
            formData.append('user',file)
            dispatch(updateUser(user.id, formData))
            setOpen(false)
        }
    }


    return (
        <div className='modal-bg' style={{display:open?'flex':'none'}}>
            <div className='more' style={{width:'max-content'}}>
            <img src="images/close.png" alt="" className='close-info' onClick={()=>setOpen(false)}/>
            
            <div className="edit-container">
            <Dropzone
                onDrop={(files) => setFile(files[0])}
                accept="image/*"
                minSize={1024}
                maxSize={3072000}
                maxFiles={0}
                multiple={false}
            >
                {({ getRootProps, getInputProps }) => (
                <div {...getRootProps({ className: "drop-zone" })}>
                    <input {...getInputProps()} />
                    <img src="images/upload-image.png" alt="" />
                    <p>Jatuhkan Gambar disini atau pilih</p>
                    <p className="selected-file">{file?.name}</p>
                </div>
                )}
            </Dropzone>
                <div className="account-form-container">
                    <table>
                        <tr>
                            <td><p>Nama</p></td>
                            <td><input type="text" value={data.name} onChange={(e)=>setData({...data, name:e.target.value})}/></td>
                        </tr>
                        <tr>
                            <td><p>Email</p></td>
                            <td><input type="text" value={data.email} onChange={(e)=>setData({...data, email:e.target.value})} /></td>
                        </tr>
                        <tr>
                            <td><p>No Hp</p></td>
                            <td><input type="text" value={data.phone} onChange={(e)=>setData({...data, phone:e.target.value})} /></td>
                        </tr>
                        <tr>
                            <td><p>Alamat</p></td>
                            <td><textarea name="" id="" cols="30" rows="3" value={data.address} onChange={(e)=>setData({...data, address:e.target.value})}></textarea></td>
                        </tr>
                    </table>
                    <button className='button' onClick={(e)=>handleChange(e)}>simpan</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Form
