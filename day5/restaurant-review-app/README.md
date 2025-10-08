# Restaurant Review Website

## รายละเอียดโปรเจค

Restaurant Review App เป็นเว็บแอปสำหรับค้นหาและรีวิวร้านอาหารในรูปแบบทันสมัย ผู้ใช้สามารถดูข้อมูลร้านอาหารแต่ละแห่ง เช่น หมวดหมู่ ราคา คะแนนเฉลี่ย และรีวิวจากผู้ใช้คนอื่น ๆ พร้อมทั้งเพิ่มรีวิวใหม่ได้แบบเรียลไทม์ ระบบรองรับการกรองร้านตามหมวดหมู่ คะแนนขั้นต่ำ และช่วงราคา เพื่อช่วยให้ผู้ใช้เลือกกินร้านที่ตรงใจมากที่สุด

## เทคโนโลยีที่ใช้

- Frontend: React 18 + Vite (โค้ดอยู่ในโฟลเดอร์ frontend)
  - ใช้ React component เช่น RestaurantList, RestaurantDetail, ReviewForm, FilterPanel
  - มีระบบ routing และ state management ด้วย useState/useEffect
- Backend: Node.js + Express (โค้ดอยู่ในโฟลเดอร์ backend)
  - API สำหรับร้านอาหารและรีวิว เช่น /api/restaurants, /api/reviews, /api/stats
  - มี middleware validation สำหรับตรวจสอบข้อมูลรีวิว
- Database: JSON File Storage
  - ข้อมูลร้านอาหารและรีวิวเก็บในไฟล์ restaurants.json และ reviews.json

## Features ที่ทำได้

### Required Features (70 คะแนน)

- [x] แสดงรายการร้านอาหาร (RestaurantList.jsx, API /api/restaurants)
- [x] ค้นหาร้าน (SearchBar.jsx, API filtering)
- [x] กรองตามหมวด/rating/ราคา (FilterPanel.jsx, API filtering)
- [x] ดูรายละเอียดร้าน (RestaurantDetail.jsx, API /api/restaurants/:id)
- [x] เพิ่มรีวิว (ReviewForm.jsx, API /api/reviews)
- [x] Validation (middleware/validation.js ตรวจสอบข้อมูลรีวิว)
- [x] อัพเดท rating อัตโนมัติ (backend/routes/reviews.js อัพเดท averageRating และ totalReviews)

### Bonus Features (ถ้ามี)

- [x] Sort restaurants (สามารถเพิ่ม logic ใน RestaurantList.jsx หรือ backend ได้) เช่น: - ตัวอย่างใน RestaurantList.jsx (frontend):
      `js
		// เพิ่ม state sortBy และฟังก์ชัน handleSort
		const [sortBy, setSortBy] = useState('rating');
		const sortedRestaurants = [...restaurants].sort((a, b) => b.averageRating - a.averageRating);
		// ใช้ sortedRestaurants แทน restaurants ในการแสดงผล
		` - ตัวอย่างใน backend (routes/restaurants.js):
      `js
		if (req.query.sortBy === 'rating') {
			restaurants = restaurants.sort((a, b) => b.averageRating - a.averageRating);
		}
		`
- [x] Responsive design (รองรับการใช้งานบนมือถือและ desktop) 
ตัวอย่างใน App.jsx
      @media (max-width: 600px) {
      .app-main {
      padding: 0 0.5rem;
      }
      .restaurant-card img {
      height: 140px;
      }
      .review-form, .restaurant-detail {
      padding: 1rem;
      }
      }
- [x] Animations (สามารถเพิ่มใน frontend ได้)
ตัวอย่างใน App.css หรือ component:
    ```css
    /* Fade-in animation for restaurant cards */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .restaurant-card {
      animation: fadeIn 0.7s ease;
    }
    ```
    หรือใน React component:

    ```jsx

     <div className="restaurant-card" style={{ animation: 'fadeIn 0.7s ease' }}>
      {/* ... */}
    </div>
    ```

## วิธีติดตั้งและรัน

### Backend

1. เข้าโฟลเดอร์ backend
2. ติดตั้ง dependencies ด้วย `npm install`
3. สร้างไฟล์ .env จาก .env.example (ถ้ามี)
4. รันเซิร์ฟเวอร์ด้วย `npm run dev` (ใช้ nodemon)
5. API จะรันที่ http://localhost:3000

### Frontend

1. เข้าโฟลเดอร์ frontend
2. ติดตั้ง dependencies ด้วย `npm install`
3. รัน dev server ด้วย `npm run dev`
4. เปิดเว็บที่ http://localhost:5173

## API Endpoints

- GET `/api/restaurants` - ดึงรายการร้านทั้งหมด (รองรับ query string สำหรับค้นหา/กรอง)
- GET `/api/restaurants/:id` - ดึงข้อมูลร้านตาม ID พร้อมรีวิว
- POST `/api/reviews` - เพิ่มรีวิวใหม่ (ตรวจสอบข้อมูลด้วย validation)
- GET `/api/stats` - ดึงสถิติร้าน/รีวิว/คะแนนเฉลี่ย/top 5 ร้าน

## Screenshots
### หน้าแรก
![Home](screenshots/![alt text](home.png))

### รายละเอียดร้าน
![Detail](screenshots/![alt text](detail.png))

### ฟอร์มรีวิว
![Review](screenshots/![alt text](review.png))

## ผู้พัฒนา
- ชื่อ-นามสกุล : กฤตภาส จำปาวัน
- รหัสนักศึกษา : 68543210085-5
- Email : kittapart@live.rmutl.ac.th

## License
MIT License