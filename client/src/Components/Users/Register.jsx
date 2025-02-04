import React, { useRef, useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { FloatLabel } from 'primereact/floatlabel';
import axios from 'axios'

const Register = (props) => {
    const [date, setDate] = useState(null);

    const refName = useRef("")
    const refUserName = useRef("")
    const refPassword = useRef("")
    const refEmail = useRef("")
    const refPhone = useRef("")
    const refAddress = useRef("")

    const add = async (refName, refUserName, refPassword, refEmail, refPhone, refAddress) => {
        const user = { name: refName.current.value, username: refUserName.current.value, password: refPassword.current.value, email: refEmail.current.value, phone: refPhone.current.value, address: refAddress.current.value }
        debugger
        try {
            const res = await axios.post('http://localhost:3600/api/auth/register', user)
            if (res.status === 200) {

                console.log("הרשמה הצליחה")
                alert("הרשמה הצליחה")
            }
        }
        catch (err) {

            console.log(err)
        }
    }
    return (
        <div className="card flex justify-content-center" style={{ color: "white" }} >
            <Dialog
                visible={props.visible}
                modal
                onHide={() => { if (!props.visible) return; props.setVisible(false); }}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>

                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                שם משתמש*:
                            </label>
                            <InputText id="username" label="Username"  className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={refUserName} required></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                סיסמא*:
                            </label>
                            <InputText id="password" label="Password" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="text" ref={refPassword}></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                שם*:
                            </label>
                            <InputText id="password" label="Password" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="text" ref={refName}></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                כתובת מייל*:
                            </label>
                            <InputText type="email" id="username" label="Username" className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={refEmail}></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                טלפון*:
                            </label>
                            <InputText id="password" label="Password" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="text" ref={refPhone}></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                כתובת:
                            </label>
                            <InputText id="password" label="Password" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="text" ref={refAddress} style={{ backgroundColor: "gray" }}></InputText>
                        </div>
               
                        <div className="inline-flex flex-column gap-2" >
                            {/* //card flex justify-content-center */}
                            {/* <FloatLabel> */}
                            <label htmlFor="birth_date" className="text-primary-50 font-semibold"> תאריך לידה:</label>
                            <Calendar inputId="birth_date"  className="bg-white-alpha-20 border-none p-3 text-primary-50" value={date} onChange={(e) => setDate(e.value)} />

                            {/* </FloatLabel> */}
                        </div>
                        <div className="flex align-items-center gap-2">
                            <Button label="הרשמה" onClick={(e) => { add(refName, refUserName, refPassword, refEmail, refPhone, refAddress); hide(e) }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button label="ביטול" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
        </div>
    )
}
export default Register