import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetctEmployees } from '../../actions'
import "./EmployeeList.css"

const EmployeeList = (props) => {
  useEffect(() => {
    props.fetctEmployees()
  }, [])


  const renderAdmin = (emp) => {
    if (props.employees) {
      return (
        <div className='admin-container'>
          <Link to={`/employee/edit/${emp.id}`} className="edit-btn">
            Edit
          </Link>
          <Link to={`/employee/delete/${emp.id}`} className="delete-btn">
            Delete
          </Link>
        </div>
      )
    }
  }

  const Employees = () => {
    if (!props.employees) return <div>Loading...</div>
    return (
      props.employees.map(emp => {
        return (
          <div className='list-item' key={emp.id}  style={{visibility:`${emp.visibility ? "visible":"hidden"}`}}>
            <Link className='list-content' to={`/employee/show/${emp.id}`}>
              <div className='list-header'> {emp.fullName} </div>
              <div className='list-description'>
                <span>
                  {`Tel : ${emp.phone}`} </span>
                <span>
                  {`Adres : ${emp.address}`}
                </span>
                <span>
                  {`Yaş :${emp.birthday}`}
                </span>
              </div>
            </Link>
            {renderAdmin(emp)}
          </div>
        )
      }))
  }
  return (
    <div>
      <div className='list-container' style={{ paddingTop: 10 }}>
        <h2 className='list-title'> Personel Listesi </h2>
        <Employees />
      </div >
    </div>
  )
}
const mapStateToProps = state => {
  return { employees: Object.values(state.employees) }
}

export default connect(mapStateToProps, { fetctEmployees })(EmployeeList)