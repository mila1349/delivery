import React, {useState} from 'react'
import NumberFormat from 'react-number-format'
import EditPackage from './EditPackage'
import '../popUp/more.scss'
import  NoImg from '../popUp/NoImg'

function More({selectedPackage, open, setOpen, setSelectedPackage, setPaket, paket}) {
    const [editOpen, setEditOpen] = useState(false)

    return (
        <div className='modal-bg' style={{display:open?'flex':'none'}}>
            <EditPackage 
                id={selectedPackage?.id} 
                open={editOpen}
                setOpen={setEditOpen}
                setSelectedPackage={setSelectedPackage}
                setPaket={setPaket}
                selectedPackage={selectedPackage}
                paket={paket}
            />

            <div className="more" style={{display:editOpen?'none':'unset'}}>
                <img src={"images/close.png"} alt="" className='close-info' onClick={()=>setOpen(false)}/>

                <div className="flex">
                    {selectedPackage?.image!==null?(
                        <img src={selectedPackage?.image} alt="" className='prove-img'/>
                        ):(
                            <NoImg/>
                        )
                    }
                    

                    <div className="info-container">
                        <div className="info">
                            <h3>Informasi Barang</h3>
                            <span>
                                <p>Resi</p>
                                <p>{selectedPackage?.id}</p>
                            </span>
                            <span>
                                <p>Berat</p>
                                <p>{selectedPackage?.weight}Kg</p>
                            </span>
                        </div>

                        <div className="info">
                            <h3>Informasi Penerima</h3>
                            <span>
                                <p>Nama</p>
                                <p>{selectedPackage?.recipientName}</p>
                            </span>
                            <span>
                                <p>Alamat</p>
                                <p>
                                    {selectedPackage?.recipientAddress}
                                </p>
                            </span>
                            <span>
                                <p>No Hp</p>
                                <p>{selectedPackage?.recipientPhone}</p>
                            </span>
                            <span>
                                <p>Kode Pos</p>
                                <p>{selectedPackage?.postalCode}</p>
                            </span>
                        </div>

                        <div className="info">
                            <h3>Informasi Pengiriman</h3>
                            <span>
                                <p>Tanggal Kirim</p>
                                <p>{selectedPackage?.sendDate}</p>
                            </span>
                            <span>
                                <p>Tanggal Sampai</p>
                                <p>{selectedPackage?.arrivalDate!==null?selectedPackage?.arrivalDate:'Belum Sampai'}</p>
                            </span>
                            <span>
                                <p>Harga</p>
                                <NumberFormat 
                                    value={selectedPackage?.price}
                                    className="formatText-2" 
                                    displayType={'text'} 
                                    thousandSeparator={true} 
                                    prefix={'Rp. '} 
                                />
                            </span>
                        </div>
                    </div>
                </div>
                <button className='button' onClick={()=>setEditOpen(true)}>ubah</button>
            </div>
        </div>
    )
}

export default More
