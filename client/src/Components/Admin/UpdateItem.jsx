import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import axios from "axios";
import { useSelector } from "react-redux";
import { FileUpload } from 'primereact/fileupload';


export default function UpdateItem() {
    const location = useLocation();
    const [visible, setVisible] = useState(false);
    const [productName, setProductName] = useState(location.state.product.name)
    const [productDescription, setProductDescription] = useState(location.state.product.description)
    const [productPrice, setProductPrice] = useState(location.state.product.price)
    const [productCagory, setProductCagory] = useState(location.state.product.catgory)
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();
    const token = useSelector(state => state.Token.tokenstr)
    const productToUp = {
        name: productName,
        _id: location.state.product._id,
        description: productDescription,
        price: productPrice,
        catgory: productCagory
    }
    const update = async () => {
        const formData = new FormData();
        formData.append('_id',location.state.product._id)
        formData.append('name', productName);
        formData.append('description', productDescription);
        formData.append('price', productPrice);
        // formData.append('category', productCagory);
        formData.append('image', selectedFile); // השם הזה חשוב!
        console.log("productName:", productName);
        console.log("productDescription:", productDescription);
        console.log("productPrice:", productPrice);
        console.log("productCagory:", productCagory);
        console.log("selectedFile:", selectedFile);
        try {
            const res = await axios.put(`http://localhost:3600/api/readyDesign/updateReadyDesign`, formData
                ,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                       
                    }
                }
            );
            if (res.status == 200) {
                alert("התעדכןןןןן")
                handleCancel()
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        setVisible(true);
    }, []);

    const handleCancel = () => {
        setVisible(false);
        navigate(-1);
    };

    return (
        <div className="card flex justify-content-center">
            <Dialog
                visible={visible}
                modal
                onHide={handleCancel}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                        <h2>עדכון מוצר</h2>
                        <label>שם מוצר</label>
                        <InputText value={productName} onChange={(e) => setProductName(e.target.value)} />
                        <label>תיאור מוצר</label>
                        <InputText value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
                        <label>מחיר מוצר</label>
                        <InputText value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
                        <label>קטגורית מוצר </label>
                        <InputText value={productCagory} onChange={(e) => setProductCagory(e.target.value)} />


                        <label>בחרי תמונה:</label>
                        <FileUpload
                            name="image"
                            customUpload
                            accept="image/*"
                            maxFileSize={5 * 1024 * 1024}
                            uploadHandler={(e) => {
                                const file = e.files[0];
                                console.log("נבחר קובץ:", file);
                                if (file) {
                                    setSelectedFile(file);
                                    setPreview(URL.createObjectURL(file));
                                }
                            }}
                            emptyTemplate={<p>גררי קובץ תמונה או לחצי לבחירה</p>}
                            chooseLabel="בחרי"
                            uploadLabel="אשרי"
                            cancelLabel="ביטול"
                        />
                        {preview && <img src={preview} alt="תצוגה" style={{ width: 150, marginTop: 10 }} />}
                    


                    <div className="flex gap-2 justify-content-end mt-4">
                        <Button label="עדכן" onClick={update} />
                        <Button label="ביטול" severity="secondary" onClick={handleCancel} />
                    </div>
                    </div>
    )
}
            />
        </div >
    );
}
