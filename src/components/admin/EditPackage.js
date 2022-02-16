import React, {useState, useEffect} from 'react'
import './editPackage.scss'
import Dropzone from 'react-dropzone'
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import {noImageUpdate} from '../../constants/dataAlert'
import {useDispatch} from 'react-redux'
import {updatePackage} from '../../actions/package'
import {ALERT_CHANGE} from '../../constants/actionTypes'

function EditPackage({id, open, setOpen, setSelectedPackage, setPaket, selectedPackage, paket}) {
    const [selectedFile, setSelectedFile] = useState(null)
    const [data, setData] = useState({isArrived:true, arrivalDate:''})
    const [value, onChange] = useState(new Date());
    const dispatch = useDispatch()

    const handleUpdate=()=>{
        if(data.image!==''){
            //update
            const formData = new FormData();
            formData.append('data', JSON.stringify(data))
            formData.append('bukti',selectedFile)
            const hasil = dispatch(updatePackage(id,formData))
            const printPaket = () => {
                hasil.then((a) => {
                    console.log("nowwww",a)
                    if(a!==undefined && a!==null){
                        console.log("hereee",a)
                        setSelectedPackage({...selectedPackage, isArrived:1, arrivalDate:a.arrivalDate, image:a.image})
                        console.log(id)
                        const temp=[]
                        paket.map(item=>{
                            if(item.id===id){
                                console.log(item.id, id)
                                temp.push({...item, isArrived:1, arrivalDate:a.arrivalDate, image:a.image})
                            }else{
                                console.log(item.id, id)
                                temp.push(item)
                            }
                        })
                        setPaket(temp)
                        console.log(temp)
                        console.log(selectedPackage, paket)
                    }
                });
            };
            printPaket()
            setOpen(false)
        }else{
            //alert
            dispatch({type: ALERT_CHANGE, payload: noImageUpdate})
            
        }
    }
    
    useEffect(() => {
      setData({...data, arrivalDate:`${value.getDate()}-${value.getMonth()+1}-${value.getFullYear()} ${value.getHours()}:${value.getMinutes()}`});
    }, [value]);

//     async function getFile(file) {
//       const image = await base64(file)
//       setData({...data, image:image})
//       setSelectedFile(file.name);
//   }

    return (
        <div className='more' style={{display:open?'flex':'none', width:'max-content'}}>
            <img src="images/close.png" alt="" className='close-info' onClick={()=>setOpen(false)}/>
            
            <div className="edit-container">
            <Dropzone
                onDrop={files =>setSelectedFile(files[0])}
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
                    <p className='selected-file'>{selectedFile?.name}</p>
                </div>
                )}
            </Dropzone>
            <div className="calendar-zone">
                <Calendar onChange={onChange} value={value} className="calendar"/>
                <button className='button' onClick={handleUpdate}>simpan perubahan</button>
            </div>
            
            </div>
        </div>
    )
}

export default EditPackage
