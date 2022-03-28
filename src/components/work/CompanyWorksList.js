import React, { useEffect, useState } from 'react'
import history from '../../history'
import Modal from '../modals/Modal'
import { connect } from 'react-redux'
import { getWorksComp } from "../../actions"

const CompanyWorksList = (props) => {
    const [veri, setVeri] = useState([])
    const { id, time } = props.match.params
    useEffect(() => {
        props.getWorksComp(id, time)
        setVeri(props.works)
    }, [])
    const renderContent = () => {
        return veri && veri.map((wr, i) => {
            return (
                <div key={i}>
                    <span>{`${i + 1} . ${wr.name}`}</span>
                    <hr />
                </div>
            )
        })
    }

    return (
        <Modal
            onDismiss={() => history.goBack()}
            content={renderContent()}
            title={`${time}`}
        />

    )
}
const mapStateToProps = state => {
    return {
        works: state.workData.data2
    }
}

export default connect(mapStateToProps, { getWorksComp })(CompanyWorksList)