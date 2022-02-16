import React, {useState, useEffect} from 'react'
import './style.scss'
import NumberFormat from 'react-number-format';
import {useDispatch, useSelector} from 'react-redux'
import {createPackage} from '../../actions/package'
import {unitWeight, pricePerUnit, unitCurrency} from '../../constants/defaultData'

function Form() {
    const user = useSelector((state) => state.user.user);
    const [paket, setPaket] = useState({
        idUser:user.id,recipientName:'', recipientPhone:'', recipientState:'', recipientCity:'', recipientAddress:'', postalCode:'', senderName:user.name, senderAddress:'', senderPhone:'', weight:'', price:''
    })

    const [provinces, setProvinces] = useState([])
    const [cities, setCities] = useState([])
    const [idProvince, setIdProvince] = useState(11)
    const API_KEY = '95c98086f93db6de7ff1e36d2778a1b93e3d2a687c871a3d4caf43da89b32f00';
    const dispatch = useDispatch()

    function getSelectedProvince(t){
        let x = document.getElementById("province").selectedIndex;
        let y = document.getElementById("province").options;
        let index = y[x].index;
        setIdProvince(provinces[index].id);
        setPaket({...paket, recipientState:t.target.value})
    }

    const getProvince=async()=>{
        const response =await fetch(`https://api.binderbyte.com/wilayah/provinsi?api_key=${API_KEY}`);
        const data=await response.json();
        setProvinces(data.value);
        setPaket({...paket, recipientState:provinces[0].name})
        getCities()
    }

    const getCities=async()=>{
        const response =await fetch(`https://api.binderbyte.com/wilayah/kabupaten?api_key=${API_KEY}&id_provinsi=${idProvince}`);
        const data=await response.json();
        setCities(data.value);
        setPaket({...paket, recipientCity:cities[0].name})
    }

    useEffect(()=>{
        getProvince()
    },[])

    useEffect(()=>{
        getCities()
    },[idProvince])

    function handleSubmit(e){
        e.preventDefault()
        dispatch(createPackage(paket))
        console.log("created", paket)
        clear()
    }

    function clear(){
        setPaket({
            idUser:user.id, recipientName:'', recipientPhone:'', recipientState:'', recipientCity:'', recipientAddress:'', postalCode:'', senderName:'', senderAddress:'', senderPhone:'', weight:'', price:''
        })
    }

    return (
        <form action="" className='send-form' onSubmit={(e)=>handleSubmit(e)}>
            <div className="form-container">
                <div className="form-section">
                    <h3>Informasi Pengirim</h3>
                    <table>
                        <tr>
                            <td><p>Nama Pengirim</p></td>
                            <td><input type="text" value={paket.senderName} required onChange={(e)=>setPaket({...paket, senderName:e.target.value})}/></td>
                        </tr>
                        <tr>
                            <td><p>No Hp Pengirim</p></td>
                            <td><input type="text" value={paket.senderPhone} required onChange={(e)=>setPaket({...paket, senderPhone:e.target.value})}/></td>
                        </tr>
                        <tr>
                            <td><p>Alamat Pengirim</p></td>
                            <td><input type="text" value={paket.senderAddress} required onChange={(e)=>setPaket({...paket, senderAddress:e.target.value})}/></td>
                        </tr>
                    </table>
                </div>

                <div className="form-section">
                    <h3>Informasi Penerima</h3>
                    <table>
                        <tr>
                            <td><p>Nama Penerima</p></td>
                            <td><input type="text" value={paket.recipientName} required onChange={(e)=>setPaket({...paket, recipientName:e.target.value})}/></td>
                        </tr>
                        <tr>
                            <td><p>No Hp Penerima</p></td>
                            <td><input type="text" value={paket.recipientPhone} required onChange={(e)=>setPaket({...paket, recipientPhone:e.target.value})}/></td>
                        </tr>
                        <tr>
                            <td><p>Provinsi</p></td>
                            <td>
                                <select name="" id="province" onChange={(e)=>getSelectedProvince(e)} value={paket.recipientState}>
                                    {
                                        provinces.map((item)=>(
                                            <option value={item.name}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><p>Kota</p></td>
                            <td>
                                <select name="" id="city" key={idProvince} onChange={(e)=>setPaket({...paket, recipientCity:e.target.value})} value={paket.recipientCity}>
                                    {
                                        cities?.map((item)=>(
                                            <option value={item.name}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><p>Alamat Lengkap</p></td>
                            <td><input type="text" value={paket.recipientAddress} required onChange={(e)=>setPaket({...paket, recipientAddress:e.target.value})}/></td>
                        </tr>
                        <tr>
                            <td><p>Kode Pos</p></td>
                            <td><input type="text" value={paket.postalCode} required onChange={(e)=>setPaket({...paket, postalCode:e.target.value})}/></td>
                        </tr>
                    </table>
                </div>

                <div className="form-section">
                    <h3>Informasi Barang</h3>
                    <table>
                        <tr>
                            <td><p>Berat {unitWeight}</p></td>
                            <td><input type="number" value={paket.weight} onChange={(e)=>setPaket({...paket, weight:e.target.value, price:e.target.value*pricePerUnit})}/></td>
                        </tr>
                    </table>
                </div>
            </div>

            <div className="summary">
                <h3>Ringkasan</h3>
                <span>
                    <p>Nama Penerima</p>
                    <p>{paket.recipientName}</p>
                </span>
                <span>
                    <p>Alamat Penerima</p>
                    <p>{paket.recipientAddress}</p>
                </span>
                <span>
                    <p>Berat Barang</p>
                    <p>{`${paket.weight} ${unitWeight}`}</p>
                </span>

                <div className="line"></div>
                <span>
                    <p>Harga per {unitWeight}</p>
                    <NumberFormat 
                        value={14000} 
                        className="formatText" 
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={`${unitCurrency}. `} 
                    />
                </span>
                <span>
                    <p>Total</p>
                    <NumberFormat 
                        value={paket.price}
                        className="formatText" 
                        displayType={'text'} 
                        thousandSeparator={true} 
                        prefix={`${unitCurrency}. `} 
                    />
                </span>

                <button className='button' type='submit'>kirim</button>
            </div>
        </form>
    )
}

export default Form
