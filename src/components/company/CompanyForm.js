import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
// import "../css/CompanyForm.css"
const validationSchema = yup.object({
    companyName: yup.string().required("Doldurunuz").min(3, "Emin Misiniz ?"),
    email: yup.string().required("Email Adresi Girmelisiniz").email(),
    humanResourceName: yup.string().min(2, `Lütfen geçerli bir değer giriniz`),
    humanResourcePhone: yup.string().min(10, "Kontrol et").max(11, "kontrol et"),
    location: yup.string(),
    phone: yup.string().min(10, "kontrol et").max(11, "kontrol et"),
    givePrice: yup.string().max(4, "abartma"),
    password: yup.string().min(6, "6 karakterden az olmamalı").max(19, "19 karakterden fazla olmamalı"),
}).required()

const CompanyForm = (props) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: props.initialValues,
    })


    const RenderTextInput = ({ header, name, type }) => {
        const isType = type ? type : "text"
        return (
            <div className="i-container">
                <label className='i-label' htmlFor={header}> {header}</label>
                <input id={header} className='i-box' type={isType}  {...register(name)} placeholder="..." />
            </div>
        )
    }
    const RenderCheckboxInput = ({ header, name, className }) => {
        return (
            <div className="i-container">
                <label htmlFor={header} className='i-label'>{header}</label>
                <input id={header} className='cb-input' type="checkbox"  {...register(name)} />
            </div>
        )
    }
    const E = ({ children }) => {
        if (!children) { return null; }
        return (
            <div className='error-container'>
                {children}
            </div>
        )
    }

    const onSubmit = (data) => {
        reset()
        props.onSubmit(data)
    }
    return (
        <form onSubmit={handleSubmit((data, e) => onSubmit(data, e))} className='form-container'>
            <RenderTextInput name="companyName" header="Şirket Adı" />
            <E>{errors.companyName?.message}</E>
            <RenderTextInput name="email" header="Email" />
            <E>{errors.email?.message}</E>
            <RenderTextInput name="password" header="Şifre" />
            <E>{errors.password?.message}</E>
            <RenderTextInput name="humanResourceName" header="İnsan Kaynakları Ad Soyad" />
            <E>{errors.humanResourceName?.message}</E>
            <RenderTextInput name="humanResourcePhone" header="İnsan Kaynakları Tel" />
            <E>{errors.humanResourcePhone?.message}</E>
            <RenderTextInput name="location" header="Konumu" />
            <E>{errors.location?.message}</E>
            <RenderTextInput name="phone" header="Telefon Numarası" />
            <E>{errors.phone?.message}</E>
            <RenderTextInput name="givePrice" header="Verdiği Net Ücret" />
            <E>{errors.givePrice?.message}</E>
            <RenderTextInput name="taxNumber" header="Vergi Numarası" />
            <E>{errors.taxNumber?.message}</E>
            <RenderTextInput name="invoice" header="Fatura" />
            <E>{errors.invoice?.message}</E>
            <RenderCheckboxInput name="isNesHes" header="Hes Gerekli Mi ?" />
            <E>{errors.isNesHes?.message}</E>
            <RenderCheckboxInput name="servis" header="Servis Var Mı ?" />
            <E>{errors.servis?.message}</E>
            <input type="submit" className='form-submit-button' />

        </form>
    )
}
export default CompanyForm
