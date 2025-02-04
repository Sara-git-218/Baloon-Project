import React, { useRef,useState } from 'react'; 
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios'
import Register from './Users/Register';

export default function Login() {
    const userNameRef=useRef("")
    const passwordRef=useRef("")
    const [visible, setVisible] = useState(false);
    const login=async()=>
        {
            try {
                const details={username:userNameRef.current.value,password:passwordRef.current.value}
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
        <div className="card">
            <div className="flex flex-column md:flex-row">
                <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">שם משתמש</label>
                        <InputText id="username" type="text" className="w-12rem" ref={userNameRef}/>
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">סיסמא</label>
                        <InputText id="password" type="password" className="w-12rem" ref={passwordRef}/>
                    </div>
                    <Button label="כניסה" icon="pi pi-user" className="w-10rem mx-auto" onClick={login}></Button>
                </div>
                <div className="w-full md:w-2">
                    <Divider layout="vertical" className="hidden md:flex">
                        <b>או</b>
                    </Divider>
                    <Divider layout="horizontal" className="flex md:hidden" align="center">
                        <b>או</b>
                    </Divider>
                </div>
                
                <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
                    {/* <Button label="הרשמה" icon="pi pi-user-plus" severity="success" className="w-10rem"></Button> */}
                    <Button label="הרשמה" severity="secondary" icon="pi pi-pencil" onClick={() => setVisible(true)} style={{ marginLeft: '0.5em'}} />
                  {visible&&<Register  setVisible={setVisible} visible={visible}  />}
                </div>
            </div>
        </div>
    )
}
        