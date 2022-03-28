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

  const sorting =(ggg)=>{
    if(ggg){
      ggg.sort((a,b)=>{
        if(new Date(a.myTime) < new Date(b.myTime)) return 1
        if(new Date(a.myTime) > new Date(b.myTime)) return -1
        return 0
      })
    }
  }

  const getCompanyWork = async (id) => {
    const res = await getDoc(doc(db, CompanyWorks, id))
    setVeri(Object.values(res.data()))
  }
  sorting(veri)
  useEffect(() => {
    getCompanyWork(id)
    props.fetchCompany(id)
    
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
          Personel Gönder
        </Link>
      </div>
    )
  }

  const renderAdmin = (work) => {
    if (work) {
      return (
        <div className='admin-container'>
          <button className="edit-btn">
            Ödeme Alındı
          </button>
        </div>
      )
    }
  }
  const renderList = () => {
    return veri && veri.map((work,i) => {
      return (
        <div className='list-item' key={i}>
        <Link to={`/company/work/${id}/${work.myTime}`} className='list-item'  >
          <div className='list-content'>
            <span> <strong>{work.myTime}</strong> Tarihli İşler İçin Tıkla.</span>
          </div>
        </Link>
          {/* {renderAdmin(work)} */}
        </div>
        )
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