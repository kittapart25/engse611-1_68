// Contact form validation
function validateContact(req, res, next) {
    const { name, email, subject, message, phone, company } = req.body;
    const errors = [];

  // TODO: ตรวจสอบ name
  // - ต้องมีค่า
  // - ต้องเป็น string
  if (!name || typeof name !== "string") {
    errors.push("Name is required and must be a string");
  } else {
    const trimmedName = name.trim();
    // - ความยาวอย่างน้อย 2 ตัวอักษร
    if (trimmedName.length < 2) {
      errors.push("Name must be at least 2 characters long");
    }

    // - ไม่เกิน 100 ตัวอักษร
    if (trimmedName.length > 100) {
      errors.push("Name must not exceed 100 characters");
    }
    req.body.name = trimmedName;
  }

  // TODO: ตรวจสอบ email
  // - ต้องมีค่า
  // - ต้องเป็น email format ที่ถูกต้อง
  // - ใช้ regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.push("Email is required");
  } else if (!emailRegex.test(email)) {
    errors.push("Email format is invalid");
  } else {
    req.body.email = email.trim().toLowerCase();
  }


// TODO: ตรวจสอบ subject
// - ต้องมีค่า
  if (!subject) {
    errors.push("Subject is required");
  } else {
    const trimmedSubject = subject.trim();
  // - ความยาวอย่างน้อย 5 ตัวอักษร
    if (trimmedSubject.length < 5) {
      errors.push("Subject must be at least 5 characters long");
    }

  // - ไม่เกิน 200 ตัวอักษร
    if (trimmedSubject.length > 200) {
      errors.push("Subject must not exceed 200 characters");
    }
    req.body.subject = trimmedSubject;
}

// TODO: ตรวจสอบ message
// - ต้องมีค่า
  if (!message) {
    errors.push("Message is required");
  } else {
    const trimmedMessage = message.trim();

  // - ความยาวอย่างน้อย 10 ตัวอักษร
    if (trimmedMessage.length < 10) {
      errors.push("Message must be at least 10 characters long");
    }

  // - ไม่เกิน 1000 ตัวอักษร
    if (trimmedMessage.length > 1000) {
      errors.push("Message must not exceed 1000 characters");
    }
    req.body.message = trimmedMessage;
}

// TODO: ตรวจสอบ phone (optional)
// - ถ้ามีค่า ต้องเป็นเบอร์โทรที่ถูกต้อง
// - ใช้ regex: /^[0-9]{9,10}$/
  if (phone) {
    const cleanPhone = phone.replace(/\D/g, "");
    const phoneRegex = /^[0-9]{9,10}$/;
    if (!phoneRegex.test(cleanPhone)) {
      errors.push("Phone number is invalid");
    } else {
      req.body.phone = cleanPhone;
    }
  }

// TODO: ตรวจสอบ company (optional)
// - ถ้ามีค่า ต้องไม่เกิน 100 ตัวอักษร
  if (company) {
    if (typeof company !== "string" || company.trim().length > 100) {
      errors.push("Company must be a string and not exceed 100 characters");
    } else {
      req.body.company = company.trim();
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors,
    });
  }

  next();
}

    // Feedback validation
function validateFeedback(req, res, next) {
  const { rating, comment, email } = req.body;
  const errors = [];

    // Rating
  if (rating === undefined || rating === null) {
    errors.push("Rating is required");
  } else {
    const numRating = Number(rating);
    if (!Number.isInteger(numRating) || numRating < 1 || numRating > 5) {
      errors.push("Rating must be an integer between 1 and 5");
    }
  }

    // Comment
  if (!comment) {
    errors.push("Comment is required");
  } else {
    const trimmedComment = comment.trim();
    if (trimmedComment.length < 5) {
      errors.push("Comment must be at least 5 characters long");
    }
    if (trimmedComment.length > 500) {
      errors.push("Comment must not exceed 500 characters");
    }
    req.body.comment = trimmedComment;
  }

    // Email (optional)
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Email format is invalid");
    } else {
      req.body.email = email.trim().toLowerCase();
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors,
    });
  }

  next();
}

module.exports = {
  validateContact,
  validateFeedback,
};
