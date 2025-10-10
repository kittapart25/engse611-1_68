import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import './ProductList.css';

function ProductList({ products, categories, onAddToCart, onViewDetails }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('');

    // ✅ กรอง + ค้นหา + เรียงลำดับ
    const filteredProducts = useMemo(() => {
        let result = selectedCategory === 'all' 
            ? products 
            : products.filter(p => p.category === selectedCategory);

        // 🔍 ค้นหา (ชื่อสินค้า + description)
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
            );
        }

        // ↕️ เรียงลำดับ
        if (sortBy === 'name') {
            result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'price') {
            result = [...result].sort((a, b) => a.price - b.price);
        } else if (sortBy === 'rating') {
            result = [...result].sort((a, b) => b.rating - a.rating);
        }

        return result;
    }, [products, selectedCategory, searchQuery, sortBy]);

    return (
        <div className="product-list-container">
            {/* Header */}
            <div className="header">
                <h1>🛍️ ร้านค้าออนไลน์</h1>
                <p>Lab 3.2 - การสร้าง Components และ Props</p>
            </div>

            {/* Filters */}
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <label htmlFor="category-select">หมวดหมู่: </label>
                <select 
                    id="category-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{ padding: '5px', marginRight: '10px' }}
                >
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                {/* 🔍 Search */}
                <input 
                    type="text"
                    placeholder="ค้นหาสินค้า..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ padding: '5px', marginRight: '10px' }}
                />

                {/* ↕️ Sort */}
                <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{ padding: '5px' }}
                >
                    <option value="">-- เรียงลำดับ --</option>
                    <option value="name">ชื่อสินค้า</option>
                    <option value="price">ราคา</option>
                    <option value="rating">Rating</option>
                </select>
            </div>

            {/* Products */}
            <div className="products-grid">
                {filteredProducts.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={onAddToCart}
                        onViewDetails={onViewDetails}
                    />
                ))}
            </div>
        </div>
    );
}

ProductList.propTypes = {
    products: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    onAddToCart: PropTypes.func.isRequired,
    onViewDetails: PropTypes.func.isRequired
};

export default ProductList;
