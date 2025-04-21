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
import { useSelector, useDispatch } from "react-redux"
import { setToken } from '../Store/TokenSilce'
//import { CountryService } from '../service/CountryService';
import '../Css/FormDemo.css';
import axios from 'axios'
import Items from '../Components/Home/Items';
import { useLocation, useNavigate } from 'react-router-dom'
import { setUser } from '../Store/AuthSlice';
import { jwtDecode } from 'jwt-decode';
const Login = () => {
    // const [countries, setCountries] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    //const token = useSelector(state => state.Token.tokenstr);
    // const [userlog,setUserlog]=useState(null);
    //const countryservice = new CountryService();
    const defaultValues = {
        username: '',
        password: ''
    }

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
    // פונקציה לחילוץ ה-userמה-token
    const getUserFromToken = (token) => {
        if (!token || token.split(".").length !== 3) {
            console.error("Invalid token format");
            return null;
        }

        try {
            const decoded = jwtDecode(token);
            return decoded.user || decoded; // תבדקי איך הנתונים שמורים בטוקן שלך
        } catch (error) {
            console.error("Failed to decode token", error);
            return null;
        }
    };
    const onSubmit = async (data) => {
        setFormData(data);
        const user = {
            username: data.username,
            password: data.password
        }

        try {
            const res = await axios.post('http://localhost:3600/api/auth/login', user)
            if (res.status === 200) {
                const token = res.data.accessToken
                await dispatch(setToken(res.data.accessToken));
                console.log(token)
                const userlog = getUserFromToken(token);
                console.log(userlog);
                await dispatch(setUser(userlog));
                if (userlog.roles === 'User') {
                    navigate('/')
                }
                if (userlog.roles === 'Admin') {
                    navigate('/Admin')
                }
                localStorage.setItem("token", res.data.accessToken)


            }

        } catch (e) {
            console.error(e)
            alert(e.response)
        }
        reset();
    };
    // useEffect(() => {
    //     console.log("Updated token:", token);// הדפסת ה-token בעדכון 

    // }, [token]);
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
                    <h5 className="text-center">כניסה</h5>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                        <div className="field" dir='rtl'>
                            <span className="p-float-label">
                                <Controller name="username" control={control} rules={{ required: 'שם משתמש לא תקין' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="name" className={classNames({ 'p-error': errors.username })}>שם משתמש*</label>
                            </span>
                            {getFormErrorMessage('username')}
                        </div>

                        {/* ```jsx  */}
                        {/* <div className="field">
                    <span className="p-float-label">
                        <Controller name="password" control={control} rules={{ required: 'Password is required.' }} render={({ field, fieldState }) => (
                            <Password id={field.name} toggleMask {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />)} />
                        <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>סיסמא*</label>
                    </span>
                    {getFormErrorMessage('password')}
                </div> */}
                        {/* ``` */}

                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="password" control={control} rules={{ required: 'Password is required.' }} render={({ field, fieldState }) => (
                                    <InputText type="password" id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>סיסמא*</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>
                        <Button type="submit" label="כניסה" className="mt-2" />
                    </form>
                </div>
            </div >
        </div >
    );
}
export default Login;