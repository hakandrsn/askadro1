import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCompanys } from '../../actions'
import "./CompanyList.css"
// import DowlandFolder from '../../utils/DowlandFolder'
 

const CompanyList = (props) => {
  useEffect(() => {
    props.fetchCompanys()
  }, [])
  const renderAdmin = (comp) => {
    if (props.companys) {
      return (
        <div className='admin-container'>
          <Link to={`/company/edit/${comp.id}`} className="edit-btn">
            Edit
          </Link>
          <Link to={`/company/delete/${comp.id}`} className="delete-btn">
            Delete
          </Link>
        </div>
      )
    }
  }

  const renderCompanys = () => {
    if (props.companys) {
      return props.companys.map(comp => {
        return (
          <div className='list-item' key={comp.id} >
          <Link to={`/company/${comp.id}`} className="list-content">
              <div className='list-header'> {comp.companyName} </div>
              <div className='list-description'>
                <span>{`Verdiği Ücret : ${comp.givePrice}`}</span>
                <span>{`Konumu : ${comp.location}`}</span>
              </div>
          </Link>
            {renderAdmin(comp)}
          </div>)
          
      })
    }
  }
  return (
    <div className='list-container'>
        <h2 className='list-title'>Şirketler</h2>
        {renderCompanys()}
    </div>
  )
}

const mapStateToProps = (state) => {
  return { companys: Object.values(state.companys) }
}


export default connect(mapStateToProps, { fetchCompanys })(CompanyList)