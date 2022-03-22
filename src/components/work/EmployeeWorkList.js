import React, { useState, useEffect } from 'react'
import history from '../../history'
import Modal from '../modals/Modal'

const EmployeeWorkList = (props) => {
  const [veri, setVeri] = useState([])
  const [dongu, setDongu] = useState([])
  const [otherVeri, setOtherVeri] = useState(["tim", "time", "myTime"]) // zamanla alakalı olanlar
  const { id, time } = props.match.params

  const renderContent = () => {
    return (
      <div>
        hakan
      </div>
    )
  }
  return (
    <Modal
      title="methaba"
      content={renderContent()}
      onDismiss={() => history.goBack()}
    />
  )
}

export default EmployeeWorkList