const express = require('express');
const app = express();
const PORT = 3000;

url =

// สร้าง Route สำหรับหน้าแรก
app.get('/', (req, res) => {
    res.send('<h1>🎉 สวัสดี Express.js!</h1>');
});

app.get('/about', (req, res) => {
    res.send('<h1>about servics!</h1>');
});

//'http://localhost/user/7';

app.get('/contact', (req, res) => {
    res.send('<h1>contact servics!</h1>');
});

//'http://localhost/user?page=9&limit=10';
app.get('/search', (req, res) => {
    const keyword = req.query.q;      // 'react'
    const page = req.query.page;    // '1'
    res.send(`ค้นหาด้วยคำว่า: ${keyword} ที่หน้า ${page}`);
});



// เริ่มต้นให้เซิร์ฟเวอร์ทำงาน
app.listen(PORT, () => {
    console.log(`🚀 Server is running...`);
});