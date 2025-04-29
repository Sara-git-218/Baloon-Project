


import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { Slider } from 'primereact/slider';
import axios from 'axios';
import Item from './Item';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setval } from '../../Store/ItemsSlice';

export default function Items() {
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [visible, setVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [catgoryFromNav,setCatgoryFromNav]=useState()
    const location=useLocation()
    const [filters, setFilters] = useState({
        name: '',
        category: '',
        priceRange: [0, 5000],
        inStock: false,
    });
    const [sortOption, setSortOption] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        getAllItems();
    }, []);

    const getAllItems = async () => {
  
        const res = await axios.get('http://localhost:3600/api/readyDesign/getAllReadyDesign');
       let filters=[...res.data]
    //    alert(filters)
    //     if(location.state.label)
    //         {
    //            alert("showwwwwwwwwwwwwwwwwwwwwwwwww")
    //             filters = filters.filter(p => p.category ==='Big Design');
    //             console.log(location.state.label);

    //         } 
        setProducts(filters);
        setFilteredProducts(res.data);
        dispatch(setval(res.data));
        const uniqueCategories = [...new Set(res.data.map(item => item.category))];
        setCategories(uniqueCategories);
    };

    const resetFilters = () => {
        setFilters({
            name: '',
            category: '',
            priceRange: [0, 5000],
            inStock: false,
        });
        setFilteredProducts(products);
    };

    const applyFilters = () => {
        let filtered = [...products];

        if (filters.name) {
            filtered = filtered.filter(p => p.name.toLowerCase().includes(filters.name.toLowerCase()));
        }
        if (filters.category) {
            filtered = filtered.filter(p => p.category === filters.category);
        }
        if (filters.priceRange) {
            const [minPrice, maxPrice] = filters.priceRange;
            filtered = filtered.filter(p => {
                const price = parseFloat(p.price);
                return price >= Math.min(minPrice, maxPrice) && price <= Math.max(minPrice, maxPrice);
            });
        }
        if (filters.inStock) {
            filtered = filtered.filter(p => p.inventoryStatus === 'INSTOCK');
        }

        // Apply sorting based on selected option
        if (sortOption === 'priceAsc') {
            filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (sortOption === 'priceDesc') {
            filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        } else if (sortOption === 'nameAsc') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOption === 'nameDesc') {
            filtered.sort((a, b) => b.name.localeCompare(a.name));
        }

        setFilteredProducts(filtered);
    };

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

    // const listItem = (product, index) => {
    //     return (
    //         <div dir="rtl" className="col-12" key={product.id}>
    //             <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
    //                 <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
    //                     <div className="flex flex-column align-items-center sm:align-items-start gap-3">
    //                         <div className="text-2xl font-bold text-900">{product.name}</div>
    //                         <Rating value={product.rating} readOnly cancel={false}></Rating>
    //                         <div className="flex align-items-center gap-3">
    //                             <span className="flex align-items-center gap-2">
    //                                 <i className="pi pi-tag"></i>
    //                                 <span className="font-semibold">{product.category}</span>
    //                             </span>
    //                             <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // };

    const gridItem = (product) => {
        return (
            <div dir="rtl" className="col-12 sm:col-6 lg:col-4 p-2" key={product.id}>
                <div className="p-2 sm:p-3 md:p-4 border-1 surface-border surface-card border-round shadow-2 w-full">
                    <div
                        className="w-full flex justify-content-center align-items-center bg-white overflow-hidden border-round"
                        onClick={() => navigate(`/Item`, { state: { product } })}
                        style={{ cursor: "pointer", height: "250px" }}
                    >
                        <img
                            src={`http://localhost:3600${product.image_url}`}
                            alt={product.name}
                            style={{ objectFit: 'cover', width: '80%', height: '80%' }}
                        />
                    </div>

                    <div className="flex justify-content-start align-items-center mt-2">
                        <i className="pi pi-tag text-2xl mr-2"></i>
                        <span className="text-sm text-500">{product.category}</span>
                    </div>

                    <div className="mt-2 flex flex-column align-items-center text-center">
                        <div className="text-xl font-bold text-900">{product.name}</div>
                        <Tag value={product.inventoryStatus} severity={getSeverity(product)} className="mt-2" />
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) return;
        // if (layout === 'list') return listItem(product, index);
        // else if (layout === 'grid') 
        return gridItem(product);
    };

    const listTemplate = (products, layout) => {
        return <div className="grid grid-nogutter">{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
    };

    // const header = () => {
    //     return (
    //         <div className="flex justify-content-end">
    //             <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
    //         </div>
    //     );
    // };

    return (
        <div className="flex" style={{ minHeight: '100vh' }}>
            {/* סיידבר */}
            <div style={{ width: "250px", padding: "1rem", borderRight: "1px solid #ccc", background: "#f9f9f9" }}>
                <h3>סינון מוצרים</h3>

                <div className="p-field mb-3">
                    <label>שם מוצר</label>
                    <input
                        type="text"
                        className="p-inputtext p-component w-full"
                        value={filters.name}
                        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                    />
                </div>

                <div className="p-field mb-3">
                    <label>קטגוריה</label>
                    <select
                        className="p-inputtext p-component w-full"
                        value={filters.category}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    >
                        <option value="">הכל</option>
                        {categories.map((cat, idx) => (
                            <option key={idx} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="p-field mb-4">
                    <label>טווח מחירים</label>
                    <div className="flex flex-column gap-3">
                        <Slider
                            value={filters.priceRange}
                            onChange={(e) => setFilters({ ...filters, priceRange: e.value })}
                            range
                            min={0}
                            max={5000}
                            step={10}
                        />
                        <div className="flex justify-content-between mb-2">
                            <span>מקסימום: {Math.max(...filters.priceRange)} ₪</span>
                            <span>מינימום: {Math.min(...filters.priceRange)} ₪</span>
                        </div>
                    </div>
                </div>

                <div className="p-field-checkbox mb-3">
                    <input
                        type="checkbox"
                        checked={filters.inStock}
                        onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
                    />
                    <label style={{ marginRight: "8px" }}>רק במלאי</label>
                </div>


                <h3 className="mt-5">מיון מוצרים</h3>
                <div className="p-field mb-3">
                    <select
                        className="p-inputtext p-component w-full"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option value="">בחר מיון</option>
                        <option value="priceAsc">מחיר - מהנמוך לגבוה</option>
                        <option value="priceDesc">מחיר - מהגבוה לנמוך</option>
                        <option value="nameAsc">שם - א-ב</option>
                        <option value="nameDesc">שם - ב-א</option>
                    </select>
                </div>

                <Button label=" סנן ומיין " className="p-button-sm w-full mb-2" onClick={applyFilters} />
                <Button label="נקה הכל" className="p-button-secondary p-button-sm w-full" onClick={resetFilters} />
            </div>

            {/* אזור מוצרים */}
            <div style={{ flex: 1, padding: "1rem" }}>
                <DataView
                    value={filteredProducts}
                    listTemplate={listTemplate}
                    layout={layout}
                    // header={header()}
                />
                {visible && <Item setVisible={setVisible} visible={visible} />}
            </div>
        </div>
    );
}
