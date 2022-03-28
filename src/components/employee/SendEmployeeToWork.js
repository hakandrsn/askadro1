import React, { useEffect, useState } from 'react'
import Modal from '../modals/Modal'
import history from '../../history'
import { fetchCompanys, addWorksComp, addWorksEmp, fetchEmployee } from '../../actions'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import "./SendEmployeeToWork.css"

const SendEmployeeToWork = (props) => {
    const [emp,setEmp]=useState([])
    const { register, handleSubmit } = useForm()
    const { id } = props.match.params
    useEffect(() => {
        props.fetchCompanys()
        props.fetchEmployee(id)
        setEmp([props.employee])
    }, [])
    const onSubmit = (data) => {
        const compName = props.companys.filter(a => { if (a.companyName === data.company) return a })
        if (data.date && data.time) {
            props.addWorksComp(compName[0].id, data.date, emp, data.time, data.price)
            props.addWorksEmp(compName[0].id, data.date, emp, data.time, data.price)
        }
    }
    const renderTitle = () => {
        return (
            <div>Personelin Gideceği İş</div>
        )
    }
    // const renderActions = () => {
    //     return (
    //         <div>
    //             <button onClick={() => history.goBack()}>İptal</button>
    //             <button>Tamam</button>
    //         </div>
    //     )
    // }
    const renderComp = () => {
        return props.companys && props.companys.map((com) => {
            return (
                <option key={com.id}>{com.companyName}</option>
            )
        })
    }
    const renderType = () => {
        const type = ["Garson", "Komi", "Hostes", "Temzilikçi", "HK", "Depo Elemanı"]
        return type.map(a => {
            return (
                <option key={a}>{a}</option>
            )
        })
    }
    const renderContent = () => {
        return (
            <form onSubmit={handleSubmit(data => onSubmit(data))} className='emp-go-work'>
                <label htmlFor='company'>Gideceği Şirket</label>
                <select id='company' {...register("company")}>{renderComp()}</select>
                <label htmlFor='workType'>Çalışma Şekli</label>
                <select id='workType' {...register("workType")} type="text">{renderType()}</select>
                <label htmlFor='time'>Çalışacağı Saat</label>
                <input id='time' {...register("time")} type="time" defaultValue="15:00" />
                <label htmlFor='date'>Çalışacağı Tarih</label>
                <input id='date' {...register("date")} type="date" />
                <label htmlFor='price'>Alacağı Ücret</label>
                <input id='price' {...register("price")} type="number" placeholder='Alacağı Ücret' />
                <input type="submit" value="Ekle" />
            </form>
        )
    }
    return (
        <Modal
            title={renderTitle()}
            content={renderContent()}
            onDismiss={() => history.goBack()}
        />
    )
}
const mapStateToProps = (state, ownProps) => {
    return {
        companys: Object.values(state.companys),
        employee: state.employees[ownProps.match.params.id],
    }
}

export default connect(mapStateToProps, { fetchCompanys, addWorksComp, addWorksEmp, fetchEmployee })(SendEmployeeToWork)