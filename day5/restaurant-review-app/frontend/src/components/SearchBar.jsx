import { useState, useEffect } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  // ========================================
  // อธิบาย: debounce effect
  // ========================================
  // เป้าหมาย: รอให้ผู้ใช้พิมพ์เสร็จก่อน ค่อยค่อย search (ประหยัด API calls)
  //
  // ทำไมต้องใช้ debounce?
  // - ถ้าผู้ใช้พิมพ์ "ส้มตำ" (5 ตัวอักษร)
  // - ไม่มี debounce จะเรียก API 5 ครั้ง: "ส", "ส้", "ส้ม", "ส้มต", "ส้มตำ"
  // - มี debounce จะเรียก API แค่ 1 ครั้ง หลังจากพิมพ์เสร็จ 500ms
  //
  // ขั้นตอน:
  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== undefined) {
        onSearch(searchTerm);
      }
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  // เรียกทันที เมื่อกดปุ่ม
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  // ล้างผลค้นหา
  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="ค้นหาร้านอาหาร..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button 
            type="button" 
            onClick={handleClear}
            className="clear-button"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      <button type="submit" className="search-button">
        🔍 ค้นหา
      </button>
    </form>
  );
}

export default SearchBar;