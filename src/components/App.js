import React, { useEffect, useState } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import history from '../history'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { connect } from 'react-redux'

import Header from "./headers/Header"
import SideBar from './sidebars/SideBar'
import Content from './contents/Content'
import Footer from './footers/Footer'

//Company
import CompanyShow from "./company/CompanyShow"
import CompanyList from "./company/CompanyList"
import CompanyCreate from "./company/CompanyCreate"
import CompanyDelete from "./company/CompanyDelete"
import CompanyEdit from "./company/CompanyEdit"
import SendEmployeeToCompany from './company/SendEmployeeToCompany'
import CompanySendTax from './company/CompanySendTax'
//employess
import EmployeeCreate from "./employee/EmployeeCreate"
import EmployeeDelete from "./employee/EmployeeDelete"
import EmployeeEdit from "./employee/EmployeeEdit"
import EmployeeList from "./employee/EmployeeList"
import EmployeeShow from "./employee/EmployeeShow"
import SendEmployeeToWork from './employee/SendEmployeeToWork'

//works
import CompanyWorksList from './work/CompanyWorksList'
import EmployeeWorkList from './work/EmployeeWorkList'

import "./App.css"
import Loginpage from './login/Loginpage'
import SuccessModal from './modals/SuccessModal'
import Content2 from './contents/Content2'
const App = (props) => {
    const [isHave, setIsHave] = useState(null)
    const [search, setSearch] = useState("")
    const [login, setLogin] = useState(false)
    const auth = getAuth()
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user !== null) {
                if (auth.currentUser) {
                    setLogin(true)
                }
            } else {
                setLogin(false)
            }
        })
    }, [])
    const renderContent = () => {
        if (props.success.where) return "Başarılı"
        if (props.success.error) return "Olmadı"
    }
    return (
        <div className='container'>
            {login ?
                <Router history={history}>
                    <Header id="header" setSearch={setSearch} setIsHave={setIsHave} />
                    <SideBar id="sidebar" />
                    {
                        isHave ? <Content id="content" search={search} />
                            : <Content2 />
                    }
                    <Switch>
                        <main>
                            <React.Fragment>
                                {/* Şirketler Grubu */}
                                <Route path="/" exact component={CompanyList} />
                                <Route path="/newcompany" exact component={CompanyCreate} />
                                <Route path="/company/:id" exact component={CompanyShow} />
                                <Route path="/company/edit/:id" exact component={CompanyEdit} />
                                <Route path="/company/delete/:id" exact component={CompanyDelete} />
                                <Route path="/company/send/:id" exact component={SendEmployeeToCompany} />
                                <Route path="/tax" exact component={CompanySendTax} />

                                {/* Personel Grubu */}
                                <Route path="/employees" exact component={EmployeeList} />
                                <Route path="/newemployee" exact component={EmployeeCreate} />
                                <Route path="/employee/show/:id" exact component={EmployeeShow} />
                                <Route path="/employee/edit/:id" exact component={EmployeeEdit} />
                                <Route path="/employee/delete/:id" exact component={EmployeeDelete} />
                                <Route path="/employee/works/:id" exact component={SendEmployeeToWork} />

                                {/* works grubu */}
                                <Route path="/company/work/:id/:time" exact component={CompanyWorksList} />
                                <Route path="/employee/work/:id/:time" exact component={EmployeeWorkList} />
                            </React.Fragment>
                        </main>
                    </Switch>
                    <Footer id="footer" />
                    {props.success.open ? <SuccessModal content={renderContent()} /> : null}
                </Router>
                : <Loginpage />}
        </div>

    )
}
const mapStateToProps = (state) => {
    return {
        success: state.success,
    }
}

export default connect(mapStateToProps)(App)