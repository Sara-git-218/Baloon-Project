
// // import React, { useState } from 'react';
// // import { Button } from 'primereact/button';
// // import axios from 'axios';
// // import { useSelector } from 'react-redux';

// // import { useEffect } from 'react';
// // import { DataTable } from 'primereact/datatable';
// // import { Column } from 'primereact/column';
// // // import { CustomerService } from './service/CustomerService';
// // const Orders = () => {
// //     const token = useSelector(state => state.Token.tokenstr);
// //     const user = useSelector(state => state.User.user)
// //     const [orders, setOrders] = useState([])
// //     const [customers, setCustomers] = useState([]);

// //     //   useEffect(() => {
// //     //         // orders.then((data) => setOrders(data));
// //     //        UnconfirmedOrders("confirm")
// //     //     }, []);



// //     const UnconfirmedOrders = async (status) => {

// //         const res = await axios.get(`http://localhost:3600/api/order/getOrderByStatus/${status}`, {
// //             headers: {
// //                 'Authorization': `Bearer ${token}`,  // צירוף הטוקן ב-Authorization header
// //                 'Content-Type': 'application/json',  // ציון סוג התוכן
// //             }
// //         })
// //         if (res.status === 200) {
// //             console.log("res", res);
// //             await setOrders(res.data)
// //             await console.log("orders", orders)
// //         }
// //     }
// //     return (
// //         <>
// //             <div className="card flex flex-wrap justify-content-center gap-3">
// //                 <Button label="הזמנות שממתינות לאישור" onClick={() => UnconfirmedOrders("unConfirm")} />
// //                 <Button label="הזמנות מאושרות " severity="secondary" onClick={() => UnconfirmedOrders("confirm")} />
// //                 <Button label="הזמנות קרובות" severity="success" />

// //             </div>
// //             <div className="card">
// //                 <DataTable value={orders} paginator rows={5} tableStyle={{ minWidth: '50rem' }}>
// //                     <Column field="user_id.username" header="משתמש" style={{ width: '25%' }}></Column>
// //                     {/* <Column field="items" header="משתמש" style={{ width: '25%' }}></Column> */}
// //                     <Column
// //                         header="פריטים"
// //                         body={(rowData) =>
// //                             rowData.items?.map((item) =>
// //                                 item?.readyDesign_id?.name || "עיצוב לא זמין"
// //                             ).join(", ")
// //                         }
// //                     />


// //                     <Column field="status" header="Company" style={{ width: '25%' }}></Column>
// //                     <Column field="deliveryDate" header="Representative" style={{ width: '25%' }}></Column>
// //                 </DataTable>
// //             </div>
// //         </>
// //     )
// // }
// // export default Orders




// import React, { useState } from 'react';
// import { Button } from 'primereact/button';
// import axios from 'axios';
// import { useSelector } from 'react-redux';

// import { useEffect } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// // import { CustomerService } from './service/CustomerService';
// const Orders = () => {
//     const token = useSelector(state => state.Token.tokenstr);
//     const user = useSelector(state => state.User.user)
//     const [orders, setOrders] = useState([]);
//     const [expandedRows, setExpandedRows] = useState(null); // 1. הוספת סטייט לשורות מורחבות

//     const UnconfirmedOrders = async (status) => {
//         const res = await axios.get(`http://localhost:3600/api/order/getOrderByStatus/${status}`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`,  // צירוף הטוקן ב-Authorization header
//                 'Content-Type': 'application/json',  // ציון סוג התוכן
//             }
//         })
//         if (res.status === 200) {
//             console.log("res", res);
//             await setOrders(res.data)
//             await console.log("orders", orders)
//         }
//     }

//     // 2. תבנית לפרטי פריטים בהזמנה
//     const rowExpansionTemplate = (data) => {
//         return (

//             <div className="p-3">
//                 <h5>פרטי פריטים:</h5>
//                 <ul>
//                     {data.items.map((item, index) => (
//                         <li key={index}>
//                             {item.readyDesign_id?.name} - {item.readyDesign_id?.price} ₪ - כמות: {item.cnt}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         );
//     };

