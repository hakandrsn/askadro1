import { getDoc, collection, setDoc, doc, getDocs, Timestamp, deleteDoc, updateDoc } from "firebase/firestore"
import { db } from "../services/firebase"
import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_COMPANY,
    CREATE_EMPLOYEE,
    FETCH_EMPLOYEES,
    FETCH_EMPLOYEE,
    DELETE_EMPLOYEE,
    EDIT_EMPLOYEE,
    FETCH_COMPANYS,
    FETCH_COMPANY,
    DELETE_COMPANY,
    EDIT_COMPANY,
    ADD_WORK,
    DELETE_WORK,
    ADD_COMPANY_WORKS,
    ADD_EMPLOYEE_WORKS,
    IN_MANAGER,
    OUT_MANAGER,
    SUCCESS,
    ERROR,
    CLOSE_MODAL,
    GET_EMPLOYEE_WORKS,
    GET_COMPANY_WORKS,
} from "./types"
import history from "../history"
import {
    Companys,
    Employees,
    EmployeeWorks,
    CompanyWorks,
} from "./fireTypes"
import { omit } from "lodash"
const time = Timestamp.fromDate(new Date()).toDate()
//google auth
export const signIn = (userId) => {
    return { type: SIGN_IN, payload: userId }
}
export const signOut = () => {
    return { type: SIGN_OUT }
}
//firebase auth
export const signInManager = (data) => {
    return { type: IN_MANAGER, payload: data }
}
export const signOutManager = () => {
    return { type: OUT_MANAGER }
}
export const makeFalseModal = () => {
    return { type: CLOSE_MODAL }
}

// add personel
export const addWork = (data) => {
    return { type: ADD_WORK, payload: data }
}
export const deleteWork = (id) => {
    return { type: DELETE_WORK, payload: id }
}
//company works get
export const addWorksComp = (id, date, wrks, tim, cb) => async dispatch => {
    try {
        const res = doc(db, CompanyWorks, id)
        const dongu = await wrks.map((a) => {
            return { id: a.id }
        })
        const response = await setDoc(res, { [date]: { ...dongu, tim, time, myTime: date, price: cb,pay:false } }, { merge: true })
        dispatch({ type: ADD_COMPANY_WORKS, payload: response })
        dispatch({ type: SUCCESS, payload: ADD_COMPANY_WORKS })
    } catch (error) {
        dispatch({ type: ERROR, payload: error })
    }
}
export const addWorksEmp = (id, date, wrks, tim, cb) => async dispacth => {
    try {
        const dongu = wrks.forEach(async (a) => {
            const res = doc(db, EmployeeWorks, a.id)
            await setDoc(res, { [date]: { id, tim, time, myTime: date, price: cb,pay:false } }, { merge: true })
        })
        dispacth({ type: ADD_EMPLOYEE_WORKS, payload: dongu })
        dispacth({ type: SUCCESS, payload: ADD_EMPLOYEE_WORKS })
    } catch (error) {
        dispacth({ type: ERROR, payload: error })

    }
}
export const getWorksEmp = (id) => async dispacth => {
    try {
        const res = await getDoc(doc(db, EmployeeWorks, id))
        const empWorkList = { ...res.data() }
        let list = []
        Object.values(empWorkList).map(y => {
            getDoc(doc(db, Companys, y.id)).then(x => {
                list.push({ "name": x.data().companyName, "price": y.price, "hour": y.tim, "date": y.myTime,"pay":y.pay })

            })
        })
        dispacth({ type: GET_EMPLOYEE_WORKS, payload: list })
    } catch (error) {
        dispacth({ type: ERROR, payload: error })

    }
}
export const getWorksComp = (id,v2) => async dispacth => {
    try {
        const res = await (await getDoc(doc(db, CompanyWorks, id))).data()[v2]
        let { tim, myTime } = res
        const veri2 = omit(res, "tim", "time", "myTime", "price")
        const list = []
        veri2 && Object.values(veri2).map(async (v) => {
            const res2 = await getDoc(doc(db, Employees, v.id))
            list.push({ "name": res2.data().fullName, "id": res2.id, "hour": tim, "date": myTime })
        })
        dispacth({type:GET_COMPANY_WORKS,payload:list})
    } catch (e) {
        dispacth({ type: ERROR, payload: e })
    }
}

