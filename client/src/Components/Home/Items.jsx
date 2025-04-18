
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import axios from 'axios'
import Item from './Item';
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux"
import {setval} from '../../Store/ItemsSlice'

export default function Items() {
     const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');
     const [visible, setVisible] = useState(false);
     const navigate = useNavigate();
    const dispatch = useDispatch();
    

const getAllItems=async()=>{
    const res = await axios.get('http://localhost:3600/api/readyDesign/getAllReadyDesign')
     setProducts(res.data)
    dispatch(setval(res.data));


}
    useEffect(() => {
        getAllItems();//?????????????
        // dispatch(get(res.data))

    }, []);
    // const items = useSelector((state) => state.Items.value)
    // console.log(items);
    
// const dispatch = useDispatch();
// // const items = useSelector(state => state.items.arr); // קריאת הנתונים
// const items = useSelector(state => state.Items?.arr || []);
// useEffect(() => {
//     const getAllItems = async () => {
//         try {
//             const res = await axios.get("http://localhost:3600/api/readyDesign/getAllReadyDesign");
//             console.log("Fetched data:", res.data);
//             dispatch(setval(res.data));
//             //const items = useSelector(state => state.items.arr)
//           //  console.log(items,"-------------------");
        
//         } catch (error) {
//             console.error("API Error:", error);
//         }
//     };
//     getAllItems();
// }, [dispatch]);

// useEffect(() => {
//     console.log("Redux state updated:", items);
// }, [items]);




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
            <div dir="rtl"className="col-12" key={product.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    {/* <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`${product.image_url}`} alt={product.name} /> */}
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.name}</div>
                            <Rating value={product.rating} readOnly cancel={false}></Rating>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.category}</span>
                                </span>
                                <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                            </div>
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

    // const gridItem = (product) => {
    //     return (
    //         <div dir="rtl"  className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product.id}>
    //             <div  className="p-4 border-1 surface-border surface-card border-round">
    //                 <div className="flex flex-wrap align-items-center justify-content-between gap-2">
    //                     <div className="flex align-items-center gap-2">
    //                         <i className="pi pi-tag"></i>
    //                         <span className="font-semibold">{product.category}</span>
    //                     </div>
    //                     <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
    //                 </div>
    //                 <div className="flex flex-column align-items-center gap-3 py-5">
    //                     <img className="w-9 shadow-2 border-round" src={`${product.image_url}`} alt={product.name} onClick={()=>navigate(`/Item`,{state:{product}})}/>
                        
    //                     <div className="text-2xl font-bold">{product.name}</div>
    //                     {/* <Rating value={product.rating} readOnly cancel={false}></Rating> */}
    //                 </div>
    //                 {/* <div className="flex align-items-center justify-content-between">
    //                     <span className="text-2xl font-semibold">${product.price}</span>
    //                     <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
    //                 </div> */}
    //             </div>
    //         </div>
    //     );
    // };
    // const gridItem = (product) => {
    //     return (
    //         <div dir="rtl" className="col-12 sm:col-6 lg:col-4 p-2" key={product.id}>
    //             {/* כרטיס בודד */}
    //             <div className="p-2 sm:p-3 md:p-4 border-1 surface-border surface-card border-round shadow-2 w-full">
    //                 {/* תמונה עם onClick */}
    //                 <div 
    //                     className="w-full h-12rem flex align-items-center justify-content-center overflow-hidden border-round bg-white"
    //                     onClick={() => navigate(`/Item`, { state: { product } })}
    //                     style={{ cursor: "pointer" }} // מוסיף חיווי של קליק
    //                 >
    //                     <img className="w-full h-full object-cover" 
    //                         src={`${product.image_url}`} 
    //                         alt={product.name} />
    //                 </div>
    
    //                 {/* תוכן – קטגוריה, שם, תגית */}
    //                 <div className="mt-3 flex flex-column align-items-center text-center">
    //                     <span className="text-sm text-500">{product.category}</span>
    //                     <div className="text-xl font-bold text-900">{product.name}</div>
    //                     <Tag value={product.inventoryStatus} severity={getSeverity(product)} className="mt-2" />
    //                 </div>
    //             </div>
    //         </div>
    //     );}
    // const gridItem = (product) => {
    //     return (
    //         <div dir="rtl" className="col-12 sm:col-6 lg:col-4 p-2" key={product.id}>
    //             <div className="p-2 sm:p-3 md:p-4 border-1 surface-border surface-card border-round shadow-2 w-full">
    //                 {/* תמונה עם יחסי גובה-רוחב נכונים */}
    //                 <div 
    //                     className="w-full aspect-ratio border-round bg-white flex align-items-center justify-content-center overflow-hidden"
    //                     onClick={() => navigate(`/Item`, { state: { product } })}
    //                     style={{ cursor: "pointer", aspectRatio: "4 / 3" }} // קובע יחס גובה-רוחב אחיד
    //                 >
    //                     <img className="w-full h-full object-contain" 
    //                         src={`${product.image_url}`} 
    //                         alt={product.name} />
    //                 </div>
    
    //                 {/* תוכן – קטגוריה, שם, תגית */}
    //                 <div className="mt-3 flex flex-column align-items-center text-center">
    //                     <span className="text-sm text-500">{product.category}</span>
    //                     <div className="text-xl font-bold text-900">{product.name}</div>
    //                     <Tag value={product.inventoryStatus} severity={getSeverity(product)} className="mt-2" />
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // };
    // const gridItem = (product) => {
    //     return (
    //         <div dir="rtl" className="col-12 sm:col-6 lg:col-4 p-2" key={product.id}>
    //             <div className="p-2 sm:p-3 md:p-4 border-1 surface-border surface-card border-round shadow-2 w-full">
    //                 {/* כרטיס לתמונה עם יחס גובה-רוחב טבעי */}
    //                 <div 
    //                     className="w-full flex justify-content-center align-items-center bg-white overflow-hidden"
    //                     onClick={() => navigate(`/Item`, { state: { product } })}
    //                     style={{ cursor: "pointer", height: "200px" }} // גובה קבוע
    //                 >
    //                     <img 
    //                         className="max-w-full max-h-full object-contain" 
    //                         src={`${product.image_url}`} 
    //                         alt={product.name} 
    //                     />
    //                 </div>
    
    //                 {/* תוכן – קטגוריה, שם, תגית */}
    //                 <div className="mt-3 flex flex-column align-items-center text-center">
    //                     <span className="text-sm text-500">{product.category}</span>
    //                     <div className="text-xl font-bold text-900">{product.name}</div>
    //                     <Tag value={product.inventoryStatus} severity={getSeverity(product)} className="mt-2" />
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // };
    
    // const gridItem = (product) => {
    //     return (
    //         <div dir="rtl" className="col-12 sm:col-6 lg:col-4 p-2" key={product.id}>
    //             <div className="p-2 sm:p-3 md:p-4 border-1 surface-border surface-card border-round shadow-2 w-full">
    //                 {/* כרטיס לתמונה עם יחס גובה-רוחב אחיד */}
    //                 <div 
    //                     className="w-full flex justify-content-center align-items-center bg-white overflow-hidden border-round"
    //                     onClick={() => navigate(`/Item`, { state: { product } })}
    //                     style={{ cursor: "pointer", height: "200px" }} // גובה קבוע
    //                 >
    //                     <img 
    //                         className="object-cover w-full h-full" 
    //                         src={`${product.image_url}`} 
    //                         alt={product.name} 
    //                         style={{ objectFit: 'cover', width: '100%', height: '100%' }}
    //                     />
    //                 </div>
    
    //                 {/* תוכן – קטגוריה, שם, תגית */}
    //                 <div className="mt-3 flex flex-column align-items-center text-center">
    //                     <span className="text-sm text-500">{product.category}</span>
    //                     <div className="text-xl font-bold text-900">{product.name}</div>
    //                     <Tag value={product.inventoryStatus} severity={getSeverity(product)} className="mt-2" />
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // };
    // const gridItem = (product) => {
    //     return (
    //         <div dir="rtl" className="col-12 sm:col-6 lg:col-4 p-2" key={product.id}>
    //             <div className="p-2 sm:p-3 md:p-4 border-1 surface-border surface-card border-round shadow-2 w-full">
    //                 {/* כרטיס לתמונה בגודל שונה – יותר ארוך ופחות רחב */}
    //                 <div 
    //                     className="w-full flex justify-content-center align-items-center bg-white overflow-hidden border-round"
    //                     onClick={() => navigate(`/Item`, { state: { product } })}
    //                     style={{ cursor: "pointer", height: "300px" }} // גובה יותר ארוך
    //                 >
    //                     <img 
    //                         className="object-cover w-full h-full" 
    //                         src={`${product.image_url}`} 
    //                         alt={product.name} 
    //                         style={{ objectFit: 'cover', width: '100%', height: '100%' }}
    //                     />
    //                 </div>
    
    //                 {/* תוכן – קטגוריה, שם, תגית */}
    //                 <div className="mt-3 flex flex-column align-items-center text-center">
    //                     <span className="text-sm text-500">{product.category}</span>
    //                     <div className="text-xl font-bold text-900">{product.name}</div>
    //                     <Tag value={product.inventoryStatus} severity={getSeverity(product)} className="mt-2" />
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // };
    const gridItem = (product) => {
        return (
            <div dir="rtl" className="col-12 sm:col-6 lg:col-4 p-2" key={product.id}>
                <div className="p-2 sm:p-3 md:p-4 border-1 surface-border surface-card border-round shadow-2 w-full">
                    
                    {/* כרטיס לתמונה בגודל מותאם */}
                    <div 
                        className="w-full flex justify-content-center align-items-center bg-white overflow-hidden border-round"
                        onClick={() => navigate(`/Item`, { state: { product } })}
                        style={{ cursor: "pointer", height: "250px" }} // הגבלת גובה לתמונה
                    >
                        <img 
                            className="object-cover w-full h-full" 
                            src={`${product.image_url}`} 
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
        <div className="card">
            <DataView value={products} listTemplate={listTemplate} layout={layout} header={header()} />
            {visible&&<Item  setVisible={setVisible} visible={visible}  />}
        </div>
    )
}
        