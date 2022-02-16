import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import './style.scss'
import More from './More'
import { getPackages } from '../../actions/package'

function Dashboard() {
    const [paket, setPaket] = useState([])
    const [id, setId]=useState(null)
    const [open, setOpen]=useState(false)
    const [selectedPackage, setSelectedPackage] = useState(null)
    const dispatch = useDispatch()

    useEffect(()=>{
        console.log("nahajdkadfk")
        const data = dispatch(getPackages())

        const printPaket = () => {
            data.then((a) => {
                if(a!==undefined && a!==null){
                    setPaket(a)
                }
            });
        };
          
        printPaket()
    },[])


    function getId(id){
        if(id!==null){
            setSelectedPackage(paket.find((el)=>{return el.id===id}))
            setOpen(true)
        }
    }

    return (
        <div className='dashboard'>
            <More
                selectedPackage={selectedPackage}
                open={open}
                setOpen={setOpen}
                setSelectedPackage={setSelectedPackage}
                setPaket={setPaket}
                paket={paket}
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
                    paket.map((item)=>(
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

export default Dashboard
