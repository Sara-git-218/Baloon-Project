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
    const user = useSelector(state => state.User.user)
    const sendOrderEmail = async () => {
        try {
         const res= await fetch("http://localhost:3600/api/emails/send-email", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" },
            body: JSON.stringify({
              to: 'sarah74218@gmail.com,h49202@gmail.com',// כתובת הלקוח
              subject: "אישור הזמנה",
              text: "תודה על הזמנתך! אנחנו נטפל בה בקרוב.",
            }),
          });
      if(res.status==200)
          console.log("=✅ Email sent to customer and admin!");
        alert("הזמנתך נשלחה למנהל ומצפה לאישורו במידה ויאשר ישלח אליך מייל עם לינק לתשלום ")
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
                    name: item.readyDesign_id?.name || "עיצוב מותאם אישית",
                    price: item.readyDesign_id ? item.readyDesign_id.price : 0,
                    quantity: item.cnt,
                    image: item.readyDesign_id?.image_url || "/placeholder.jpg"
                })) : []);
            }
        }
        catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };
    const deleteItemInCart=async(item)=>{
        try {
            console.log(token);
            console.log(item.id)
            const res = await axios.delete('http://localhost:3600/api/itemInCart/deleteItemInCart', {
                headers: {
                    'Authorization':`Bearer ${token}`,
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

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="p-4 cart-container">
            <Toast ref={toast} />
            <div className="cart-table">
                <h2>🛒 סל הקניות</h2>
    
                {loading ? <p>🔄 טוען מוצרים...</p> : (
                    cart.length === 0 ? <p>🛍️ אין מוצרים בסל</p> : (
                        <DataTable value={cart} emptyMessage="אין מוצרים בסל" scrollable>
                            <Column field="image"header="תמונה" alignHeader="center" style={{ textAlign: "center" }}body={item => (
                                <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', borderRadius: '8px' }} />
                            )} />
    
                            <Column field="name" header="מוצר" alignHeader="center" style={{ textAlign: "center" }} />
                            <Column field="price" header="מחיר" alignHeader="center" style={{ textAlign: "center" }} body={item => `${item.price} ₪`} />
                            <Column header="כמות" alignHeader="center" style={{ textAlign: "center" }} body={item => (
                                <InputNumber value={item.quantity} onValueChange={(e) => updateQuantity(e.value, item)} min={1} />
                            )} />
                            <Column header="פעולות" alignHeader="center" style={{ textAlign: "center" }} body={item => (
                                <Button icon="pi pi-trash" className="p-button-danger" onClick={ ()=>deleteItemInCart(item)} />
                            )} />
                        </DataTable>
                    )
                )}
            </div>
    
            <Panel header="סיכום הזמנה" className="cart-summary">
                <h3>סה"כ לתשלום: {total} ₪</h3>
                <Button label="להזמנהה" icon="pi pi-credit-card" className="p-button-success" onClick={sendOrderEmail} />
            </Panel>
        </div>
    );
};    

export default Cart;
