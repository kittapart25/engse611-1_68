const fs = require('fs').promises;
const path = require('path');

// กำหนด path สำหรับโฟลเดอร์ data
const DATA_DIR = path.join(__dirname, '../data');
const contactsFile = path.join(DATA_DIR, 'contacts.json');
const feedbackFile = path.join(DATA_DIR, 'feedback.json');

// ตรวจสอบว่าไฟล์และโฟลเดอร์มีอยู่หรือไม่
const ensureDataDir = async () => {
    try {
        await fs.access(DATA_DIR);
    } catch (error) {
        await fs.mkdir(DATA_DIR, { recursive: true });
    }
};

// อ่านข้อมูลจากไฟล์ JSON
const readJsonFile = async (filename) => {
    try {
        await ensureDataDir();
        const filePath = path.join(DATA_DIR, filename);
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // ถ้าไฟล์ไม่มีหรือเกิดข้อผิดพลาด, ให้ return array ว่าง []
        return [];
    }
};

async function readJSON(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data || '[]');
    } catch (err) {
        return [];
    }
}

// เขียนข้อมูลลงไฟล์ JSON
const writeJsonFile = async (filename, data) => {
    try {
        await ensureDataDir();
        const filePath = path.join(DATA_DIR, filename);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing file:', error);
        return false;
    }
};

async function writeJSON(filePath, data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// เพิ่มข้อมูลใหม่ลงไฟล์
const appendToJsonFile = async (filename, newData) => {
    try {
        const existingData = await readJsonFile(filename);

        // เพิ่ม ID และ timestamp ให้ข้อมูลใหม่
        const dataWithId = {
            id: Date.now(),
            ...newData,
            createdAt: new Date().toISOString()
        };

        existingData.push(dataWithId);
        await writeJsonFile(filename, existingData);
        return dataWithId;
    } catch (error) {
        console.error('Error appending to file:', error);
        return null;
    }
};

// สร้างฟังก์ชัน getFileStats สำหรับดึงข้อมูลจำนวนในแต่ละไฟล์
const getFileStats = async () => {
    await ensureDataDir();
    const files = await fs.readdir(DATA_DIR);

    const stats = {};
    for (const file of files) {
        if (path.extname(file) === '.json') {
            const data = await readJsonFile(file);
            stats[file] = data.length;
        }
    }

    return stats; 
};

// Export ฟังก์ชันต่างๆ
module.exports = {
    readJsonFile,
    writeJsonFile,
    appendToJsonFile,
    getFileStats,
    readJSON,
    writeJSON
};