export const fetctEmployees = () => async dispacth => {
    try {
        const res = await getDocs(collection(db, Employees))
        const response = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        dispacth({ type: FETCH_EMPLOYEES, payload: response })
        // dispacth({ type: SUCCESS, payload: FETCH_EMPLOYEES })
    } catch (error) {
        dispacth({ type: ERROR, payload: error })
    }
}
export const fetchEmployee = (id) => async dispatch => {
    try {
        const res = await getDoc(doc(db, Employees, id))
        const response = ({ ...res.data(), id: res.id })
        dispatch({ type: FETCH_EMPLOYEE, payload: response })
        // dispatch({ type: SUCCESS, payload: FETCH_EMPLOYEE })
    } catch (error) {
        dispatch({ type: ERROR, payload: error })
    }
}
export const createEmployee = (data) => async dispacth => {
    try {
        const res = doc(collection(db, Employees))
        const response = await setDoc(res, ({ ...data, timestamp: time ,visibility:true}))
        dispacth({ type: CREATE_EMPLOYEE, payload: response })
        dispacth({ type: SUCCESS, payload: CREATE_EMPLOYEE })
    } catch (error) {
        dispacth({ type: ERROR, payload: error })
    }
}
export const editEmployee = (id, data) => async dispatch => {
    try {
        const response = await updateDoc(doc(db, Employees, id), data)
        dispatch({ type: EDIT_EMPLOYEE, payload: response })
        dispatch({ type: SUCCESS, payload: EDIT_EMPLOYEE })
    } catch (error) {
        dispatch({ type: ERROR, payload: error })
    }
}
export const deleteEmployee = id => async dispatch => {
    try {
        const res =doc(db, Employees, id)
        await setDoc(res,{visibility:false},{merge:true})
        dispatch({ type: DELETE_EMPLOYEE, payload: id })
        dispatch({ type: SUCCESS, payload: DELETE_EMPLOYEE })
    } catch (error) {
        dispatch({ type: ERROR, payload: error })
    }
}


export const fetchCompanys = () => async (dispacth) => {
    try {
        const companyDocs = collection(db, Companys)
        const res = await getDocs(companyDocs)
        const response = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        dispacth({ type: FETCH_COMPANYS, payload: response })
        // dispacth({ type: SUCCESS, payload: FETCH_COMPANYS })
    } catch (error) {
        dispacth({ type: ERROR, payload: error })
    }
}
export const fetchCompany = id => async dispacth => {
    try {
        const companyDoc = doc(db, Companys, id)
        const res = await getDoc(companyDoc)
        const response = ({ ...res.data(), id: res.id })
        dispacth({ type: FETCH_COMPANY, payload: response })
        // dispacth({ type: SUCCESS, payload: FETCH_COMPANY })
    } catch (error) {
        dispacth({ type: ERROR, payload: error })
    }
}

export const createCompany = data => async dispacth => {
    try {
        const companyDoc = doc(collection(db, Companys))
        const response = await setDoc(companyDoc, ({ ...data, timestamp: time ,visibility:true}))
        dispacth({ type: CREATE_COMPANY, payload: response })
        // history.push("/")
        dispacth({ type: SUCCESS, payload: CREATE_COMPANY })
    } catch (error) {
        dispacth({ type: ERROR, payload: error })
    }
}
export const deleteCompany = id => async dispacth => {
    try {
        const res = doc(db, Companys, id)
        await setDoc(res,{visibility:false},{merge:true})
        dispacth({ type: DELETE_COMPANY, payload: id })
        // history.push("/")
        dispacth({ type: SUCCESS, payload: DELETE_COMPANY })
    } catch (error) {
        dispacth({ type: ERROR, payload: error })
    }
}
export const editCompany = (id, data) => async dispacth => {
    try {
        const res = doc(db, Companys, id)
        const response = await updateDoc(res, data)
        dispacth({ type: EDIT_COMPANY, payload: response })
        history.push("/")
        dispacth({ type: SUCCESS, payload: EDIT_COMPANY })
    } catch (error) {
        dispacth({ type: ERROR, payload: error })
    }
}

