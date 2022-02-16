import React from 'react'
import NumberFormat from 'react-number-format'
import NoImg from './NoImg'
import {unitCurrency, unitWeight} from '../../constants/defaultData'

function More({paket, open, setOpen}) {
    return (
        <div className='modal-bg' style={{display:open?'flex':'none'}}>
            <div className="more" style={{display:open?'unset':'none'}}>
                <img src={"images/close.png"} alt="" className='close-info' onClick={()=>setOpen(false)}/>

                <div className="flex">
                    {paket?.image!==null?(
                        <img src={`${paket?.image}`} alt="" className='prove-img'/>
                        ):(
                            <NoImg/>
                        )
                    }
                    

                    <div className="info-container">
                        <div className="info">
                            <h3>Informasi Barang</h3>
                            <span>
                                <p>Resi</p>
                                <p>{paket?.id}</p>
                            </span>
                            <span>
                                <p>Berat</p>
                                <p>{`${paket?.weight} ${unitWeight}`}</p>
                            </span>
                        </div>

                        <div className="info">
                            <h3>Informasi Penerima</h3>
                            <span>
                                <p>Nama</p>
                                <p>{paket?.recipientName}</p>
                            </span>
                            <span>
                                <p>Alamat</p>
                                <p>
                                    {paket?.recipientAddress}
                                </p>
                            </span>
                            <span>
                                <p>No Hp</p>
                                <p>{paket?.recipientPhone}</p>
                            </span>
                            <span>
                                <p>Kode Pos</p>
                                <p>{paket?.postalCode}</p>
                            </span>
                        </div>

                        <div className="info">
                            <h3>Informasi Pengiriman</h3>
                            <span>
                                <p>Tanggal Kirim</p>
                                <p>{paket?.sendDate}</p>
                            </span>
                            <span>
                                <p>Tanggal Sampai</p>
                                <p>{paket?.arrivalDate!==null?paket?.arrivalDate:'Belum Sampai'}</p>
                            </span>
                            <span>
                                <p>Harga</p>
                                <NumberFormat 
                                    value={paket?.price}
                                    className="formatText-2" 
                                    displayType={'text'} 
                                    thousandSeparator={true} 
                                    prefix={`${unitCurrency}. `} 
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>    )
}

export default More