//     return (
//         <>
//             <div className="card flex flex-wrap justify-content-center gap-3">
//                 <Button label="הזמנות שממתינות לאישור" onClick={() => UnconfirmedOrders("unConfirm")} />
//                 <Button label="הזמנות מאושרות " severity="secondary" onClick={() => UnconfirmedOrders("confirm")} />
//                 <Button label="הזמנות קרובות" severity="success" />
//             </div>
//             <div className="card">
//                 <DataTable
//                     value={orders}
//                     paginator
//                     rows={5}
//                     expandedRows={expandedRows} // 3. הגדרת שורות מורחבות
//                     onRowToggle={(e) => setExpandedRows(e.data)} // 4. קביעת פעולה על לחיצה
//                     rowExpansionTemplate={rowExpansionTemplate} // 5. שימוש בתבנית ההרחבה
//                     dataKey="_id" // שדה ייחודי
//                     tableStyle={{ minWidth: '50rem' }}
//                 >
//                     <Column expander style={{ width: '3em' }} /> {/* 6. הוספת כפתור להרחבה */}
//                     <Column field="user_id.username" header="משתמש" style={{ width: '25%' }} />
//                     <Column
//                         header="פריטים"
//                         body={(rowData) =>
//                             rowData.items?.map((item) =>
//                                 item?.readyDesign_id?.name || "עיצוב לא זמין"
//                             ).join(", ")
//                         }
//                     />
//                     <Column field="status" header="סטטוס" style={{ width: '25%' }} />
//                     <Column field="deliveryDate" header="תאריך משלוח" style={{ width: '25%' }} />
//                 </DataTable>
//             </div>
//         </>
//     )
// }
// export default Orders;

// import React, { useState } from 'react';
// import { Button } from 'primereact/button';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';

// const Orders = () => {
//     const token = useSelector(state => state.Token.tokenstr);
//     const [orders, setOrders] = useState([]);
//     const [expandedRows, setExpandedRows] = useState(null);

//     const UnconfirmedOrders = async (status) => {
//         const res = await axios.get(`http://localhost:3600/api/order/getOrderByStatus/${status}`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             }
//         });
//         if (res.status === 200) {
//             setOrders(res.data);
//         }
//     }

//     const rowExpansionTemplate = (data) => {
//         return (
//             <div className="p-3">
//                 <h5>פרטי פריטים:</h5>
//                 <ul>
//                     {data.items.map((item, index) => (
//                         <li key={index}>
//                             {item.readyDesign_id?.name} - {item.readyDesign_id?.price} ₪ - כמות: {item.cnt}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         );
//     };

//     return (
//         <>
//             <div className="card flex flex-wrap justify-content-center gap-3">
//                 <Button label="הזמנות שממתינות לאישור" onClick={() => UnconfirmedOrders("unConfirm")} />
//                 <Button label="הזמנות מאושרות" severity="secondary" onClick={() => UnconfirmedOrders("confirm")} />
//                 <Button label="הזמנות קרובות" severity="success" />
//             </div>
//             <div className="card">
//                 <DataTable
//                     value={orders}
//                     paginator
//                     rows={5}
//                     expandedRows={expandedRows}
//                     onRowToggle={(e) => setExpandedRows(e.data)}
//                     rowExpansionTemplate={rowExpansionTemplate}
//                     dataKey="_id"
//                     tableStyle={{ minWidth: '50rem' }}
//                 >
//                     <Column expander style={{ width: '3em', textAlign: 'center' }} 
//                             bodyClassName="expand-icon" /> {/* שינוי לכיוון החץ */}
//                     <Column field="user_id.username" header="משתמש" style={{ width: '25%' }} />
//                     <Column
//                         header="פריטים"
//                         body={(rowData) =>
//                             rowData.items?.map((item) =>
//                                 item?.readyDesign_id?.name || "עיצוב לא זמין"
//                             ).join(", ")
//                         }
//                     />
//                     <Column field="status" header="סטטוס" style={{ width: '25%' }} />
//                     <Column field="deliveryDate" header="תאריך משלוח" style={{ width: '25%' }} />
//                 </DataTable>
//             </div>
//         </>
//     )
// }

