const express = require('express');
const cors = require('cors');
require('dotenv').config();

const restaurantRoutes = require('./routes/restaurants');
const reviewRoutes = require('./routes/reviews');
const { readJsonFile } = require('./utils/fileManager');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    message: '🍜 Restaurant Review API',
    version: '1.0.0',
    endpoints: {
      restaurants: '/api/restaurants',
      reviews: '/api/reviews',
      stats: '/api/stats'
    }
  });
});

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/reviews', reviewRoutes);

// ========================================
// TODO: GET /api/stats - ดึงสถิติทั้งหมด
// ========================================
// งานที่ต้องทำ:
// 1. อ่านข้อมูล restaurants.json และ reviews.json

app.get('/api/stats', async (req, res) => {
  try {
    const restaurants = await readJsonFile('restaurants.json');
    const reviews = await readJsonFile('reviews.json');
// 2. คำนวณ:
//    - totalRestaurants: จำนวนร้านทั้งหมด
   const totalRestaurants = restaurants.length;
//    - totalReviews: จำนวนรีวิวทั้งหมด
    const totalReviews = reviews.length;
//    - averageRating: คะแนนเฉลี่ยของร้านทั้งหมด (ปัดเศษ 1 ตำแหน่ง)
    const averageRating = totalRestaurants === 0 ? 0 : parseFloat((restaurants.reduce((sum, r) => sum + r.averageRating, 0) / totalRestaurants).toFixed(1));
//    - topRatedRestaurants: ร้าน 5 อันดับแรกที่มี rating สูงสุด
    const topRatedRestaurants = [...restaurants]
// 3. ส่งข้อมูลกลับในรูปแบบ: { success: true, data: {...} }
//
// คำใบ้:
// - ใช้ Array.reduce() เพื่อรวมคะแนน
// - ใช้ Array.sort() และ Array.slice(0, 5) เพื่อหา top 5
// - ระวัง: ร้านที่ยังไม่มีรีวิว (averageRating = 0) อาจมีปัญหาในการเรียง
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, 5)
      .map(r => ({
        id: r.id,
        name: r.name,
        averageRating: r.averageRating,
        category: r.category,
        priceRange: r.priceRange
      }));
    
  res.json({
    success: true,
    data: {
      totalRestaurants,
      totalReviews,
      averageRating,
      topRatedRestaurants
    }
  });

  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงสถิติ'
    });
  }
});

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV}`);
});