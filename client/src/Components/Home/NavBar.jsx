
import React, { useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import './NavBar.css'
import { Button } from 'primereact/button';
import Register from '../Users/Register'
import Login from '../Login'
import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../Store/TokenSilce";
import { setUser } from '../../Store/AuthSlice';
import { jwtDecode } from 'jwt-decode';
import 'primeicons/primeicons.css';
import axios from 'axios';

export default function NavBar() {

    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const isLoggedIn = useSelector((state) => state.IsLogIn.isLoggedIn);
    const token = useSelector(state => state.Token.tokenstr);
    const user = useSelector(state => state.User.user)
    const ItemsInCartForUser = async () => {

        if (!user) {
            alert("התחבר לאתרררר")
            return;
        }

        try {
            console.log(token)
            const res = await axios.get('http://localhost:3600/api/itemInCart/getItemInCartByUser_id', {
                headers: {
                    'Authorization': `Bearer ${token}`,  // צירוף הטוקן ב-Authorization header
                    'Content-Type': 'application/json',  // ציון סוג התוכן
                }
            })
            if (res.status == 200) {
                alert(res.data)
                console.log(res.data)
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    const handleLogIn = () => {
        navigate('/Login')

    };

    const handleLogOut = async () => {

        await dispatch(setToken(""));
        await dispatch(setUser(null));
    };
    const items = [
        {
            label: 'חנות',
            // icon: 'pi pi-home'
            url: "/"
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
                    command: () => { alert("עסקים לפניך") }

                },
                {
                    label: 'ימי הולדת ',
                    command: () => { alert("ימי הולדת לפניך") }

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
                    {user !== null ? (
                        <>
                            <Button label="יציאה" severity="secondary" onClick={handleLogOut} />
                            <Button icon="pi-shopping-bag" onClick={()=>navigate('/Cart')} />
                        </>
                    ) : (
                        <>
                            <Button label="כניסה" severity="secondary" onClick={handleLogIn} />
                            <Button label="הרשמה" severity="secondary" onClick={() => navigate('/Register')} dir='ltr' style={{ marginLeft: '1em' }} />


                        </>
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
        console.log("Updated token:", token,user);
    }, [token,user]);

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