// export default Orders;
import './Orders'
import React, { useState } from 'react';
import { Button } from 'primereact/button';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const Orders = () => {
    const token = useSelector(state => state.Token.tokenstr);
    const user = useSelector(state => state.User.user);
    const [orders, setOrders] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const sendOrderEmail = async (to,date) => {
        console.log(to);
        
        try {
            const res = await fetch("http://localhost:3600/api/emails/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    // to: to,// כתובת הלקוח
                    // subject: "אישור הזמנה",
                    // text: text,
                    customerEmail: to, // כתובת הלקוח
                    adminEmail: 'yambalonb@gmail.com', // כתובת המנהל
                    customerSubject: "הזמנתך אושרה!! ", // נושא ללקוח
                    adminSubject: "אישרת הזמנה חדשה במערכת", // נושא למנהל
                    customerText: "תודה על הזמנתך! אנחנו נטפל בה בקרוב.", // תוכן ללקוח
                    adminText: `אישרת הזמנההההה חדשה לתאריך${date} אנא שמור את התאריךך`
                }),
            });
            if (res.status == 200)
                console.log("=✅ Email sent to customer and admin!");
          
        } catch (error) {
            console.error("❌ Error sending email:", error);
        }
    };
    const confirmOrder = async (id, useremail, status, date) => {

        try {
            const res = await axios.put(
                `http://localhost:3600/api/order/updateStatus`,
                {
                    _id: id,
                    status: status
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                }
            );

            if (res.status === 200) {
                UnconfirmedOrders("unConfirm")
                sendOrderEmail(useremail, date);
            }
        } catch (err) {
            console.error("שגיאה בבקשת אישור:", err);
            alert("שגיאה: " + err.response?.data?.message || err.message);
        }
    };

    const UnconfirmedOrders = async (status) => {
        const res = await axios.get(`http://localhost:3600/api/order/getOrderByStatus/${status}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        if (res.status === 200) {
            setOrders(res.data);
        }
    }

    const rowExpansionTemplate = (data) => {
        console.log(orders)
        console.log("row data for expansion:", data);
        return (
            <div className="p-3">
                <h5>פרטי פריטים:</h5>
                {/* <ul>
                    {data.items.map((item, index) => (
                    
                       
                        <li key={index}>
                           {item.image} {item.name} - {item.readyDesign_id?.price} ₪ - כמות: {item.quantity}
                        </li>
                    ))}
                </ul> */}
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {data.items.map((item, index) => (
                        <li key={index} style={{ marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                {item.image && (
                                    <img
                                        src={`http://localhost:3600${item.image}`}
                                        alt={item.nam}
                                        style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                                    />
                                )}
                                <span>
                                    {item.name} - {item.readyDesign_id?.price} ₪ - כמות: {item.quantity}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
                <ul></ul>
            </div>
        );
    };

    return (
        <>
            <div className="card flex flex-wrap justify-content-center gap-3">
                <Button label="הזמנות שממתינות לאישור" onClick={() => UnconfirmedOrders("unConfirm")} />
                <Button label="הזמנות מאושרות" severity="secondary" onClick={() => UnconfirmedOrders("confirm")} />
                <Button label="הזמנות קרובות" severity="success" />
            </div>
            <div className="card">
                <DataTable
                    value={orders}
                    paginator
                    rows={5}
                    expandedRows={expandedRows}
                    onRowToggle={(e) => setExpandedRows(e.data)}
                    rowExpansionTemplate={rowExpansionTemplate}
                    dataKey="_id"
                    tableStyle={{ minWidth: '50rem' }}
                >
                    <Column expander style={{ width: '3em', textAlign: 'center' }} />
                    <Column field="user_id.username" header="משתמש" style={{ width: '25%' }} />
                    <Column
                        header="פריטים"
                        body={(rowData) =>
                            rowData.items?.map((item) =>
                                item?.readyDesign_id?.name || "עיצוב לא זמין"
                            ).join(", ")
                        }
                    />
                    <Column
                        header="סטטוס"
                        body={(rowData) => (
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <span>{rowData.status}</span>
                                {rowData.status === "unConfirm" && (
                                    <Button
                                        label="אשר"
                                        icon="pi pi-check"
                                        severity="success"
                                        size="small"
                                        onClick={() => confirmOrder(rowData._id, rowData.user_id.email, "confirm", rowData.deliveryDate)}
                                    />
                                )}
                            </div>
                        )}
                        style={{ width: '25%' }}
                    />

                    <Column field="deliveryDate" header="תאריך משלוח" style={{ width: '25%' }} />
                </DataTable>
            </div>
        </>
    )
}

export default Orders;
