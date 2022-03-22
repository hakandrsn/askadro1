import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { deleteEmployee, fetchEmployee } from '../../actions'
import Modal from "../modals/Modal"
import history from '../../history'

const EmployeeDelete = (props) => {
  const { id } = props.match.params
  useEffect(() => {
    props.fetchEmployee(id)
  }, [])
  const renderActions = () => {
    return (
      <React.Fragment>
        <button className='ui red basic button' onClick={() => deleteEmp()}>Sil</button>
        <button className='ui green basic button' onClick={()=>history.goBack()}>İptal</button>
      </React.Fragment>
    )
  }
  const deleteEmp = () => {
    props.deleteEmployee(id)
    history.goBack()
  }
  const renderContent = () => {
    return (
      <div className='ui card'>
        <div className='content'>
          <i className="right floated like icon"></i>
          <i className="right floated star icon"></i>
          <div className="header"> {props.employe && props.employe.fullName} </div>
          <div className="description">
            <p> {`Tel : ${props.employe.phone}`} </p>
            <p> {`iban : ${props.employe.iban}`} </p>
            <p> {`Hes Kodu : ${props.employe.hesCode}`} </p>
            <p> {`Adress : ${props.employe.address}`} </p>


          </div>
        </div>
      </div>
    )
  }

  return (
    <Modal
      title={props.employe && `${props.employe.fullName}' adlı kişiyi silmek istediğinizden eminmisiniz`}
      content={renderContent()}
      actions={renderActions()}
      onDismiss={() => history.goBack()}
    />
  )
}
const mapStateToProps = (state, ownProps) => {
  return { employe: state.employees[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { deleteEmployee, fetchEmployee })(EmployeeDelete)
