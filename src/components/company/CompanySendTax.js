import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchCompanys } from '../../actions'
import Folder from '../../utils/Folder'
import "./CompanySendTax.css"

const CompanySendTax = (props) => {
    useEffect(() => {
        props.fetchCompanys()
    }, [])
    const renderSelect = () => {
        return props.companys && props.companys.map((comp) => {
            return (<option key={comp.id} value={comp.companyName}>{comp.companyName}</option>)
        })
    }
    return (
        <form className='xxx1'>
            <select>{renderSelect()}</select>
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <Folder />
        </form>
    )
}
const mapStateToProps = state => {
    return {
        companys: Object.values(state.companys)
    }
}

export default connect(mapStateToProps, { fetchCompanys })(CompanySendTax)