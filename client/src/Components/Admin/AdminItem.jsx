// import React from 'react'; 
// import { Button } from 'primereact/button';
// import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import axios from 'axios'
// import Item from '. ./Item';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { setval } from '../../Store/ItemsSlice'
import Item from '../Home/Item';
// import React, { useState } from "react";
// import { Button } from 'primereact/button';
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
      getAllItems();//?????????????
        // dispatch(get(res.data))

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
                        </div>
                        {/* <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                <span className="text-2xl font-semibold">${product.price}</span>
                                <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                            </div> */}
                    </div>
                </div>
            </div>
        );
    };
    const gridItem = (product) => {
        return (
            <div dir="rtl" className="col-12 sm:col-6 lg:col-4 p-2" key={product.id}>
                <div className="p-2 sm:p-3 md:p-4 border-1 surface-border surface-card border-round shadow-2 w-full">

                    {/* כרטיס לתמונה בגודל מותאם */}
                    <div
                        className="w-full flex justify-content-center align-items-center bg-white overflow-hidden border-round"
                        // onClick={() => navigate(`/Item`, { state: { product } })}
                        style={{ cursor: "pointer", height: "250px" }} // הגבלת גובה לתמונה
                    >
                        <img
                            className="object-cover w-full h-full"
                           src={`http://localhost:3600${product.image_url}`} 
                            alt={product.name}
                            style={{ objectFit: 'cover', width: '80%', height: '80%' }} // תמונה בגודל קטן יותר
                        />
                    </div>

                    {/* קטגוריה עם אייקון למעלה */}
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
                        {/* <Button icon="pi pi-pencil" className="p-button" onClick={()=>navigate('/Admin/Items/UpdateItem')} /> */}

                              {/* <div className="card flex justify-content-center"> */}
                                    <Button icon="pi pi-pencil" className="p-button" onClick={() => setVisibleUpdate(true)} />
                                    <Dialog
                                        visible={visibleUpdate}
                                        modal
                                        onHide={() => {if (!visible) return; setVisible(false); }}
                                        content={({ hide }) => (
                                            <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                                                <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" className="block mx-auto">
                                                    <g mask="url(#mask0_2642_713)">
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M31.5357 13.0197L29.2036 17.0218L31.531 21.0161C32.3802 22.4733 32.3802 24.2131 31.5311 25.6702C30.682 27.1274 29.1612 27.9973 27.463 27.9973H22.8081L20.6555 31.6915C19.7975 33.164 18.2608 34.0431 16.5447 34.0431C14.8286 34.0431 13.2918 33.164 12.4337 31.6915L10.2811 27.9973H5.617C3.93113 27.9973 2.42136 27.1337 1.57841 25.6871C0.735451 24.2405 0.735451 22.5131 1.57841 21.0666L3.91045 17.0644L1.58298 13.0702C0.733895 11.613 0.733895 9.87311 1.58298 8.41596C2.43207 6.95878 3.95286 6.08884 5.65104 6.08884H10.306L12.4585 2.39474C13.3165 0.922318 14.8535 0.0430908 16.5695 0.0430908C18.2856 0.0430908 19.8223 0.922227 20.6803 2.39474L22.8329 6.08884H27.4971C29.183 6.08884 30.6927 6.95252 31.5357 8.3991C32.3787 9.84573 32.3787 11.573 31.5357 13.0197ZM16.5695 1.06124C15.225 1.0612 14.0208 1.74999 13.3486 2.90374L11.4927 6.08873H21.6463L19.7904 2.90374C19.1182 1.74999 17.914 1.06124 16.5695 1.06124ZM22.7105 26.1286L22.6607 26.2141L22.6534 26.2266L22.5337 26.432L21.8976 27.5237L21.7881 27.7117L20.4662 29.9803L20.0676 30.6643L19.7869 31.146L19.7763 31.1484L19.77 31.1592C19.0978 32.313 17.8714 32.6453 16.5269 32.6453C15.1843 32.6453 14.004 32.3149 13.3312 31.1641L13.31 31.1588L12.6277 29.9878L12.4567 29.6945L5.09715 17.0644L6.43206 14.7736L6.43225 14.7744L8.78685 10.7356L8.7852 10.7353L9.05248 10.2767L9.05421 10.277L10.9022 7.10709L22.2401 7.10314L28.017 17.0219L22.7105 26.1286ZM30.6411 25.1613C29.9777 26.2996 28.7896 26.9792 27.4629 26.9792H23.4014L28.6101 18.0401L30.641 21.5253C31.3043 22.6636 31.3043 24.0229 30.6411 25.1613ZM2.46839 25.178C3.1256 26.3058 4.30263 26.9791 5.617 26.9791H9.6878L4.50379 18.0826L2.46839 21.5756C1.81123 22.7035 1.81123 24.0502 2.46839 25.178ZM2.47303 12.5611C1.80969 11.4227 1.80969 10.0634 2.47303 8.92507C3.13632 7.78669 4.32437 7.10706 5.65105 7.10706H9.71266L4.50381 16.0462L2.47303 12.5611ZM27.497 7.10706C28.8114 7.10706 29.9885 7.78039 30.6456 8.90826C31.3028 10.036 31.3028 11.3827 30.6456 12.5106L28.6102 16.0036L23.4262 7.10706H27.497Z"
                                                            fill="white"
                                                        />
                                                    </g>
                                                    <path d="M22.0969 18.6465L20.3461 18.2616L21.7078 20.1862V26.1522L26.0214 22.3031L26.3764 15.7598L24.2367 16.5296L22.0969 18.6465Z" fill="white" />
                                                    <path d="M11.2035 18.6465L12.9543 18.2616L11.5926 20.1862V26.1522L7.27906 22.3031L6.92397 15.7598L9.06376 16.5296L11.2035 18.6465Z" fill="white" />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.1761 20.5713L13.7323 18.2618L14.7049 18.8392H18.5955L19.5681 18.2618L21.1243 20.5713V29.2316L19.3056 32.6659H13.6397L12.1761 29.2316V20.5713Z" fill="white" />
                                                    <path d="M21.7079 29.8089L24.2367 27.3071V24.8052L21.7079 26.9221V29.8089Z" fill="white" />
                                                    <path d="M11.5927 29.8089L9.06387 27.3071V24.8052L11.5927 26.9221V29.8089Z" fill="white" />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M16.2613 7.09967H14.1215L12.5652 10.7563L15.0941 18.0694H18.401L20.7353 10.7563L19.1791 7.09967H17.0394V18.0694H16.2613V7.09967Z" fill="white" />
                                                    <path d="M15.0942 18.0694L6.7296 14.9901L5.56244 10.1788L12.7599 10.7562L15.2887 18.0694H15.0942Z" fill="white" />
                                                    <path d="M18.4011 18.0694L26.7658 14.9901L27.9329 10.1788L20.5409 10.7562L18.2066 18.0694H18.4011Z" fill="white" />
                                                    <path d="M21.1245 10.1789L24.8545 9.794L22.4862 7.09967H19.7628L21.1245 10.1789Z" fill="white" />
                                                    <path d="M12.1762 10.1789L8.4462 9.794L10.8145 7.09967H13.5378L12.1762 10.1789Z" fill="white" />
                                                </svg>
                                                <div className="inline-flex flex-column gap-2">
                                                    <label htmlFor="username" className="text-primary-50 font-semibold">
                                                        Username
                                                    </label>
                                                    <InputText id="username" label="Username" className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                                                </div>
                                                <div className="inline-flex flex-column gap-2">
                                                    <label htmlFor="username" className="text-primary-50 font-semibold">
                                                        Username
                                                    </label>
                                                    <InputText id="password" label="Password" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="password"></InputText>
                                                </div>
                                                <div className="flex align-items-center gap-2">
                                                    <Button label="Sign-In" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                                                    <Button label="Cancel" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                                                </div>
                                            </div>
                                        )}
                                    ></Dialog>
                                {/* </div> */}
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
                {/* {visible&&<Item  setVisible={setVisible} visible={visible}  />} */}
            </div>

        </>
    )
}
export default AdminItems










