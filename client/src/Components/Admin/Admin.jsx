import React from 'react'; 
import { Button } from 'primereact/button';
const Admin=()=>{
    return(
        <>
        <div>עמוד מנהל</div>
        <div className="card flex flex-wrap justify-content-center gap-3">
            <Button label="הזמנות שלא אושרו" />
            <Button label="הזמנות קרובות" severity="secondary" />
            <Button label="כל ההזמנות המאושרות" severity="success" />
            <Button label="הזמנות שלא שלומו" severity="info" />
            <Button label="הוספת מוצר" severity="warning" />
            <Button label="צפיה במוצרים קיימים" severity="help" />
           
        </div>
        </>
    )
}
export default Admin;