import React from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import "./EmployeeForm.css"
// import DowlandFolder from '../../utils/DowlandFolder'

const validationSchema = yup.object({
  fullName: yup.string().required("Girmelisin"),
  phone: yup.string().required("Telefon Numarası Gereklidir."),
  hesCode: yup.string().min(8).max(12),
  tc: yup.string().min(11).max(11),
  email: yup.string(),
  birthday: yup.string(),
  password: yup.string().min(6, "En az 6 karakterden oluşmalı").max(19, "en fazla 19 karakterden oluşmalı")
}).required()

const EmployeeForm = (props) => {
  const options = ["garson", "komi", "temizlikçi", "şef", "HK", "steward"]
  const genders = ["Erkek","Kadın"]
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: props.initialValues
  })

  const onSubmit = (data) => {
    reset()
    props.onSubmit(data)
  }

  const RenderOption = ({ data, header, name }) => {
    return (
      <div className='i-container'>
        <label className='i-label'> {header} </label>
        <select {...register(name)} className="s-box">
          {data.map(dat => { return (<option key={dat} value={dat}> {dat} </option>) })}
        </select>
      </div>
    )
  }

  const Input = ({ className, header, name, type }) => {
    return (
      <div className="i-container">
        <label className='i-label'> {header} </label>
        <input className='i-box' type={type} {...register(name)} placeholder={header} />
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
  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))} className='form-container'>
      <Input name="fullName" header="Adı Soyadı :" type="text" />
      <E>{errors.fullName?.message}</E>
      <Input name="phone" header="Telefonu :" type="tel" />
      <E>{errors.phone?.message}</E>
      <Input name="iban" header="İbanı :" type="text" />
      <E>{errors.iban?.message}</E>
      <Input name="hesCode" header="Hes kodu :" type="text" />
      <E>{errors.hesCode?.message}</E>
      <Input name="tc" header="TC :" type="number" />
      <E>{errors.tc?.message}</E>
      <Input name="address" header="Adresi :" type="text" />
      <E>{errors.address?.message}</E>
      <Input name="email" header="Email :" type="email" />
      <E>{errors.email?.message}</E>
      <Input name="lang" header="Dil :" type="text" />
      <E>{errors.lang?.message}</E>
      <Input name="birthday" header="Doğum tarihi :" type="date" />
      <E>{errors.birthday?.message}</E>
      <Input name="password" header="Şifresi :" type="text" />
      <E>{errors.password?.message}</E>
      <RenderOption data={genders} header="Cinsiyeti :" name="gender" />
      <E>{errors.gender?.message}</E>
      <RenderOption data={options} header="Pozisyonu :" name="workType" />
      <E>{errors.workType?.message}</E>
      <input className='submit-btn' type="submit" />
    </form>
  )
}
export default EmployeeForm