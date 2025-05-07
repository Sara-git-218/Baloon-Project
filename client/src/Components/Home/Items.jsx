


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
import './Items.css';
export default function Items() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [visible, setVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({
        name: '',
        category: '',
        priceRange: [0, 5000],
        inStock: false,
    });
    
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const categoryFromURL = params.get('category');

        if (categoryFromURL) {
            setFilters(prev => ({
                ...prev,
                category: categoryFromURL
            }));
        }
    }, [location.search]);

    useEffect(() => {
        getAllItems();
    }, []);

    const getAllItems = async () => {
        const res = await axios.get('http://localhost:3600/api/readyDesign/getAllReadyDesign');
        setProducts(res.data);
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
    useEffect(() => {
        applyFilters();
    }, [filters]);

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

    const gridItem = (product) => {
        return (
            <div className="custom-card" key={product.id}>
                <div className="item-card-inner" onClick={() => navigate(`/Item`, { state: { product } })}>
                    <img src={`http://localhost:3600${product.image_url}`} alt={product.name} className="item-image" />
                    <div className="item-details">
                        <div className="item-name">{product.name}</div>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) return;

        return gridItem(product);
    };



    const listTemplate = (products) => {
        return (

            <div className="custom-grid">
                {filteredProducts.map((product) => gridItem(product))}
            </div>

        );
    };


    return (
        <div className="items-page">
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

                    <Button label=" מיין" className="p-button-sm w-full mb-2" onClick={applyFilters} />
                    <Button label="נקה הכל" className="p-button-secondary p-button-sm w-full" onClick={resetFilters} />
                </div>


                <div style={{ flex: 1, padding: "1rem" }}>
                    {/* <DataView
                    value={filteredProducts}
                    listTemplate={listTemplate}
                    layout={layout}
                    // header={header()}
                /> */}
                    <DataView
                        value={filteredProducts}
                        layout="grid"
                        itemTemplate={gridItem}
                    />
                    {filteredProducts.length === 0 && (
                        <div className="no-results-message">
                            <p>לא נמצאו עיצובים מתאימים לקטגוריה זו.</p>
                            <p>ניתן ליצור קשר לעיצוב מותאם אישית 💬</p>
                            <Button
                                label="צור קשר"
                                icon="pi pi-envelope"
                                severity="help"
                                onClick={() => navigate('/Contact')}
                                style={{ marginTop: '1rem' }}
                            />
                        </div>
                    )}

                    {visible && <Item setVisible={setVisible} visible={visible} />}
                </div>
            </div>
        </div>

    );
}
