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
    const userId = 123; // נניח שזה ה-ID של המשתמש המחובר
    const token = useSelector(state => state.Token.tokenstr);
    const user = useSelector(state => state.User.user)

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
        <div className="p-4">
            <Toast ref={toast} />
            <h2>🛒 סל הקניות</h2>

            {loading ? <p>🔄 טוען מוצרים...</p> : (
                cart.length === 0 ? <p>🛍️ אין מוצרים בסל</p> : (
                    <DataTable value={cart} emptyMessage="אין מוצרים בסל" responsiveLayout="scroll"   rowClassName={() => "custom-row"} >
                        <Column header="תמונה" body={item => (
                            <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', borderRadius: '8px' }} />
                        )} />

                        <Column field="name" header="מוצר"></Column>
                        <Column field="price" header="מחיר" body={item => `${item.price} ₪`}></Column>
                        <Column header="כמות" body={item => (
                            <InputNumber value={item.quantity} onValueChange={(e) => updateQuantity(e.value, item)} min={1} />
                        )}></Column>
                        <Column header="פעולות" body={item => (
                            <Button icon="pi pi-trash" className="p-button-danger" onClick={() => removeItem(item)} />
                        )}></Column>
                    </DataTable>
                )
            )}

            <Panel header="סיכום הזמנה" className="mt-4">
                <h3>סה"כ לתשלום: {total} ₪</h3>
                <Button label="לתשלום" icon="pi pi-credit-card" className="p-button-success" />
            </Panel>
        </div>
    );
};

export default Cart;
