// Global variables
let contactForm,
  feedbackForm,
  statusMessages,
  apiResults,
  ratingSlider,
  ratingValue;
let isSubmitting = false;

// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  contactForm = document.getElementById("contactForm");
  feedbackForm = document.getElementById("feedbackForm");
  statusMessages = document.getElementById("statusMessages");
  apiResults = document.getElementById("apiResults");
  ratingSlider = document.getElementById("rating");
  ratingValue = document.getElementById("ratingValue");

  initializeForms();
  setupEventListeners();

 const btnLoadContacts = document.getElementById("btnLoadContacts");
  if (btnLoadContacts) {
    btnLoadContacts.addEventListener("click", loadContacts);
  }

  const btnLoadFeedbackStats = document.getElementById("btnLoadFeedbackStats");
  if (btnLoadFeedbackStats) {
    btnLoadFeedbackStats.addEventListener("click", loadFeedbackStats);
  }

  const btnLoadAPIStatus = document.getElementById("btnLoadAPIStatus");
  if (btnLoadAPIStatus) {
    btnLoadAPIStatus.addEventListener("click", loadAPIStatus);
  }
    const btnLoadAPIDocs = document.getElementById("btnLoadAPIDocs");
  if (btnLoadAPIDocs) {
    btnLoadAPIDocs.addEventListener("click", loadAPIDocs);
  }
  
});


function initializeForms() {
  // Update rating display
  ratingSlider.addEventListener("input", () => {
    ratingValue.textContent = ratingSlider.value;
  });
    ratingValue.textContent = ratingSlider.value;

}

function setupEventListeners() {
  // Contact form submission
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    await submitContactForm();
  });

  // Feedback form submission
  feedbackForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    await submitFeedbackForm();
  });

  // TODO: เพิ่ม real-time validation สำหรับ input fields
  // ใช้ addEventListener กับ 'input' event
  [...contactForm.elements, ...feedbackForm.elements].forEach((input) => {
    if (
      input.tagName.toLowerCase() === "input" ||
      input.tagName.toLowerCase() === "textarea" ||
      input.tagName.toLowerCase() === "select"
    ) {
      input.addEventListener("input", () => {
        const { isValid, message } = validateField(input.name, input.value);
        if (!isValid) {
          input.setCustomValidity(message);
        } else {
          input.setCustomValidity("");
        }
        input.reportValidity();
      });
    }
  });
}

// TODO: สร้างฟังก์ชัน validateField สำหรับ client-side validation
function validateField(fieldName, value) {
  // ตรวจสอบ field แต่ละประเภท
  // return { isValid: boolean, message: string }
  switch (fieldName) {
    case "email":
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) return { isValid: false, message: "กรุณากรอกอีเมล" };
      if (!emailPattern.test(value))
        return { isValid: false, message: "รูปแบบอีเมลไม่ถูกต้อง" };
      return { isValid: true, message: "" };

    case "name":
      if (!value) return { isValid: false, message: "กรุณากรอกชื่อ" };
      if (value.length < 2)
        return { isValid: false, message: "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร" };
      return { isValid: true, message: "" };

    case "message":
      if (!value) return { isValid: false, message: "กรุณากรอกข้อความ" };
      if (value.length < 5)
        return { isValid: false, message: "ข้อความต้องมีอย่างน้อย 5 ตัวอักษร" };
      return { isValid: true, message: "" };

    case "rating":
      const rating = parseInt(value);
      if (isNaN(rating) || rating < 1 || rating > 5)
        return { isValid: false, message: "คะแนนต้องอยู่ระหว่าง 1 ถึง 5" };
      return { isValid: true, message: "" };

    default:
      return { isValid: true, message: "" };
  }
}

