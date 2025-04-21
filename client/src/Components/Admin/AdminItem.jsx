import React from 'react'; 
import { Button } from 'primereact/button';
import axios from 'axios';
const AdminItems=()=>{
    const getAllItems=async()=>{
        const res = await axios.get('http://localhost:3600/api/readyDesign/getAllReadyDesign')
         
    
    
    }
    return(
        <>
           <div className="card flex flex-wrap justify-content-center gap-3">
                <Button label="כל המוצרים "/>
                <Button label="הוספת מוצר "severity="secondary" />
                <Button label="כל ההזמנות המאושרות" severity="success" />
                <Button label="הזמנות שלא שלומו" severity="info" />
                <Button label="הוספת מוצר" severity="warning" />
                <Button label="צפיה במוצרים קיימים" severity="help" />
               
            </div>
        </>
    )
}
export default AdminItems