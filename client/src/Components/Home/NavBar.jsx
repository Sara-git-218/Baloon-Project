


import React from 'react'; 
import { Menubar } from 'primereact/menubar';
import './NavBar.css'
export default function NavBar() {
    const items = [
        {
            label: 'חנות',
            icon: 'pi pi-home'
        },
        {
            label: '    עסקים   ',
            icon: 'pi pi-building-columns'
        },
        {
            label: 'קטגוריות',
            icon: 'pi pi-align-justify',
            items: [
                {
                    label: 'עסקים'
                   
                },
                {
                    label: 'ימי הולדת '
                   
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
            label: 'צור קשר',
            icon: 'pi pi-envelope'
        }
    ];

    return (
        <div className="card" >
            <Menubar model={items}className="NavBarcss" />
        </div>
    )
}
        