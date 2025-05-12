
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { setval } from '../../Store/ItemsSlice'
import Item from '../Home/Item';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
const AdminItems = () => {
     const [visibleUpdate, setVisibleUpdate] = useState(false);
     const toast = useRef(null);
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const items = useSelector(state => state.Items.arr);
    const token = useSelector(state => state.Token.tokenstr)
    const removeItem = (product) => {
       setProducts(products.filter(item => item._id !== product._id));
        toast.current.show({ severity: "warn", summary: "הוסר", detail: `${product.name} הוסר מהסל`, life: 3000 });
    };
    const deleteItem = async (item) => {
        console.log(item._id);
        console.log(token);
        const confirmDelete = window.confirm(`המוצר "${item.name}" הולך להימחק. האם אתה בטוח?`);
        if (!confirmDelete) return;
        
        try {
            const res = await axios.delete('http://localhost:3600/api/readyDesign/deleteReadyDesign', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                data: { _id: item._id }
            })
            if (res.status == 200) {
                removeItem(item)
            }
        }
        catch(e)
        {
            console.log(e)
        }
 }
    const getAllItems=async()=>{
        const res = await axios.get('http://localhost:3600/api/readyDesign/getAllReadyDesign')
         setProducts(res.data)
        dispatch(setval(res.data));


    }
    useEffect(() => {
      getAllItems();
       

    }, []);

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const listItem = (product, index) => {
        return (
            <div dir="rtl" className="col-12" key={product.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    {/* <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`${product.image_url}`} alt={product.name} /> */}
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.name}</div>
                            {/* <Rating value={product.rating} readOnly cancel={false}></Rating> */}
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.category}</span>
                                </span>
                                <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                            </div>
                            <Button icon="pi pi-trash" className="p-button-danger" onClick={()=>deleteItem(product)} />
                            <Button icon="pi pi-pencil" className="p-button" onClick={() =>navigate('/Admin/Items/UpdateItem', { state: { product } })} />

                        </div>

                    </div>
                </div>
            </div>
        );
    };
    const gridItem = (product) => {
        return (
            <div dir="rtl" className="col-12 sm:col-6 lg:col-4 p-2" key={product.id}>
                <div className="p-2 sm:p-3 md:p-4 border-1 surface-border surface-card border-round shadow-2 w-full">

           
                    <div
                        className="w-full flex justify-content-center align-items-center bg-white overflow-hidden border-round"
                       
                        style={{ cursor: "pointer", height: "250px" }} // הגבלת גובה לתמונה
                    >
                        <img
                            className="object-cover w-full h-full"
                           src={`http://localhost:3600${product.image_url}`} 
                            alt={product.name}
                            style={{ objectFit: 'cover', width: '80%', height: '80%' }} // תמונה בגודל קטן יותר
                        />
                    </div>

                    <div className="flex justify-content-start align-items-center mt-2">
                        <i className="pi pi-tag text-2xl mr-2"></i> {/* אייקון תגית */}
                        <span className="text-sm text-500">{product.category}</span>
                    </div>

                    {/* תוכן – שם, תגית */}
                    <div className="mt-2 flex flex-column align-items-center text-center">
                        <div className="text-xl font-bold text-900">{product.name}</div>
                        <Tag value={product.inventoryStatus} severity={getSeverity(product)} className="mt-2" />
                    </div>

                    <div>
                        <Button icon="pi pi-trash" className="p-button-danger" onClick={()=>deleteItem(product)} />
               
                                    <Button icon="pi pi-pencil" className="p-button" onClick={() =>navigate('/Admin/Items/UpdateItem', { state: { product } })} />
                                  
                            
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) {
            return;
        }

        if (layout === 'list') return listItem(product, index);
        else if (layout === 'grid') return gridItem(product);
    };

    const listTemplate = (products, layout) => {
        return <div className="grid grid-nogutter">{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };
    return (
        <>
            <div className="card flex flex-wrap justify-content-center gap-3">
    
                <Button label="הוספת מוצר " severity="secondary" onClick={()=>navigate('/Admin/AddItem')}/>
     

            </div>


            <div className="card">
                <DataView value={products} listTemplate={listTemplate} layout={layout} header={header()} />
              
            </div>

        </>
    )
}
export default AdminItems










