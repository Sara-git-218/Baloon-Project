import React, { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { Toast } from "primereact/toast";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Cart.css";

const Cart = () => {
    const toast = useRef(null);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = useSelector(state => state.Token.tokenstr);
    const user = useSelector(state => state.User.user);
    const [orderSent, setOrderSent] = useState(false);
    const [date, setDate] = useState("");
    const handleChange1 = (event) => {
        setDate(event.target.value);
    };

    const createOrder = async (item) => {
        const today = new Date();

        if (cart.length === 0) {
            alert("אין מוצרים להזמין");
            return;
        }

        // בדיקה האם date מוגדר
        if (!date) {
            alert("בחירת תאריך היא חובה");
            return;
        }

        let selectedDate;
        try {
            // ממירים את date לאובייקט Date
            selectedDate = new Date(date);

            // בודקים אם התאריך לא תקין
            if (isNaN(selectedDate)) {
                throw new Error("Invalid date");
            }
        } catch (error) {
            console.error("שגיאה בתאריך שנבחר:", error);
            alert("תאריך שנבחר אינו תקין");
            return;
        }

        // בדיקת תאריך נבחר מול תאריך היום
        if (
            selectedDate.getFullYear() < today.getFullYear() ||
            (selectedDate.getFullYear() === today.getFullYear() && selectedDate.getMonth() < today.getMonth()) ||
            (selectedDate.getFullYear() === today.getFullYear() &&
                selectedDate.getMonth() === today.getMonth() &&
                selectedDate.getDate() < today.getDate())
        ) {
            alert("בחירת תאריך תקין היא חובהההה");
            return;
        }

        const order = {
            user_id: user._id,
            items: cart,
            deliveryDate: date,
            paymentMethod: "מזומן",
        };
        try {
            const res = await axios.post('http://localhost:3600/api/order/createOrder', order, {
                headers: {
                    'Authorization': `Bearer ${token}`,  // צירוף הטוקן ב-Authorization header
                    'Content-Type': 'application/json',  // ציון סוג התוכן
                }
            })
            if (res.status == 200) {
                const res = await axios.delete('http://localhost:3600/api/itemInCart/deleteallItemsForUser', {
                    headers: {
                        'Authorization': `Bearer ${token}`,  // צירוף הטוקן ב-Authorization header
                        'Content-Type': 'application/json',  // ציון סוג התוכן
                    }
                })
                await sendOrderEmail()

                if (res.status === 200) {
                    console.log(cart);

                    setCart([])
                }

            }

        }
        catch (e) {
            console.log(e)
        }

    }
    const sendOrderEmail = async () => {
        try {
            const res = await fetch("http://localhost:3600/api/emails/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    customerEmail: user.email, // כתובת הלקוח
                    adminEmail: 'yambalonb@gmail.com', // כתובת המנהל
                    customerSubject: "אישור הזמנה", // נושא ללקוח
                    adminSubject: "הזמנה חדשה ממערכת", // נושא למנהל
                    customerText: "תודה על הזמנתך! אנחנו נטפל בה בקרוב.", // תוכן ללקוח
                    adminText: "שלום מנהל, הזמנה חדשה התקבלה ויש לאשר אותה", // תוכן למנהל
                }),
            });
            if (res.status == 200)
                console.log("=✅ Email sent to customer and admin!");
            setOrderSent(true);
        } catch (error) {
            console.error("❌ Error sending email:", error);
        }
    };
    const ItemsInCartForUser = async () => {
        if (!user) {
            alert("התחבר לאתרררר");
            return;
        }

        try {
            console.log(token);
            const res = await axios.get('http://localhost:3600/api/itemInCart/getItemInCartByUser_id', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            const data = res.data;
            console.log(data);

            if (res.status === 200) {
                setCart(Array.isArray(data) ? data.map(item => ({
                    id: item._id,
                    readyDesign_id: item.readyDesign_id,
                    name: item.readyDesign_id?.name || "עיצוב מותאם אישית",
                    price: item.readyDesign_id ? item.readyDesign_id.price : 0,
                    quantity: item.cnt,
                    colors: item.isDefualtColors ? item.readyDesign_id.defualtColors : item.colorsIfNotDefault,
                    image: item.readyDesign_id?.image_url || "/placeholder.jpg",
                    CaptionContent: item.CaptionContent,
                    captionType: item.captionType
                })) : []);
            }
        }
        catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };
    const deleteItemInCart = async (item) => {
        try {
            console.log(token);
            console.log(item.id)
            const res = await axios.delete('http://localhost:3600/api/itemInCart/deleteItemInCart', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                data: { _id: item.id }
            });

            const data = res.data;
            console.log(data);

            if (res.status === 200) {

                removeItem(item)

            }
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        ItemsInCartForUser();
    }, []);

    useEffect(() => {
        console.log("🔄 loading:", loading);
        console.log("🛒 cart:", cart);
    }, [loading, cart]);

    const updateQuantity = (value, product) => {
        setCart(cart.map(item => item.id === product.id ? { ...item, quantity: value } : item));
    };

    const removeItem = (product) => {
        setCart(cart.filter(item => item.id !== product.id));
        toast.current.show({ severity: "warn", summary: "הוסר", detail: `${product.name} הוסר מהסל`, life: 3000 });
    };

    // const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = cart.reduce((sum, item) => {
        const captionWords = item.CaptionContent ? item.CaptionContent.split(" ").length : 0; // מספר המילים בכיתוב
        const captionCost = captionWords * 5; // עלות לפי מספר המילים
        return sum + item.price * item.quantity + captionCost;
    }, 0);

    return (
        <div className="p-4 cart-container">
            <Toast ref={toast} />
            <div className="cart-table">
                <h2>🛒 סל הקניות</h2>

                {loading ? <p>🔄 טוען מוצרים...</p> : (
                    cart.length === 0 ? <p>🛍️ אין מוצרים בסל</p> : (
                        <DataTable value={cart} emptyMessage="אין מוצרים בסל" scrollable>
                            <Column field="image" header="תמונה" alignHeader="center" style={{ textAlign: "center" }} body={item => (
                                <img src={`http://localhost:3600${item.image} `} alt={item.name} style={{ width: '100px', height: '100px', borderRadius: '8px' }} />
                            )} />

                            <Column field="name" header="מוצר" alignHeader="center" style={{ textAlign: "center" }} />
                            {/* <Column field="price" header="מחיר" alignHeader="center" style={{ textAlign: "center" }} body={item => `${item.price} ₪`} /> */}
                            <Column
                                field="price"
                                header="כיתוב"
                                alignHeader="center"
                                style={{ textAlign: "center" }}
                                body={item => {
                                    const text = item.CaptionContent ? item.CaptionContent:'-'; // מספר המילים בכיתוב
                                    return `${text}`;
                                }}
                            />
                            <Column
                                field="price"
                                header="מחיר כולל כיתוב"
                                alignHeader="center"
                                style={{ textAlign: "center" }}
                                body={item => {
                                    const captionWords = item.CaptionContent ? item.CaptionContent.split(" ").length : 0; // מספר המילים בכיתוב
                                    const captionCost = captionWords * 5; // חישוב העלות לכיתוב
                                    const totalPrice = item.price + captionCost; // מחיר המוצר כולל הכיתוב
                                    return `${totalPrice} ₪`;
                                }}
                            />
                            <Column
                                header="צבעים"
                                alignHeader="center"
                                style={{ textAlign: "center", whiteSpace: "nowrap" }}
                                body={(item) =>
                                    item.colors && item.colors.length > 0 ? (
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                gap: "5px",
                                                flexWrap: "wrap"
                                            }}
                                        >
                                            {item.colors.map((color, index) => (
                                                <div
                                                    key={index}
                                                    style={{
                                                        backgroundColor: color,
                                                        width: "20px",
                                                        height: "20px",
                                                        borderRadius: "50%",
                                                        border: "1px solid #000"
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <span>צבעים כמו בתמונה</span>
                                    )
                                }
                            />

                            <Column header="כמות" alignHeader="center" style={{ textAlign: "center" }} body={item => (
                                <InputNumber value={item.quantity} onValueChange={(e) => updateQuantity(e.value, item)} min={1} />
                            )} />
                            <Column header="פעולות" alignHeader="center" style={{ textAlign: "center" }} body={item => (
                                <Button icon="pi pi-trash" className="p-button-danger" onClick={() => deleteItemInCart(item)} />
                            )} />
                        </DataTable>
                    )
                )}
            </div>
            {orderSent && (
                <div style={{
                    marginTop: "1.5rem",
                    padding: "1.5rem",
                    backgroundColor: "#ffe0f0",
                    borderRadius: "12px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                    textAlign: "center",
                    color: "#7c2d12",
                    fontFamily: "Varela Round, sans-serif",
                }}>
                    <h2 style={{ color: "#d6336c", marginBottom: "0.5rem" }}>תודה על ההזמנה! 🎉</h2>
                    <p style={{ marginBottom: "0.5rem" }}>ההזמנה נשלחה למנהל ותאושר בקרוב.</p>
                    <p style={{ marginBottom: "1rem" }}>בדוק את המייל שלך לעדכונים.</p>
                    <a href="/" style={{
                        display: "inline-block",
                        padding: "0.5rem 1rem",
                        backgroundColor: "#f06292",
                        color: "white",
                        borderRadius: "8px",
                        textDecoration: "none",
                        transition: "background-color 0.3s",
                    }}
                        onMouseOver={(e) => e.target.style.backgroundColor = "#ec407a"}
                        onMouseOut={(e) => e.target.style.backgroundColor = "#f06292"}
                    >
                        ⬅ חזרה לחנות
                    </a>
                </div>
            )}
            <Panel header="סיכום הזמנה" className="cart-summary">
                <div>
                    <input
                        type="date"
                        value={date}
                        onChange={handleChange1}
                        placeholder="בחר תאריך"
                    />
                    <p>התאריך שנבחר: {date || "לא נבחר תאריך"}</p>
                </div>
                <h3>סה"כ לתשלום: {total} ₪</h3>
                <Button label="להזמנהה" icon="pi pi-credit-card" className="p-button-success" onClick={createOrder} />
            </Panel>



        </div>
    );
};

export default Cart;