async function submitContactForm() {
  if (isSubmitting) return;

  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData.entries());

  try {
    isSubmitting = true;
    updateSubmitButton("contactSubmit", "กำลังส่ง...", true);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      showStatusMessage(
        "✅ ส่งข้อความสำเร็จ! เราจะติดต่อกลับโดยเร็ว",
        "success"
      );
      contactForm.reset();
    } else {
      showStatusMessage(`❌ เกิดข้อผิดพลาด: ${result.message}`, "error");
      if (result.errors) {
        displayValidationErrors(result.errors);
      }
    }
  } catch (error) {
    showStatusMessage("❌ เกิดข้อผิดพลาดในการเชื่อมต่อ", "error");
    console.error("Error:", error);
  } finally {
    isSubmitting = false;
    updateSubmitButton("contactSubmit", "ส่งข้อความ", false);
  }
}

async function submitFeedbackForm() {
  if (isSubmitting) return;

  const formData = new FormData(feedbackForm);
  const data = Object.fromEntries(formData.entries());
  data.rating = parseInt(data.rating);

  try {
    isSubmitting = true;
    updateSubmitButton("feedbackSubmit", "กำลังส่ง...", true);

    // TODO: ส่งข้อมูลไปยัง /api/feedback endpoint
    // ใช้ fetch API
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // TODO: จัดการ response และแสดงผลลัพธ์
    const result = await response.json();
    if (result.success) {
      showStatusMessage(
        "✅ ส่งความคิดเห็นสำเร็จ! ขอบคุณสำหรับคำติชม",
        "success"
      );
    
      ratingSlider.value = 3;
      feedbackForm.reset();
      ratingValue.textContent = "3"; // สมมติ default rating
    } else {
      showStatusMessage(`❌ เกิดข้อผิดพลาด: ${result.message}`, "error");
      if (result.errors) {
        displayValidationErrors(result.errors);
      }
    }
  } catch (error) {
    showStatusMessage("❌ เกิดข้อผิดพลาดในการเชื่อมต่อ", "error");
    console.error("Error:", error);
  } finally {
    isSubmitting = false;
    updateSubmitButton("feedbackSubmit", "ส่งความคิดเห็น", false);
  }
}

function showStatusMessage(message, type) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `status-message ${type}`;
  messageDiv.textContent = message;

  statusMessages.appendChild(messageDiv);

  // Auto remove after 5 seconds
  setTimeout(() => {
    messageDiv.remove();
  }, 5000);
}

function updateSubmitButton(buttonId, text, disabled) {
  const button = document.getElementById(buttonId);
  if (button) {
  button.textContent = text;
  button.disabled = disabled;
  button.classList.toggle("loading", disabled);
  }
}

function displayValidationErrors(errors) {
  errors.forEach((error) => {
    showStatusMessage(`🔸 ${error}`, "error");
  });
}

let isLoadingContacts = false;
// API Testing Functions
async function loadContacts() {
  if (isLoadingContacts) return; // ป้องกัน spam click
  isLoadingContacts = true;

  try {
    // TODO: เรียก GET /api/contact และแสดงผลลัพธ์
    apiResults.textContent = "Loading contacts...";
    const response = await fetch("/api/contact");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    apiResults.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    apiResults.textContent = "Error loading contacts: " + error.message;
  }finally {
    isLoadingContacts = false;
  }
}

async function loadFeedbackStats() {
  try {
    // TODO: เรียก GET /api/feedback/stats และแสดงผลลัพธ์
    apiResults.textContent = "Loading feedback stats...";
    const response = await fetch("/api/feedback/stats");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    apiResults.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    apiResults.textContent = "Error loading feedback stats: " + error.message;
  }
}

async function loadAPIStatus() {
  try {
    // TODO: เรียก GET /api/status และแสดงผลลัพธ์
    apiResults.textContent = "Loading API status...";
    const response = await fetch("/api/status");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    apiResults.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    apiResults.textContent = "Error loading API status: " + error.message;
  }
}

async function loadAPIDocs() {
  try {
    const response = await fetch("/api/docs");
    const data = await response.json();
    apiResults.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    apiResults.textContent = "Error loading API docs: " + error.message;
  }
}
