
import React, { useState } from 'react'; 
import { Button } from 'primereact/button';
import axios from 'axios';
import { useSelector } from 'react-redux';

import  { useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { CustomerService } from './service/CustomerService';
const Orders=()=>{
    const token = useSelector(state => state.Token.tokenstr);
    const user = useSelector(state => state.User.user)
 const [orders,setOrders]=useState([]) 
const [customers, setCustomers] = useState([]);

//   useEffect(() => {
//         // orders.then((data) => setOrders(data));
//        UnconfirmedOrders("confirm")
//     }, []);

  

const UnconfirmedOrders=async(status)=>{
   
    const res = await axios.get(`http://localhost:3600/api/order/getOrderByStatus/${status}`, {
        headers: {
            'Authorization': `Bearer ${token}`,  // צירוף הטוקן ב-Authorization header
            'Content-Type': 'application/json',  // ציון סוג התוכן
        }})
    if(res.status===200)
    {
        console.log("res",res);
        await  setOrders(res.data)
       await console.log("orders",orders)
    }
}
    return(
        <>
            <div className="card flex flex-wrap justify-content-center gap-3">
            <Button label="הזמנות שממתינות לאישור" onClick={()=>UnconfirmedOrders("unConfirm")}/>
            <Button label="הזמנות מאושרות " severity="secondary" onClick={()=>UnconfirmedOrders("confirm")} />
            <Button label="הזמנות קרובות" severity="success" />
            
        </div>
        <div className="card">
            <DataTable value={orders} paginator rows={5}  tableStyle={{ minWidth: '50rem' }}>
                <Column field="user_id" header="משתמש" style={{ width: '25%' }}></Column>
                <Column field="items" header="פריטים" style={{ width: '25%' }}></Column>
                <Column field="status" header="Company" style={{ width: '25%' }}></Column>
                <Column field="deliveryDate" header="Representative" style={{ width: '25%' }}></Column>
            </DataTable>
        </div>
        </>
    )
}
export default Orders