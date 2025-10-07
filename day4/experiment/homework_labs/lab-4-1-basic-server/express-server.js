const express = require('express');
const app = express();
const PORT = 3001;

// TODO: สร้างข้อมูลจำลอง students array เดียวกับใน http-server.js
const students = [
    { id: 1, name: 'ซง จินอา', major: 'วิทยาการคอมพิวเตอร์' },
    { id: 2, name: 'ลี จูฮี', major: 'วิศวกรรมอิเล็กทรอนิกส์' },
    { id: 3, name: 'ชา แฮอิน', major: 'วิทยาการคอมพิวเตอร์' },
    { id: 4, name: 'ปาร์ค ฮีชิน', major: 'บริหาร' },
    { id: 5, name: 'ฮัน ซง-อี', major: 'วิศวกรรมไฟฟ้า' }
];

// Middleware
app.use(express.json());

// TODO: Route GET / 
// ส่งข้อความต้อนรับและรายการ endpoints
app.get('/', (req, res) => {
    res.send({
        message: '👋 Welcome to the Student API!',
        endpoints: [
            'GET /students',
            'GET /students/:id',
            'GET /students/major/:major',
            'GET /stats'
        ]
    });
});

// TODO: Route GET /students
// ส่งรายการนักศึกษาทั้งหมด
app.get('/students', (req, res) => {
    res.json(students);
});

// TODO: Route GET /students/:id
// ส่งข้อมูลนักศึกษาตาม ID
app.get('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);
    if (student) {
        res.json(student);
    }
});

// TODO: Route GET /students/major/:major  
// กรองนักศึกษาตามสาขา
app.get('/students/major/:major', (req, res) => {
    const major = req.params.major.toLowerCase();
    const filtered = students.filter(s => s.major.toLowerCase() === major);
    res.json(filtered);
});

// TODO: Route GET /stats
// ส่งสถิติ เช่น จำนวนนักศึกษาทั้งหมด, จำนวนแต่ละสาขา
app.get('/stats', (req, res) => {
    const total = students.length;
    const byMajor = {};

    students.forEach(student => {
        const major = student.major;
        byMajor[major] = (byMajor[major] || 0) + 1;
    });

    res.json({
        totalStudents: total,
        studentsByMajor: byMajor
    });
});

// TODO: Middleware จัดการ 404
// ส่งข้อความ error ที่เหมาะสม
app.use((req, res) => {
    res.status(404).json({ error: 'ไม่พบข้อมูลที่ค้นหา' });
});

app.listen(PORT, () => {
    console.log(`🚀 Express Server running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  GET /');
    console.log('  GET /students'); 
    console.log('  GET /students/:id');
    console.log('  GET /students/major/:major');
    console.log('  GET /stats');
});
