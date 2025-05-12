



import { InputText } from 'primereact/inputtext';
import { InputTextarea } from "primereact/inputtextarea";
import { Card } from 'primereact/card';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import axios from 'axios';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import './AddItem.css'
const AddItem = () => {
    const token = useSelector(state => state.Token.tokenstr);

    const [name, setName] = useState('');
    const [price, setPrice] = useState();
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [selectedColors, setSelectedColors] = useState([])

    const kategories = [
        { name: 'עסקים' },
        { name: 'ימי הולדת' },
        { name: 'בר מצווה' },
        { name: 'בת מצווה' },
        { name: 'ימי נישואין' },
        { name: 'ברית/ה' }
    ];

    const colors = [
        '#FF6347', '#4CAF50', '#1E90FF', '#FFD700', '#800080',
        '#DC143C', '#00FFFF', '#FF00FF', '#8A2BE2', '#A52A2A',
        '#7FFF00', '#D2691E', '#FF1493', '#00BFFF', '#696969',
        '#228B22', '#FF4500', '#2E8B57', '#FFD700', '#808080',
        '#6A5ACD', '#B8860B'
    ];

    const addDesign = async () => {
        if (!selectedFile || !name || !price || !category) {
            alert("נא למלא את כל השדות החובה ולהעלות תמונה");
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category.name);
        formData.append('defaultColors',selectedColors)
        formData.append('image', selectedFile); // השם הזה חשוב!

        try {
            const res = await axios.post('http://localhost:3600/api/readyDesign/createReadyDesign', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.status === 200) {
                alert("נוסף בהצלחה!");
                // איפוס השדות
                setName('');
                setPrice(null);
                setDescription('');
                setCategory(null);
                setSelectedFile(null);
                setPreview(null);
                setSelectedColors([]);
            }
        } catch (e) {
            console.log(e);
            alert("שגיאה בהעלאה");
        }
    };
    const toggleColorSelection = (color) => {
        // if (isCheckboxChecked) {
        //   return;
        // }
    
        setSelectedColors((prevColors) => {
          if (prevColors.includes(color)) {
            return prevColors.filter(c => c !== color);
          } else {
            return [...prevColors, color];
          }
        });
      };

    return (
        <Card title="הוספת עיצוב חדש">
            <div className="card flex flex-column gap-4">

                <div className="flex flex-column gap-2">
                    <label htmlFor="name">שם המוצר:</label>
                    <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="flex flex-column gap-2">
                    <label htmlFor="description">תיאור:</label>
                    <InputTextarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} />
                </div>

                <div className="flex flex-column gap-2">
                    <label htmlFor="price">מחיר:</label>
                    <InputNumber id="price" value={price} onValueChange={(e) => setPrice(e.value)} />
                </div>

                <div className="flex flex-column gap-2">
                    <label htmlFor="category">קטגוריה:</label>
                    <Dropdown value={category} onChange={(e) => setCategory(e.value)} options={kategories} optionLabel="name" placeholder="בחר קטגוריה" />
                </div>
                <div className="flex flex-column gap-2">
            
                              <div className="color-picker">
                    <p>בחר צבעים:</p>
                    <div className="color-circles">
                        {colors.map((color, index) => (
                            <div
                                key={index}
                                className={`color-circle ${selectedColors.includes(color) ? 'selected' : ''}`}
                                style={{ backgroundColor: color }}
                                onClick={() => toggleColorSelection(color)}
                            >
                                {selectedColors.includes(color) && <span className="checkmark">✔</span>}
                            </div>
                        ))}
                    </div>
                    <div>{`צבעים שנבחרו${selectedColors}`}</div>
                </div> 
                </div>
      

                    <div className="flex flex-column gap-2">
                        <label>בחרי תמונה:</label>
                        <FileUpload
                            name="image"
                            customUpload
                            accept="image/*"
                            maxFileSize={5 * 1024 * 1024}
                            uploadHandler={(e) => {
                                const file = e.files[0];
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
                    </div>

                    <div className="flex justify-content-center">
                        <Button label="הוסף עיצוב" onClick={addDesign} />
                    </div>
                </div>
        </Card>
    );
};

export default AddItem;
