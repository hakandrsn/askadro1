import React from 'react'
import { connect } from 'react-redux'
import { createCompany } from "../../actions"
import CompanyForm from './CompanyForm'
import "./CompanyForm.css"

const CompanyCreate = (props) => {
  const onSubmit = (data) => {
    props.createCompany(data)
  }

  return (
    <div className='form-container'>
      <h2 className='form-title' >Yeni Bir Şirket Ekle</h2>
      <CompanyForm onSubmit={onSubmit} />
    </div>
  )
}


export default connect(null, { createCompany })(CompanyCreate)