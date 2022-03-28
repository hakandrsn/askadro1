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

    const RenderTextInput = ({ header, name, type, children }) => {
        const isType = type ? type : "text"

        return (
            <React.Fragment>
                <div className="i-container">
                    <label className='i-label' htmlFor={header}> {header}</label>
                    <input id={header} className='i-box' type={isType}  {...register(name)} placeholder="..." />
                </div>
                <div className='error-container' style={{ visibility: `${children ? "visible" : "hidden"}` }}>
                    {children}
                </div>
            </React.Fragment>
        )
    }
    const RenderCheckboxInput = ({ header, name, children }) => {
        return (
            <React.Fragment>
                <div className="i-container">
                    <label htmlFor={header} className='i-label'>{header}</label>
                    <input id={header} className='cb-input' type="checkbox"  {...register(name)} />
                </div>
                <div className='error-container' style={{ visibility: `${children ? "visible" : "hidden"}` }}>
                    {children}
                </div>
            </React.Fragment>
        )
    }
    const onSubmit = (data) => {
        reset()
        props.onSubmit(data)
    }
    return (
        <form onSubmit={handleSubmit((data, e) => onSubmit(data, e))} className='form-container'>
            <RenderTextInput name="companyName" header="Şirket Adı">
                {errors.companyName?.message}
            </RenderTextInput>
            <RenderTextInput name="email" header="Email">
                {errors.email?.message}
            </RenderTextInput>
            <RenderTextInput name="password" header="Şifre">
                {errors.password?.message}
            </RenderTextInput>
            <RenderTextInput name="humanResourceName" header="İnsan Kaynakları Ad Soyad">
                {errors.humanResourceName?.message}
            </RenderTextInput>
            <RenderTextInput name="humanResourcePhone" header="İnsan Kaynakları Tel" >
                {errors.humanResourcePhone?.message}
            </RenderTextInput>
            <RenderTextInput name="location" header="Konumu">
                {errors.location?.message}
            </RenderTextInput>
            <RenderTextInput name="phone" header="Telefon Numarası">
                {errors.phone?.message}
            </RenderTextInput>
            <RenderTextInput name="givePrice" header="Verdiği Net Ücret">
                {errors.givePrice?.message}
            </RenderTextInput>
            <RenderTextInput name="taxNumber" header="Vergi Numarası">
                {errors.taxNumber?.message}
            </RenderTextInput>
            <RenderTextInput name="invoice" header="Fatura">
                {errors.invoice?.message}
            </RenderTextInput>
            <RenderCheckboxInput name="isNesHes" header="Hes Gerekli Mi ?">
                {errors.isNesHes?.message}
            </RenderCheckboxInput>
            <RenderCheckboxInput name="servis" header="Servis Var Mı ?">
                {errors.servis?.message}
            </RenderCheckboxInput>
            <input type="submit" className='form-submit-button' />

        </form>
    )
}
export default CompanyForm
