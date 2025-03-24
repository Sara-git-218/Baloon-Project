
import React, { useEffect } from 'react'; 
import { Menubar } from 'primereact/menubar';
import './NavBar.css'
import { Button } from 'primereact/button';
import Register from '../Users/Register'
import Login from '../Login'
import  { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../Store/TokenSilce";
import { setLogin } from '../../Store/AuthSlice';
import { jwtDecode } from 'jwt-decode';


export default function NavBar() {
    
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.IsLogIn.isLoggedIn);
    const token =  useSelector(state => state.Token.tokenstr);
  

    const handleLogIn = () => {
        navigate('/Login')
        
    };
    
    const handleLogOut = () => {
        dispatch(setLogin());
        dispatch(setToken(""));
    };
    const items = [
        {
            label: 'חנות',
            // icon: 'pi pi-home'
            url:"/"
        },
        {
            label: 'עסקים'
            // icon: 'pi pi-building-columns'
        },
        {
            label: 'קטגוריות',
            // icon: 'pi pi-align-justify',
            items: [
                {
                    label: 'עסקים',
                    command:()=>{alert("עסקים לפניך")}
                   
                },
                {
                    label: 'ימי הולדת ',
                    command:()=>{alert("ימי הולדת לפניך")}
                   
                },
                {
                    label: 'ימי נישואין'
                 
                },
                {
                    label: 'בר מצווה'
                
                    // items: [
                    //     {
                    //         label: 'Apollo',
                    //         icon: 'pi pi-palette'
                    //     },
                    //     {
                    //         label: 'Ultima',
                    //         icon: 'pi pi-palette'
                    //     }
                    // ]
                },
                {
                    label: 'בת מצווה'
                 
                },
                {
                    label: 'ברית/בריתה'
                 
                },
                {
                    label: 'ימי נישואין'
                 
                }
            ]
        },
        {
            label: 'צור קשר'
            // icon: 'pi pi-envelope'
        },

{
label:
    <nav>
    {isLoggedIn ? (
    <>
        <Button label="יציאה" severity="secondary" onClick={handleLogOut} />
        </>
    ) : (
        <>
        <Button label="כניסה" severity="secondary" onClick={handleLogIn} />
        <Button label="הרשמה" severity="secondary" onClick={() =>navigate('/Register')} dir='ltr' style={{ marginLeft: '1em'}} /></>
    )}
</nav>
},

        
        // {
        //     label:visible2?<></>:<Button label="הרשמה" severity="secondary" onClick={() =>navigate('/Register')} dir='ltr' style={{ marginLeft: '1em'}} />//() => setVisible(true)
        // }
        // },
        // {
        //     label:visible2?<></>:<Button label="כניסה" severity="secondary" onClick={() =>navigate('/Login',{state:{setVisible2}})} dir='ltr' style={{ marginLeft: '1em'}} />
        // },
        // {
        //     label:!visible2?<></>:<Button label="יציאה" severity="secondary" onClick={() =>logOut()}  dir='ltr' style={{ marginLeft: '1em'}} />
        // }

    ];
    useEffect(() => {
        console.log("Updated token:", isLoggedIn); // הדפסת ה-token בעדכון
    }, [isLoggedIn]);

    // const logOut=()=>{
    //     dispatch(setToken(""))
    // localStorage.setItem("token","")}

    return (
        <div className="card" >
            <Menubar model={items} className="NavBarcss" />
            {/* {visible&&<Register  setVisible={setVisible} visible={visible}  />} */}
            {/* {visible2&&<Login  setVisible={setVisible2} visible={visible2}  />} */}
        </div>
    )
}
        



