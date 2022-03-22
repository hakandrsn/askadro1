import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchCompany, editCompany } from '../../actions'
import CompanyForm from './CompanyForm'
import "./CompanyForm.css"

const CompanyEdit = (props) => {
  const { id } = props.match.params
  useEffect(() => {
    props.fetchCompany(id)
  }, [])
  const onSubmit = (data) => {
    props.editCompany(id,data)
  }
  if(!props.company){
    return <div>Loading</div>
  }
  return (
    <div className='form-container'>
      <div className='form-title'>{props.company && props.company.companyName}</div>
      <CompanyForm onSubmit={onSubmit} initialValues={props.company} />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return { company: state.companys[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchCompany ,editCompany})(CompanyEdit)