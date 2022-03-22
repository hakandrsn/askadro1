import React, { useEffect, useState } from 'react'
import { signOutManager, fetctEmployees } from '../../actions'
import { connect } from 'react-redux'
import "./Header.css"
const Header = (props) => {
  useEffect(() => {
    props.fetctEmployees()
  }, [])

  const [value, setValue] = useState("")
  const filteredCharacters = props.employees.filter((character) => {
    return (
      character.fullName.toLowerCase().includes(value) ||
      character.phone.toLowerCase().includes(value) ||
      character.tc.toLowerCase().includes(value)
    )
  })
  useEffect(() => {
    props.setSearch(filteredCharacters)
    props.setIsHave(value === "" ? false : true)
  }, [value])



  return (
    <div id={props.id} className='header-container'>
      <a href="http://as-kadro.com/" target="_blank" className='header-link'>
        as-kadro.com
      </a>
      <div className='header-input'>
        <input className='header-search' placeholder='Search' type="search" onChange={(e) => setValue(e.target.value.toLowerCase())} />
      </div>
      <select className='header-set'>
        <option >Çıkış</option>
        <option>Ayarlar</option>
        <option>Tema</option>

      </select>

    </div>
  )

}
const mapStateToProps = state => {
  return {
    employees: Object.values(state.employees)
  }
}


export default connect(mapStateToProps, { signOutManager, fetctEmployees })(Header)