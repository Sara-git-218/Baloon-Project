import React, { useRef,useState } from 'react'; 
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import axios from 'axios'
import Register from './Users/Register';

export default function Login(props) {
    const refUserName=useRef("")
    const refPassword=useRef("")
    const login=async()=>
        {
            try {
                const details={username:refUserName.current.value,password:refPassword.current.value}
                const res = await axios.post('http://localhost:3600/api/auth/login',details)
                if (res.status === 200) {
                    alert("!!!!!!!!!!!!!!!!ברוך הבא")
                }
    
            } catch (e) {
                console.error(e)
                alert(e.response.data)
            }
        }
    return (
       
            <div className="card flex justify-content-center">
                <Dialog
                    visible={props.visible}
                    modal
                    onHide={() => { if (!props.visible) return; props.setVisible(false); }}
                    content={({ hide }) => (
                        <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
    
                            <div className="inline-flex flex-column gap-2">
                                <label htmlFor="username" className="text-primary-50 font-semibold">
                                    *שם משתמש:
                                </label>
                                <InputText id="username" label="Username" className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={refUserName}></InputText>
                            </div>
                            <div className="inline-flex flex-column gap-2">
                                <label htmlFor="username" className="text-primary-50 font-semibold">
                                    *סיסמא:
                                </label>
                                <InputText id="password" label="Password" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="text" ref={refPassword}></InputText>
                            </div>
                      
                            <div className="flex align-items-center gap-2">
                                <Button label="כניסה" onClick={(e) => { login( refUserName,refPassword); hide(e) }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                                <Button label="ביטול" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            </div>
                        </div>
                    )}
                ></Dialog>
            </div>
        )
}
        