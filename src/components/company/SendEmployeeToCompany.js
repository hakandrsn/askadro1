import React, { useEffect, useState } from 'react'
import Modal from "../modals/Modal"
import history from '../../history'
import "./SendEmployeeToCompany.css"
import { connect } from 'react-redux'
import { fetctEmployees, fetchCompany, addWork, deleteWork, addWorksComp, addWorksEmp } from '../../actions'

const SendEmployeeToCompany = (props) => {
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [value, setValue] = useState("")
    const [cb, setCb] = useState("")
    const { id } = props.match.params
    const filteredCharacters = props.employees.filter((character) => {
        return (
            character.fullName.toLowerCase().includes(value) ||
            character.phone.toLowerCase().includes(value) ||
            character.tc.toLowerCase().includes(value)
        )
    })
    useEffect(() => {
        props.fetctEmployees()
        props.fetchCompany(id)
    }, [])
    const renderTitle = () => {
        return (
            <div className='title-container'>
                {props.company &&
                    `${props.company.companyName}
                 Şirketine Gönderilecek Personelleri Seçiniz`}
            </div>
        )
    }
    const renderActions = () => {
        return (
            <div className='action-container'>
                <button onClick={() => history.goBack()} className='cancel-btn'>Vacgeç</button>
                <button className='okey-btn' onClick={(event) => sendEmp(event)}>Tamamla</button>
            </div>
        )
    }
    const renderList = (data) => {
        return data && data.map((res) => {
            return (
                <div className='render-lists' key={res.id}>
                    <ul className='rendered-list'>
                        <li>{res.fullName} </li>
                        <li>{res.phone} </li>
                        <li>{res.workType} </li>
                    </ul>
                    <button className='add-btn' onClick={() => props.addWork(res)} >Ekle</button>
                </div>
            )
        })
    }
    const renderPersonel = () => {
        return props.works && props.works.map((res) => {
            return (
                <div className='render-personel-content' key={res.id}>
                    <span>{res.fullName}</span>
                    <button onClick={() => props.deleteWork(res.id)} className='inc-btn'>Çıkar</button>
                </div>
            )
        })
    }
    const sendEmp = (event) => {
        event.preventDefault()
        if (date && time && props.works) {
            props.addWorksComp(id, date, props.works, time, cb)
            props.addWorksEmp(id, date, props.works, time, cb)
            history.goBack()
        }
    }
    const renderTopInput = () => {
        return (
            <form className='nav-content'>
                <div className='date-and-time'>
                    <span>İş tarihini Seçiniz</span>
                    <input className='send-emp-date' type="date" onChange={e => setDate(e.target.value)} />
                    <span>İş saatini Seçiniz</span>
                    <input className='send-emp-now-date' type="time" onChange={e => setTime(e.target.value)} />
                </div>
                <span>Bu tarihli İş için personel Ücretini giriniz.</span>
                <input className='send-emp-date' type="number" onChange={e => setCb(e.target.value)} />
            </form>
        )
    }
    const renderContent = () => {
        return (
            <div className='modal-search-container'>
                {renderTopInput()}
                <div className='send-emp-tab-content'>
                    <div className='left-content'>
                        <div className='search-content'>
                            <label className='i-label'>Personel Ara</label>
                            <input placeholder='Search' type="search" className='s-input' onChange={(e) => setValue(e.target.value.toLowerCase())} />
                        </div>
                        <div className='list-content'>
                            {renderList(filteredCharacters)}
                        </div>
                    </div>
                    <div className='right-content'>
                        {renderPersonel()}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Modal
            title={renderTitle()}
            actions={renderActions()}
            content={renderContent()}
            onDismiss={() => history.goBack()}
        />

    )
}
const mapStateToProps = (state, ownProps) => {
    return {
        employees: Object.values(state.employees),
        company: state.companys[ownProps.match.params.id],
        works: Object.values(state.works),
        success: state.success
    }
}

export default connect(mapStateToProps, { fetctEmployees, fetchCompany, addWork, deleteWork, addWorksComp, addWorksEmp })(SendEmployeeToCompany)