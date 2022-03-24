import { doc, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchEmployee, getWorksEmp } from '../../actions'
import { EmployeeWorks } from '../../actions/fireTypes'
import { db } from '../../services/firebase'
import "./EmployeeShow.css"

const EmployeeShow = (props) => {
  const [veri, setVeri] = useState([])
  const { id } = props.match.params
  const [paying, setPaying] = useState(null)
  const [reflesh,setReflesh] = useState(null)

  const sorting =(veri)=>{
    if(veri){
      veri.sort((a,b)=>{
        if(new Date(a.date) < new Date(b.date)) return 1
        if(new Date(a.date) > new Date(b.date)) return -1
        return 0
      })
    }
  }
  useEffect(() => {
    props.getWorksEmp(id)
    sorting(props.works)
    setVeri(props.works)
  }, [paying,reflesh])
  const payPrice = async (work) => {
    try {
      const way = doc(db, EmployeeWorks, id)
      let isWhat= work.pay ? false :true
      await setDoc(way, {
        [work.date]: { pay: isWhat }
      }, { merge: true })
      setPaying(new Date().getSeconds())
    } catch (e) {

    }
  }
  const renderWorks = () => {
    return veri && veri.map((work, i) => {
      return (
        <div className='list-item' key={i}>
          <Link to={`/employee/work/${id}/${work.date}`} className='list-item' >
            <div className='list-content'>
              <span> {i + 1}.  <strong>{work.date}</strong>{`'de ${work.hour} Saatinde ${work.name}  şirketinde`}</span>
            </div>
          </Link>
          <button onClick={() => payPrice(work)} className={`${work.pay === true ? "true-btn" : "false-btn"}`} > {`${work.pay === true ? "Ödendi" : "Öde"}`} </button>

        </div>)
    })
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
          Personel Gönder
        </Link>
        <button onClick={()=>setReflesh(!reflesh)} className='reflesh-btn'>Yenile</button>
      </div>
    )
  }
  if (!props.employee) {
    return <div>Loading...</div>
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
    works: state.workData.data
  }
}
export default connect(mapStateToProps, { fetchEmployee, getWorksEmp })(EmployeeShow)