import React, { useEffect, useState } from 'react'
import history from '../../history'
import Modal from '../modals/Modal'
import { connect } from 'react-redux'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../services/firebase'
import { CompanyWorks, Employees } from '../../actions/fireTypes'
import { omit } from "lodash"

const CompanyWorksList = (props) => {
    const [veri, setVeri] = useState([])
    const [dongu, setDongu] = useState([])
    const [otherVeri, setOtherVeri] = useState(["tim", "time", "myTime"]) // zamanla alakalı olanlar
    const { id, time } = props.match.params
    useEffect(() => {
        listEmp()
    }, [])
    const fetchWorks = async () => {
        try {
            const res = await (await getDoc(doc(db, CompanyWorks, id))).data()[time]
            setOtherVeri({ "tim": res.tim, "time": res.time, "myTime": res.myTime })
            setVeri(omit(res, "tim", "time", "myTime"))
        } catch (e) {
            console.log(e)
        }
    }
    const listEmp = async () => {
        const list = []
        await fetchWorks(id)
        const veri2 = Object.values(veri)
        for (let i = 0; i < veri2.length; i++) {
            await getEmp(veri2[i].id).then(b => {
                list.push(b)
            })
        }
        setDongu(list)
    }
    const getEmp = async (emp) => {
        return (await getDoc(doc(db, Employees, emp))).data()
    }


    const renderContent = () => {
        return dongu && dongu.map((wr, i) => {
            return (
                <div key={wr.phone}>
                    <span>{`${i + 1}.${wr.fullName}`}</span>
                    <hr />
                </div>
            )
        })
    }

    return (
        <Modal
            onDismiss={() => history.goBack()}
            content={renderContent()}
            title={`${otherVeri.myTime} - ${otherVeri.tim} Tarihi ve Saatinde ki İş Listesi`}
        />
    )
}

export default connect()(CompanyWorksList)