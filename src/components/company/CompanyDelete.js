import React from 'react'
import { connect } from 'react-redux'
import { deleteCompany } from '../../actions'
import Modal from "../modals/Modal"
import history from '../../history'
import "./CompanyDelete.css"

const CompanyDelete = (props) => {
  const { id } = props.match.params

  const onDeleteCompany = () => {
    props.deleteCompany(id)
    history.goBack()
  }
  const renderContent = () => {
  const comp = props.company
    return(
      <div className='content-container'>
        <label>{comp.companyName}</label>
        <label>{comp.email}</label>
        <label>{comp.location}</label>
        <label>{comp.humanResourceName}</label>
        <label>{comp.humanResourcePhone}</label>
        <label>{comp.taxNumber}</label>
        <label>{comp.givePrice}</label>


      </div>
    )
  }
const renderActions =()=>{
   return(
      <div className='actions-container'>
        <button onClick={()=>onDeleteCompany()} id='sil'>Sil</button>
        <button onClick={()=>history.goBack()} id='cancel'>Vazgeç</button>

      </div>
    )
}
  return (
    <div>
      <Modal
        onDismiss={() => history.goBack()}
        content={props.company && renderContent()}
        actions={props.company && renderActions()}
        title={`${props.company && props.company.companyName}`}
      />
    </div>
  )
}
const mapStateToProps = (state, ownProps) => {
  return { company: state.companys[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { deleteCompany })(CompanyDelete)