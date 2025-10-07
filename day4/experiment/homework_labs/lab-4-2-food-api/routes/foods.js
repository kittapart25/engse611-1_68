const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const FOODS_FILE = path.join(__dirname, '../data/foods.json');

// Helper function: อ่านข้อมูลอาหาร
const loadFoods = () => {
    try {
        const data = fs.readFileSync(FOODS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading foods:', error);
        return [];
    }
};

// GET /api/foods - ดึงรายการอาหารทั้งหมด (พร้อม filtering)
router.get('/', (req, res) => {
    try {
        let foods = loadFoods();

        const { search, category, maxSpicy, vegetarian, available, maxPrice } = req.query;
        
        // TODO: ทำ filtering logic ตาม query parameters
        // TODO: เพิ่ม query parameters สำหรับ filtering:
        // - search: ค้นหาจากชื่อหรือคำอธิบาย
        if (search) {
            foods = foods.filter(food => 
                food.name.toLowerCase().includes(search.toLowerCase()) || 
                food.description.toLowerCase().includes(search.toLowerCase())
            );
        }

        // - category: กรองตามประเภทอาหาร
                if (category) {
            foods = foods.filter(food => food.category.toLowerCase() === category.toLowerCase());
        }
        // - maxSpicy: กรองระดับความเผ็ดไม่เกินที่กำหนด
                if (maxSpicy) {
            foods = foods.filter(food => food.spicy <= parseInt(maxSpicy));
        }
        // - vegetarian: กรองอาหารมังสวิรัติ (true/false)
         if (vegetarian !== undefined) {
            foods = foods.filter(food => food.vegetarian === (vegetarian === 'true'));
        }
        // - available: กรองอาหารที่พร้อมเสิร์ฟ (true/false)
         if (available !== undefined) {
            foods = foods.filter(food => food.available === (available === 'true'));
        }
        // - maxPrice: กรองราคาไม่เกินที่กำหนด
          if (maxPrice) {
            foods = foods.filter(food => food.price <= parseFloat(maxPrice));
        }
        

        
        res.json({
            success: true,
            data: foods,
            total: foods.length,
            filters: {
                search: search || null,
                category: category || null,
                maxSpicy: maxSpicy || null,
                vegetarian: vegetarian || null,
                available: available || null,
                maxPrice: maxPrice || null
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching foods'
        });
    }
});

// TODO: GET /api/foods/:id - ดึงข้อมูลอาหารตาม ID
router.get('/:id', (req, res) => {
    try {
        const foods = loadFoods();
        const foodId = parseInt(req.params.id, 10);
        const food = foods.find(f => f.id === foodId);
        
        if (!food) {
            return res.status(404).json({
                success: false,
                message: 'Food not found'
            });
        }

        res.json({
            success: true,
            data: food
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching food by ID'
        });
    }
});

// TODO: GET /api/foods/category/:category - ดึงอาหารตามประเภท
router.get('/category/:category', (req, res) => {
    try {
        const foods = loadFoods();
        const filteredFoods = foods.filter(food => food.category.toLowerCase() === req.params.category.toLowerCase());
        
        res.json({
            success: true,
            data: filteredFoods,
            total: filteredFoods.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching foods by category'
        });
    }
});

// TODO: GET /api/foods/random - ดึงอาหารแบบสุ่ม 1 จาน
router.get('/random', (req, res) => {
    try {
        const foods = loadFoods();
        const randomFood = foods[Math.floor(Math.random() * foods.length)];
        
        res.json({
            success: true,
            data: randomFood
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching random food'
        });
    }
});

module.exports = router;