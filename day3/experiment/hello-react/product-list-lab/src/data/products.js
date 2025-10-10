// src/data/products.js
export const categories = [
    { id: 'all', name: 'ทั้งหมด' },
    { id: 'electronics', name: 'อิเล็กทรอนิกส์' },
    { id: 'clothing', name: 'เสื้อผ้า' },
    { id: 'books', name: 'หนังสือ' },
    { id: 'watch', name: 'นาฬิกา' },
    { id: 'camera', name: 'กล้อง' },
    { id: 'shoes', name: 'รองเท้า' },
    { id: 'keybord', name: 'คีย์บอร์ด' },
    { id: 'pet', name: 'สัตว์เลี้ยง' }
];

export const products = [
    {
        id: 1,
        name: 'iPhone 15 Pro',
        category: 'electronics',
        price: 45900,
        originalPrice: 49900,
        discount: 8,
        image: 'https://down-th.img.susercontent.com/file/th-11134207-7r992-lln7vbkccxe685.webp/300x300/007bff/ffffff?text=iPhone+15',
        description: 'สมาร์ทโฟนล่าสุดจาก Apple',
        inStock: true,
        rating: 4.8
    },
    {
        id: 2,
        name: 'เสื้อยืดผ้าฝ้าย',
        category: 'clothing',
        price: 299,
        originalPrice: 399,
        discount: 25,
        image: 'https://down-th.img.susercontent.com/file/th-11134207-7rasa-m6dh6zb01u0add.webp/300x300/ffc107/000000?text=T-Shirt',
        description: 'เสื้อยืดผ้าฝ้าย 100% นุ่มสบาย',
        inStock: true,
        rating: 4.2
    },
    {
        id: 3,
        name: 'หนังสือ React.js Guide',
        category: 'books',
        price: 650,
        originalPrice: 650,
        discount: 0,
        image: 'https://down-th.img.susercontent.com/file/sg-11134201-7rdx6-mc7ln46sn8w029.webp/300x300/17a2b8/ffffff?text=React+Book',
        description: 'คู่มือเรียนรู้ React.js ฉบับสมบูรณ์',
        inStock: false,
        rating: 4.7
    },
    // ✅ เพิ่มสินค้าใหม่
    {
        id: 4,
        name: 'นาฬิกา Tissot',
        category: 'ewatch',
        price: 32600,
        originalPrice: 35900,
        discount: 9,
        image: 'https://steffans.co.uk/cdn/shop/products/untitled-1.jpg?v=1659116651&width=800/300x300/17a2b8/ffffff?text=Watch',
        description: 'Tissot Seastar 1000 Powermatic',
        inStock: true,
        rating: 4.4
    },
    {
        id: 5,
        name: 'กล้อง FUJIFILM X-T50',
        category: 'camera',
        price: 52990,
        originalPrice: 55900,
        discount: 26,
        image: 'https://down-th.img.susercontent.com/file/th-11134207-7r98v-lxus012y0ecwf3.webp/300x300/17a2b8/ffffff?text=Camera',
        description: 'กกล้อง Mirrorless FUJIFILM X-T50',
        inStock: false,
        rating: 5.0
    },
    {
        id: 6,
        name: 'รองเท้าวิ่ง ASICS',
        category: 'shoesng',
        price: 4600,
        originalPrice: 5200,
        discount: 12,
        image: 'https://www.supersports.co.th/cdn/shop/files/AS206SH115EKTH-0.jpg?v=1744797904/300x300/17a2b8/ffffff?text=Shoes',
        description: 'ASICS : 1011B869.403 GEL-KAYANO 31 MEN',
        inStock: true,
        rating: 3.8
    },
    {
        id: 7,
        name: 'เกมมิ่งคีย์บอร์ด',
        category: 'keybord',
        price: 5050,
        originalPrice: 5490,
        discount: 20,
        image: 'https://down-th.img.susercontent.com/file/th-11134207-7rasd-m4io6xywg77u0e.webp/300x300/17a2b8/ffffff?text=keybord',
        description: 'ASUS M701 ROG Azoth',
        inStock: true,
        rating: 4.6
    },
    {
        id: 8,
        name: 'เบาะสัตว์เลี้ยง',
        category: 'pet',
        price: 450,
        originalPrice: 550,
        discount: 9,
        image: 'https://down-th.img.susercontent.com/file/th-11134207-7rase-m6s5cm1oql9r28.webp/300x300/17a2b8/ffffff?text=Shoes',
        description: 'เบาะสัตว์เลี้ยง2-in-1 ใช้ในรถได้ ใช้ได้2สี2ด้าน ที่นอนหมา เตียงหมา ที่นอนเเมว เตียงเเมว คอก',
        inStock: true,
        rating: 4.8
    },
];
