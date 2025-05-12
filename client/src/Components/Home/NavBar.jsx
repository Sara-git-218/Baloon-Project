
import React, { useEffect, useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../Store/TokenSilce";
import { setUser } from '../../Store/AuthSlice';
import axios from 'axios';
import './NavBar.css';
import 'primeicons/primeicons.css';

export default function NavBar() {
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [dynamicCategories, setDynamicCategories] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector(state => state.Token.tokenstr);
    const user = useSelector(state => state.User.user);
    const isAdmin = user?.roles === "Admin";

    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         try {
    //             const res = await axios.get('http://localhost:3600/api/readyDesign/getAllReadyDesign');
    //             const categories = [...new Set(res.data.map(item => item.category))];
    //             setDynamicCategories(categories);
    //         } catch (err) {
    //             console.error("שגיאה בשליפת קטגוריות:", err);
    //         }
    //     };

    //     fetchCategories();
    // }, []);

    const handleLogIn = () => {
        navigate('/Login');
    };

    const handleLogOut = async () => {
        await dispatch(setToken(""));
        await dispatch(setUser(null));
        navigate('/');
    };

    const items = isAdmin
        ? [
            { label: 'ניהול הזמנות', command: () => navigate('/Admin/Orders') },
            { label: 'ניהול מוצרים', command: () => navigate('/Admin/Items') },
         
        ]
        : [
            { label: 'חנות', url: '/' },

     
            {
                label: 'קטגוריות',
                items: [
                    {
                        label: 'הכל',
                        url:'/'
                    },
                    {
                        label: 'עסקים',
                        command: () => navigate('/?category=עסקים')
                    },
                    {
                        label: 'ימי הולדת',
                        command: () => navigate('/?category=ימי הולדת')
                    },
                    {
                        label: 'ימי נישואין',
                        command: () => navigate('/?category=ימי נישואין')
                    },
                    {
                        label: 'בר מצווה',
                        command: () => navigate('/?category=בר מצווה')
                    },
                    {
                        label: 'בת מצווה',
                        command: () => navigate('/?category=בת מצווה')
                    },
                    {
                        label: 'ברית/בריתה',
                        command: () => navigate('/?category=ברית/בריתה')
                    },

                ]
            }
            ,
            { label: 'צור קשר', command: () => navigate('/Contact') },

        ];

    useEffect(() => {
        console.log("Updated token:", token, user);
    }, [token, user]);

    const start = (
        <img src="/logo.png" alt="logo" height="50" className="navbar-logo" />
    );
    const end = (<div className="nav-buttons">
        {user !== null ? (
            isAdmin ? (
               
                <Button label="יציאה" severity="secondary" onClick={handleLogOut} />
            ) : (
             
                <>
                    <Button label="יציאה" severity="secondary" onClick={handleLogOut} />
                    <Button icon="pi pi-shopping-cart" onClick={() => navigate('/Cart')} />
                </>
            )
        ) : (
          
            <>
                <Button label="כניסה" severity="secondary" onClick={handleLogIn} />
                <Button label="הרשמה" severity="secondary" onClick={() => navigate('/Register')} style={{ marginLeft: '1em' }} />
            </>
        )}
    </div>)
    return (
        <div className="card">
            <Menubar model={items} className="NavBarcss" start={start} end={end} />
        </div>
    );
}
