import React, {useState, useEffect} from 'react'
import './style.scss'
import {useSelector, useDispatch} from 'react-redux'
import More from '../popUp/More'
import {getPackageUser} from '../../actions/package'

function History() {
    const userId = useSelector((state) => state.user.user.id);
    const packages = useSelector((state) => state.packages);
    const [id, setId]=useState(null)
    const [open, setOpen]=useState(false)
    const [selectedPackage, setSelectedPackage] = useState(null)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getPackageUser(userId))
    },[])

    function getId(id){
        if(id!==null){
            setSelectedPackage(packages.find((el)=>{return el.id===id}))
            setOpen(true)
        }
    }
    
    return (
        <div className='history'>
            <More
                paket={selectedPackage}
                open={open}
                setOpen={setOpen}
            />
            <table>
                <tr>
                    <th></th>
                    <th>Resi</th>
                    <th>Nama Penerima</th>
                    <th>Alamat Penerima</th>
                    <th>Tanggal Kirim</th>
                    <th>Status</th>
                    <th></th>
                </tr>

                {
                    packages.map((item)=>(
                        <tr>
                            <td>
                                <img src="images/historyImg.png" alt="" />
                            </td>
                            <td>{item.id}</td>
                            <td>{item.recipientName}</td>
                            <td>{item.recipientAddress}</td>
                            <td>{item.sendDate}</td>
                            <td>
                                <div className={`status ${item.isArrived?'delivered':'undelivered'}`}>{item.isArrived?'Terkirim':'Dikirim'}</div>
                            </td>
                            <td>
                                <img src="images/more.png" alt="" className='more-img' onClick={()=>getId(item.id)}/>
                            </td>
                        </tr>
                    ))
                }
            </table>
        </div>
    )
}

export default History
