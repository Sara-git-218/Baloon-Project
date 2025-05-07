import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
//import { CountryService } from '../service/CountryService';
import '../../Css/FormDemo.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    // const [countries, setCountries] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});

    const defaultValues = {
        name: '',
        username: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        date: null,
        accept: false
    }


    // useEffect(() => {
    //    // countryservice.getCountries().then(data => setCountries(data));
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setFormData(data);
        if (data.password.length < 6) {
            alert("סיסמא קצרה מידי ")
            return;
        }
        const user = {
            name: data.name,
            username: data.username,
            password: data.password,
            email: data.email,
            phone: data.phone,
            address: data.address,
            date: data.date
        }

        try {
            const res = await axios.post('http://localhost:3600/api/auth/register', user)
            if (res.status === 200) {
                setShowMessage(true)
                navigate('/Login')
            }
        }
        catch (err) {
            alert("הרשמה נכשלההה")
            console.log(err)
        }
        reset();
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </React.Fragment>
    );

    return (
        <div className="form-demo">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex justify-content-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Registration Successful!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Your account is registered under name <b>{formData.name}</b> ; it'll be valid next 30 days without activation. Please check <b>{formData.email}</b> for activation instructions.
                    </p>
                </div>
            </Dialog>

            <div className="flex justify-content-center">
                <div className="card" >
                    <h5 className="text-center">הרשמה</h5>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="name" control={control} rules={{ required: 'שדה חובה' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>שם*</label>
                            </span>
                            {getFormErrorMessage('name')}
                        </div>
                        <div className="field" >
                            <span className="p-float-label">
                                <Controller name="username" control={control} rules={{ required: 'שם משתמש לא תקין' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="name" className={classNames({ 'p-error': errors.username })}>שם משתמש*</label>
                            </span>
                            {getFormErrorMessage('username')}
                        </div>
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <Controller name="email" control={control}
                                    rules={{ required: 'Email is required.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' } }}
                                    render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                <label htmlFor="email" className={classNames({ 'p-error': !!errors.email })}>מייל*</label>
                            </span>
                            {getFormErrorMessage('email')}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="password" control={control} rules={{ required: 'Password is required.' }} render={({ field, fieldState }) => (
                                    <Password id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} header={passwordHeader} footer={passwordFooter} />
                                )} />
                                <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>סיסמא*</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="phone" control={control} rules={{ required: 'שדה חובה' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="name" className={classNames({ 'p-error': errors.phone })}>טלפון*</label>
                            </span>
                            {getFormErrorMessage('phone')}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="address" control={control} rules={{ required: 'שדה חובה' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="name" className={classNames({ 'p-error': errors.address })}>כתובת*</label>
                            </span>
                            {getFormErrorMessage('address')}
                        </div>
                        <div className="field" dir='ltr'>
                            <span className="p-float-label">
                                <Controller name="date" control={control} render={({ field }) => (
                                    <Calendar showIcon id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} dateFormat="dd/mm/yy" mask="99/99/9999" />
                                )} />
                                <label htmlFor="date">יום הולדת</label>
                            </span>
                        </div>
                       
                        <Button type="submit" label="הרשמה" className="mt-2" />
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Register;