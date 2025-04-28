
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
                ordersByStatus("unConfirm")
                sendOrderEmail(useremail,date);
            }
        } catch (err) {
            console.error("שגיאה בבקשת אישור:", err);
            alert("שגיאה: " + err.response?.data?.message || err.message);
        }
    };
    const deliverOrder = async (id, status) => {

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
                ordersByStatus("confirm")
                // sendOrderEmail(useremail,date);
            }
        } catch (err) {
            console.error("שגיאה בבקשת אישור:", err);
            alert("שגיאה: " + err.response?.data?.message || err.message);
        }
    };


    const ordersByStatus = async (status) => {
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
                <Button label="הזמנות שממתינות לאישור" onClick={() => ordersByStatus("unConfirm")} />
                <Button label="הזמנות מאושרות" severity="secondary" onClick={() => ordersByStatus("confirm")} />
                <Button label="הזמנות שנשלחו" severity="warning" onClick={() => ordersByStatus("sent")} />
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
                                 {rowData.status === "confirm" && (
                                    <Button
                                        label="נמסר"
                                        icon="pi pi-check"
                                        severity="success"
                                        size="small"
                                        onClick={() => deliverOrder(rowData._id ,"sent")}
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
