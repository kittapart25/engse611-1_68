const fs = require('fs');

// อ่านไฟล์
fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('เกิดข้อผิดพลาด:', err);
        return;
    }
    console.log('เนื้อหาไฟล์:', data);
});

// เขียนไฟล์
fs.writeFile('output.txt', 'สวัสดี Node.js!', (err) => {
    if (err) {
        console.error('เขียนไฟล์ไม่ได้:', err);
        return;
    }
    console.log('เขียนไฟล์สำเร็จ!');
});

// แบบ synchronous (blocking)
const data = fs.readFileSync('data.txt', 'utf8');
console.log(data);

const path = require('path');

console.log(__dirname);           // โฟลเดอร์ปัจจุบัน
console.log(__filename);          // ไฟล์ปัจจุบัน

const filePath = path.join(__dirname, 'data', 'users.json');
console.log(filePath);            // /project/data/users.json

const extname = path.extname('photo.jpg');
console.log(extname);             // .jpg


const os = require('os');

console.log('Platform:', os.platform());    // win32, darwin, linux
console.log('CPU Cores:', os.cpus().length); // จำนวน CPU cores
console.log('Free Memory:', os.freemem());   // RAM ว่าง
console.log('Home Directory:', os.homedir()); // โฟลเดอร์ home

const url = require('url');

const myUrl = new URL('https://example.com/users?page=1&limit=10');
console.log(myUrl.hostname);      // example.com
console.log(myUrl.pathname);      // /users
console.log(myUrl.searchParams.get('page')); // 1