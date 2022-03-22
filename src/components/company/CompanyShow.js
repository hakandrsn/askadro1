import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCompany } from '../../actions'
import { CompanyWorks } from '../../actions/fireTypes'
import { db } from '../../services/firebase'
import "./CompanyShow.css"

const CompanyShow = (props) => {
  const [date, setDate] = useState("")
  const [veri, setVeri] = useState([])

  const { id } = props.match.params

  veri.sort((a,b)=>{
    if(a.myTime < b.myTime) return 1
    if(a.myTime > b.myTime) return -1
    return 0
  })
  
  useEffect(() => {
    const getCompanyWork = async (id) => {
      const res = await getDoc(doc(db, CompanyWorks, id))
      setVeri(Object.values({ ...res.data() }))
    }
    getCompanyWork(id)
  }, [])
  if (!props.company) {
    return <div>Loading...</div>
  }
  const renderCompany = () => {
    const comp = props.company
    return (
      <div className='show-comp'>
        <ul className='show-comp-list'>
          <li className='header'>{comp.companyName}</li>
          <li className='description'>{comp.humanResourceName}</li>
          <li className='description'>{comp.humanResourcePhone}</li>
          <li className='description'>{comp.email}</li>
          <li className='description'>{comp.location}</li>
          <li className='description'>{comp.servis}</li>
          <li className='description'>{comp.givePrice}</li>
          <li className='description'>{comp.taxNumber}</li>
        </ul>
        <Link to={`/company/send/${comp.id}`} className="employee-go-btn">
          <i className="add icon"></i>
          Personel Gönder
        </Link>
      </div>
    )
  }

  const renderAdmin = (work) => {
    if (work) {
      return (
        <div className='admin-container'>
          <Link to="/" className="edit-btn">
            Personel Ekle
          </Link>
          <Link to="/" className="delete-btn">
            Ödeme Alındı
          </Link>
        </div>
      )
    }
  }
  const renderList = () => {
    return veri && veri.map(work => {
      return (
        <Link to={`/company/work/${id}/${work.myTime}`} className='list-item' key={work.id} >
          <div className='list-content'>
            <span> <strong>{work.myTime}</strong> Tarihli İşler İçin Tıkla.</span>
          </div>
          {renderAdmin(work)}
        </Link>)
    })
  }

  const renderTable = () => {
    return (
      <div className='all-table-container'>
        <div className='nav-table'>
          <input className='table-i-date' type="date" onChange={value => setDate(value.target.value)} />
          <div className='table-now-date'>
            {date && date}
          </div>
        </div>
        {renderList()}
      </div>
    )
  }
  return (
    <div className='show-container'>
      {renderCompany()}
      {renderTable()}
    </div>
  )
}
const mapStateToProps = (state, ownProps) => {
  return {
    company: state.companys[ownProps.match.params.id],
  }
}
export default connect(mapStateToProps, { fetchCompany })(CompanyShow)