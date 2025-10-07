const http = require("http");
const url = require("url");

const PORT = 3000;

// TODO: สร้างข้อมูลจำลอง students array
// ควรมี id, name, major, year อย่างน้อย 3 คน
const students = [
  { id: 1, name: "สมชาย ใจดี", major: "วิศวกรรม", year: 3 },
  { id: 2, name: "สุดา แสนดี", major: "วิทยาการคอมพิวเตอร์", year: 2 },
  { id: 3, name: "กิตติชัย ทองดี", major: "วิศวกรรม", year: 1 },
];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  // TODO: จัดการ route GET /
  // ส่งข้อความต้อนรับและรายการ endpoints ที่มี
  if (method === "GET" && pathname === "/") {
    // ✅ ส่งข้อความต้อนรับและรายการ endpoints ที่มี
    res.writeHead(200);
    res.end(
      JSON.stringify({
        message: "ยินดีต้อนรับเข้าสู่ Student API",
        endpoints: [
          "GET /students",
          "GET /students/:id",
          "GET /students/major/:major",
        ],
      })
    );
    return;
  }

  // TODO: จัดการ route GET /students
  // ส่งรายการนักศึกษาทั้งหมด
  if (method === "GET" && pathname === "/students") {
    // ✅ ส่งรายการนักศึกษาทั้งหมด
    res.writeHead(200);
    res.end(JSON.stringify(students));
    return;
  }

  // TODO: จัดการ route GET /students/:id
  // ส่งข้อมูลนักศึกษาตาม ID
  // ตัวอย่าง: /students/1
  const studentIdMatch = pathname.match(/^\/students\/(\d+)$/);
  if (method === "GET" && studentIdMatch) {
    const id = parseInt(studentIdMatch[1]);
    const student = students.find((s) => s.id === id);
    if (student) {
      // ✅ ส่งข้อมูลนักศึกษาตาม ID
      res.writeHead(200);
      res.end(JSON.stringify(student));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "ไม่พบนักศึกษาที่ระบุ" }));
    }
    return;
  }

  // TODO: จัดการ route GET /students/major/:major
  // กรองนักศึกษาตามสาขา
  // ตัวอย่าง: /students/major/วิศวกรรม
  const majorMatch = pathname.match(/^\/students\/major\/(.+)$/);
  if (method === "GET" && majorMatch) {
    const major = decodeURIComponent(majorMatch[1]);
    const filtered = students.filter((s) => s.major === major);
    // ✅ กรองนักศึกษาตามสาขา
    res.writeHead(200);
    res.end(JSON.stringify(filtered));
    return;
  }

  // TODO: จัดการกรณี 404 Not Found
  // ส่ง status 404 และข้อความที่เหมาะสม
  res.writeHead(404);
  res.end(
    JSON.stringify({
      error: "ไม่พบหน้าที่ร้องขอ",
    })
  );
});

server.listen(PORT, () => {
  console.log(`🌐 HTTP Server running on http://localhost:${PORT}`);
  console.log("Available endpoints:");
  console.log("  GET /");
  console.log("  GET /students");
  console.log("  GET /students/:id");
  console.log("  GET /students/major/:major");
});
