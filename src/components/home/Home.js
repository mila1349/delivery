import React, {useState, useEffect} from 'react'
import './style.scss'
import More from '../popUp/More'
import {useSelector, useDispatch} from 'react-redux'
import {ALERT_CHANGE} from '../../constants/actionTypes'
import {findPackageError} from '../../constants/dataAlert'
import {getPackage} from '../../actions/package'

function Home() {
    const [open, setOpen] = useState(false)
    const [id, setId] = useState(null)
    const [paket, setPaket] = useState(null)
    const dispatch = useDispatch()

    function getResi(e){
        e.preventDefault()
        const data = dispatch(getPackage(id))
        const printPaket = () => {
            data.then((a) => {
                if(a!==undefined && a!==null){
                    setPaket(a)
                    setOpen(true)
                }
            });
        };
          
        printPaket()
    }

    return (
        <div className='home' style={{backgroundImage:`url(images/home1.png)`}}>
            <More
                paket={paket}
                open={open}
                setOpen={setOpen}
            />
            
            <form action="" className="searchBar" onSubmit={(e)=>getResi(e)}>
                <div className="search">
                    <img src="images/search.png" alt=""/>
                    <input  type="text" value={id} onChange={(e)=>setId(e.target.value)} required/>
                </div>
                <button className='button' type='submit'>cari resi</button>
            </form>
        </div>
    )
}

export default Home
