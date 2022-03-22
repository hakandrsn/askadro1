import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { editEmployee, fetchEmployee } from '../../actions'
import EmployeeForm from './EmployeeForm'
import "./EmployeeForm.css"

const EmployeeEdit = (props) => {
  const { id } = props.match.params
  useEffect(() => {
    props.fetchEmployee(id)
  }, [])
  const onSubmit = (data) => {
    props.editEmployee(id, data)
  }
  return (
    <div className='form-container'>
      <div className='form-title'>Personel Düzenle</div>
      <EmployeeForm onSubmit={onSubmit} initialValues={props.employee} />
    </div>
  )
}
const mapStateToProps = (state, ownProps) => {
  return { employee: state.employees[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { editEmployee, fetchEmployee })(EmployeeEdit)