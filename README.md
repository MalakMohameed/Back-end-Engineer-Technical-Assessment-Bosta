Here is the corrected and polished README.md code. I have fixed the broken code blocks and formatting so it renders perfectly on GitHub.
📝 Final README.md
Copy and paste this exactly into your README.md file:

# 📚 Library Management System API
A professional RESTful API built with **Node.js**, **Express**, and **MySQL** (Sequelize) to manage library operations. This project was developed as a technical assessment for the **Back-end Engineer (Fresher)** role at **Bosta**.
## 🚀 Features & Implementation- **Inventory Management**: CRUD operations for books with optimized search by Title, Author, or ISBN.- **Borrower Management**: User registration and profile management.- **Borrowing Logic**: Real-time stock updates (Quantity -1 on checkout, +1 on return).
- **Security**: Basic Authentication (`admin`/`password123`) and Rate Limiting on critical endpoints.- **Performance**: Database indexing on frequently searched columns.- **Reports**: Analytical CSV exports for all borrowings and overdue tracking.- **Testing**: Automated Unit Testing for core models.
---## 📸 System ShowcaseBelow are the visual confirmations of the system functionality:


| Feature | Screenshot |
| :--- | :--- |
| **Auth** | ![Authorization Screen](./docs/screenshots/auth.png) |
| **Book Creation** | ![Book Creation Screen](./docs/screenshots/book_create.png) |
| **Borrower Creation** | ![Borrower Creation Screen](./docs/screenshots/borrower_create.png) |
| **Stock Logic** | ![Stock Update Screen](./docs/screenshots/stock_update.png) |
| **Borrowing** | ![Borrowing Screen](./docs/screenshots/borrowing.png) |
| **Unit Testing** | ![Unit Test Pass](./docs/screenshots/test_pass.png) |
---## 🛠️ Setup & Installation1. **Clone the repository**:

   git clone <your-repo-url>
   cd library-management-system


   1. Install Dependencies:
   
   npm install
   
   2. Database Setup:
   * Create a MySQL database named library_db.
      * Update config/db.js with your local MySQL credentials (user, password).
      * The tables will be auto-generated via Sequelize Sync upon first run.
   3. Run the Server:
   
   npm start
   
   4. Run Tests:
   
   npm test
   
   
------------------------------
🔑 API DocumentationAuthentication
All routes are protected by Basic Auth.

* User: admin
* Pass: password123

Primary Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/books/search?q=... | Search books by Title/Author/ISBN |
| POST | /api/books | Add a new book to the inventory |
| POST | /api/borrowings/checkout | Link a BookId to a BorrowerId |
| POST | /api/borrowings/return/:id | Return a book and update stock |
| GET | /api/borrowings/export/all | Export all transactions to CSV |

------------------------------
🏗️ Database Design
The system uses a normalized relational schema:

* Books: Stores details, stock quantity, and shelf location.
* Borrowers: Simple user profiles with unique email constraints.
* Borrowings: A junction table tracking checkoutDate, dueDate, returnDate, and status. Includes Foreign Key constraints.

🧪 Error Handling
Centralized middleware handles:

* 400 Bad Request: Validation errors (e.g., duplicate ISBN/Email).
* 401 Unauthorized: Missing or incorrect Basic Auth credentials.
* 429 Too Many Requests: Triggered by Rate Limiting on search/registration.
* 500 Internal Error: Graceful catch-all with sanitized error messages.


---

### ✅ Next Steps for You:
1. **Rename your images**: Ensure the files in your `docs/screenshots` folder are named exactly like this:
   - `auth.png`
   - `book_create.png`
   - `borrower_create.png`
   - `stock_update.png`
   - `borrowing.png`
   - `test_pass.png`
2. **Push everything to GitHub Desktop**: Make sure your `README.md` and the `docs` folder are checked.
3. **Double Check**: Visit your repo on GitHub.com to see if the images appear in the README table.

**Your documentation is now 100% professional and ready for review!** Good luck with your application at Bosta!


