import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchEmployee } from '../../actions'
import { Companys, EmployeeWorks } from '../../actions/fireTypes'
import { db } from '../../services/firebase'
import "./EmployeeShow.css"
import { mapKeys } from "lodash"

const EmployeeShow = (props) => {
  const [veri, setVeri] = useState([])
  const [compVeri, setCompVeri] = useState([])
  const { id } = props.match.params
  veri.sort((a, b) => {
    if (a.myTime < b.myTime) return 1
    if (a.myTime > b.myTime) return -1
    return 0
  })

  useEffect(() => {
    getList()
    return ()=>{
      getList()
    }
  }, [])
  const getEmployeeWork = async (id) => {
    try {
      const res = await getDoc(doc(db, EmployeeWorks, id))
      setVeri(Object.values({ ...res.data() }))
    } catch (e) {
      console.log(e)
    }
  }
  const getList = async () => {
    const list = []
    await filteredVeri()
      .then(a => {
        Object.values(a).forEach(async b => {
          await getComp(b)
            .then(c => {
              list.push(c)
            })
        })
      })
    setCompVeri(list)
  }
 compVeri && console.log(compVeri)

  const getComp = async (id) => {
    try {
      const res = (await getDoc(doc(db, Companys, id)))
      const response = { ...res.data(), id: res.id }
      return response
    } catch (error) {
      console.log(error)
    }
  }
  const filteredVeri = async () => {
    const list = []
    await getEmployeeWork(id)
    veri.filter(a => {
      if (list.includes(a.id)) return;
      list.push(a.id)
    })
    return list
  }
  if (!props.employee) {
    return <div>Loading...</div>
  }
  const renderEmployee = () => {
    const emp = props.employee
    return (
      <div className='show-emp'>
        <div className='show-emp-list'>
          <div className='emp-title'> {emp.fullName} </div>
          <div className='description'>Adresi : {emp.address} </div>
          <div className='description'>Tel : {emp.phone} </div>
          <div className='description'>TC : {emp.tc} </div>
          <div className='description'>Hes Kodu : {emp.hesCode} </div>
          <div className='description'>İban : {emp.iban} </div>
          <div className='description'>Email : {emp.email} </div>
          <div className='description'>Şifre : {emp.password} </div>
          <div className='description'>Pozisyonu : {emp.workType} </div>
        </div>
        <Link to={`/employee/works/${emp.id}`} className="emp-go-btn">
          <i className="add icon"></i>
          Personel Gönder
        </Link>
      </div>
    )
  }
  const getName =()=>{
    const list =[]
    veri && veri.forEach((y)=>{
      const a = compVeri.find(a=>a.id===y.id)
      list.push({...y,cn:a.companyName})
    })
    console.log(list)
  }
  const renderWorks = () => {
    return veri && veri.map((work, i) => {
      return (
        <Link to={`/employee/work/${id}/${work.myTime}`} className='list-item' key={i} >
          <div className='list-content'>
            <span> <strong>{work.myTime}</strong>{`'de ${work.tim} Saatinde ${work.id}  şirketinde`}</span>
          </div>
        </Link>)
    })
  }
  return (
    <div className='show-container'>
      {renderEmployee()}
      {renderWorks()}
    </div>
  )
}
const mapStateToProps = (state, ownProps) => {

  return {
    employee: state.employees[ownProps.match.params.id],
  }
}
export default connect(mapStateToProps, { fetchEmployee })(EmployeeShow)