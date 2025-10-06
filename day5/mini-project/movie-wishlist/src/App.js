import React, { useState, useEffect } from 'react';

// ชื่อ Key สำหรับใช้ใน Local Storage
const LOCAL_STORAGE_KEY = 'movieWishlistApp.movies';

function App() {
  // State 1: เก็บรายชื่อหนังทั้งหมด เป็น Array ของ Object
  const [movies, setMovies] = useState([]);
  
  // State 2: เก็บค่าจากช่อง input สำหรับเพิ่มหนังใหม่
  const [inputValue, setInputValue] = useState('');

  // useEffect 1: โหลดข้อมูลจาก Local Storage ตอนเปิดแอปครั้งแรก
  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedMovies) {
      setMovies(storedMovies);
    }
  }, []); // Dependency array ว่างเปล่า `[]` หมายถึงให้ทำงานแค่ครั้งเดียวตอน mount

  // useEffect 2: บันทึกข้อมูลลง Local Storage ทุกครั้งที่ `movies` state เปลี่ยนแปลง
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(movies));
  }, [movies]); // Dependency array คือ `[movies]` หมายถึงให้ทำงานทุกครั้งที่ movies เปลี่ยน

  // Function: จัดการเมื่อกดปุ่ม Add
  const handleAddMovie = (e) => {
    e.preventDefault(); // ป้องกันไม่ให้ฟอร์ม submit แล้วหน้า refresh
    if (inputValue.trim() === '') return; // ถ้า input ว่างเปล่า ไม่ต้องทำอะไร

    const newMovie = {
      id: Date.now(), // ใช้ timestamp เป็น ID แบบง่ายๆ
      text: inputValue,
      watched: false,
    };

    setMovies(prevMovies => [newMovie, ...prevMovies]); // เพิ่มหนังใหม่เข้าไปบนสุดของ Array
    setInputValue(''); // เคลียร์ช่อง input
  };

  // Function: จัดการเมื่อกดปุ่มลบ
  const handleDeleteMovie = (id) => {
    setMovies(prevMovies => prevMovies.filter(movie => movie.id !== id));
  };
  
 // ==========================================================
  // === NEW: ส่วนที่เพิ่มสำหรับ Challenge 2.1
  // ==========================================================
  const handleToggleWatched = (id) => {
    setMovies(prevMovies =>
      prevMovies.map(movie => {
        // ถ้าเจอหนังที่ id ตรงกัน
        if (movie.id === id) {
          // ให้ return object ใหม่ โดยคัดลอกค่าเดิมมาทั้งหมด (...movie)
          // แล้วเปลี่ยนค่า watched ให้เป็นตรงกันข้าม
          return { ...movie, watched: !movie.watched };
        }
        // ถ้าไม่ใช่หนังที่ต้องการแก้ไข ก็ return ตัวเดิมกลับไป
        return movie;
      })
    );
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎬 Movie Wishlist</h1>
        <p>What do you want to watch next?</p>
      </header>

      <main>
        <form className="add-movie-form" onSubmit={handleAddMovie}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="e.g., The Matrix"
          />
          <button type="submit">Add</button>
        </form>

        <section className="movie-wishlist">
          <h2>My List</h2>
          {movies.length > 0 ? (
            <ul className="movie-list">
              {movies.map(movie => (
                // UPDATED: ส่วนที่แก้ไขสำหรับ Challenge 2.2
                <li
                  key={movie.id}
                  className={`movie-item ${movie.watched ? 'watched' : ''}`}
                >
                  <span onClick={() => handleToggleWatched(movie.id)}>
                    {movie.text}
                  </span>
                  <button onClick={() => handleDeleteMovie(movie.id)}>
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-list-message">Your wishlist is empty. Add a movie to get started!</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;