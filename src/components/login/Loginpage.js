import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import React, {useState } from 'react'
import Modal from '../modals/Modal'
import "./Loginpage.css"
import history from '../../history'

const Loginpage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const auth = getAuth()
    const login = async (email, password) => {
        if (email && password) {
            await signInWithEmailAndPassword(auth, email, password).then(userCre => {
                const user = userCre.user;
                console.log(user)
            })
        }
    }
    const renderContent = () => {
        return (
            <div className='auth-container'>
                <input className='i-auth' type="email" onChange={v => setEmail(v.target.value)} placeholder='E-posta Adresiniz...' />
                <input className='i-auth' type="password" onChange={v => setPassword(v.target.value)} placeholder='Şifreniz...' />
                <span className='forget-pass'>Şifremi unuttum</span>
                <button className='btn-auth' onClick={() => login(email, password)}>
                    GİRİŞ YAP
                </button>
            </div>
        )
    }
    return (
        <Modal
            onDismiss={() => history.goBack()}
            content={renderContent()}
            title="GİRİŞ EKRANI"
        />
    )
}

export default Loginpage