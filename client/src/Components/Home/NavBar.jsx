import React from 'react'; 
import { Menubar } from 'primereact/menubar';
import './NavBar.css'
import { Button } from 'primereact/button';
import Register from '../Users/Register'
import Login from '../Login'
import  { useRef, useState } from "react";

export default function NavBar() {
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);

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
            label:<Button label="הרשמה" severity="secondary" onClick={() => setVisible(true)} icon="pi pi-pencil" dir='ltr' style={{ marginLeft: '1em'}} />
        },
        {
            label:<Button label="כניסה" severity="secondary" onClick={() => setVisible2(true)} icon="pi pi-pencil" dir='ltr' style={{ marginLeft: '1em'}} />
        }
    ];

    return (
        <div className="card" >
            <Menubar model={items}className="NavBarcss" />
            {visible&&<Register  setVisible={setVisible} visible={visible}  />}
            {visible2&&<Login  setVisible={setVisible2} visible={visible2}  />}
        </div>
    )
}
        