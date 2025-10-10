import React from "react";
import PropTypes from "prop-types";

function ProductCard({ product, onAddToCart, onViewDetails }) {
    // ฟังก์ชันสร้างดาวตามค่า rating
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <>
                {"★".repeat(fullStars)}
                {hasHalfStar && "⯨"} {/* ใช้ ⯨ หรือคุณจะแทนด้วย ☆ */}
                {"☆".repeat(emptyStars)}
            </>
        );
    };

    return (
        <div className="product-card">
            <div className="product-image">
                <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                        e.target.src =
                            "https://via.placeholder.com/300x300/cccccc/666666?text=No+Image";
                    }}
                />
            </div>

            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>

                {/* ✅ แสดงดาว + rating */}
                <div className="product-rating">
                    {renderStars(product.rating)} <span>({product.rating})</span>
                </div>

                {/* ✅ ราคาพร้อมส่วนลด */}
                <div className="product-price">
                    {product.discount > 0 ? (
                        <>
                            <span
                                style={{
                                    textDecoration: "line-through",
                                    color: "#888",
                                    marginRight: "8px",
                                }}
                            >
                                ฿{product.originalPrice.toLocaleString()}
                            </span>
                            <span style={{ color: "red", fontWeight: "bold" }}>
                                ฿{product.price.toLocaleString()} (-{product.discount}%)
                            </span>
                        </>
                    ) : (
                        <>฿{product.price.toLocaleString()}</>
                    )}
                </div>

                <div className="product-actions">
                    <button
                        className="btn btn-secondary"
                        onClick={() => onViewDetails(product)}
                    >
                        ดูรายละเอียด
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => onAddToCart(product)}
                        disabled={!product.inStock}
                    >
                        {product.inStock ? "ใส่ตะกร้า" : "สินค้าหมด"}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ✅ PropTypes แบบละเอียด
ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        originalPrice: PropTypes.number,
        discount: PropTypes.number,
        image: PropTypes.string.isRequired,
        description: PropTypes.string,
        inStock: PropTypes.bool,
        rating: PropTypes.number,
    }).isRequired,
    onAddToCart: PropTypes.func.isRequired,
    onViewDetails: PropTypes.func.isRequired,
};

export default ProductCard;
