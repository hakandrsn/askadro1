import { getAuth } from 'firebase/auth'
import React from 'react'
import { Link } from 'react-router-dom'
import "./SideBar.css"
const SideBar = (props) => {
  const data = {
    company: "company",
    employee: "employee",
    settings: "settings"
  }
  const logout = async () => {
    const auth = getAuth()
    await auth.signOut(auth)
    console.log("sd")
  }
  return (
    <div id={props.id}>

      <div className='sidebar-container'>

        <div className='sidebar-item'>
          <input type="checkbox" id='cb1' className='sidebar-cb1' />
          <label className='sidebar-label' htmlFor='cb1' data-name={data.company}>
            <div className='sidebar-icon'></div>
          </label>
          <ul className='sidebar-list'>
            <Link className='sidebar-link' to="/">Şirket Listesi</Link>
            <Link className='sidebar-link' to="/newcompany">Yeni Şirket Ekle </Link>
            <Link className='sidebar-link' to="/tax">Fatura Gönder</Link>
          </ul>
        </div>
        <div className='sidebar-item'>
          <input type="checkbox" id='cb2' className='sidebar-cb2' />
          <label className='sidebar-label' htmlFor='cb2' data-name={data.employee}>
            <div className='sidebar-icon'></div>
          </label>
          <ul className='sidebar-list'>
            <Link className='sidebar-link' to="/employees">Personel Listesi</Link>
            <Link className='sidebar-link' to="/newemployee">Yeni Personel Ekle </Link>
            <Link className='sidebar-link' to="/">Fatura Gönder</Link>
          </ul>
        </div>
        <div className='sidebar-item'>
          <input type="checkbox" id='cb3' className='sidebar-cb3' />
          <label className='sidebar-label' htmlFor='cb3' data-name={data.settings}>
            <div className='sidebar-icon'></div>
          </label>
          <ul className='sidebar-list'>
            <Link className='sidebar-link' to="/">Hesap Ayarları</Link>
            <Link className='sidebar-link' to="/">Geçmiş İşlemler</Link>
            <Link className='sidebar-link' to="/">Site Düzeni</Link>
            <Link className='sidebar-link' to="/" onClick={() => logout()}>Çıkış Yap</Link>



          </ul>
        </div>

      </div>

    </div>
  )
}

export default SideBar