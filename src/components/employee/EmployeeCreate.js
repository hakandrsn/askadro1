import React from 'react'
import EmployeeForm from './EmployeeForm'
import { connect } from 'react-redux'
import { createEmployee } from "../../actions"
import "./EmployeeForm.css"

const EmployeeCreate = (props) => {

  const onSubmit = (data) => {
    props.createEmployee(data)
  }

  return (
    <div className='form-container'>
      <h2 className='form-title'>Personel Ekle</h2>
      <EmployeeForm onSubmit={onSubmit} />
    </div>
  )
}

export default connect(null, { createEmployee })(EmployeeCreate)