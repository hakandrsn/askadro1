import React from 'react'
import { Link } from 'react-router-dom'
import "./Content.css"

const Content = (props) => {
  const year = new Date().getFullYear()
  console.log(props.search)
  const renderContent =()=>{
    if(!props.search || props.search.length > 10) return <div>Yazınız...</div>
     return props.search && props.search.map((res)=>{
        return(
          <Link key={res.id} className='render-content'
          to={`/employee/show/${res.id}`}
          >
            <span>Ad Soyad :{res.fullName}</span>
            <span>Tel :{res.phone}</span>
            <span>Yaş :{year - res.birthday.slice(0,4)}</span>
          </Link>
        )
      })
  }
  return (
    <div id={props.id} className="content-container">
        {renderContent()}
    </div>
  )
}

export default Content