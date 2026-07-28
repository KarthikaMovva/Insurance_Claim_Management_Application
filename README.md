# Insurance Claim Management Platform

A full-stack web application that enables **patients** to submit insurance claims online and allows **insurers** to review, approve, or reject those claims through a secure role-based dashboard.

---

## Project Overview

The Insurance Claim Management Platform simplifies the insurance claim process by providing separate interfaces for patients and insurers.

* Patients can securely submit insurance claims with supporting documents and track the status of their submissions.
* Insurers can review submitted claims, filter them based on different criteria, and approve or reject them with comments.

This project was developed using the MERN stack as part of a 3-day full-stack assignment.

---

## Features

### Patient Portal

* User Registration and Login
* JWT Authentication
* Submit New Insurance Claims
* Upload Supporting Documents
* View Submitted Claims
* Track Claim Status
* View Submission Date
* View Approved Amount (after approval)
* Logout

---

### Insurer Portal

* Secure Login
* View All Submitted Claims
* Filter Claims by:

  * Status
  * Date
  * Claim Amount
* Review Individual Claims
* View Uploaded Documents
* Approve Claims
* Reject Claims
* Enter Approved Amount
* Add Insurer Comments
* Logout

---

### Authentication

* JWT-based Authentication
* Password Hashing using bcrypt
* Role-Based Authorization

  * Patient
  * Insurer
* Protected Routes

---

## Tech Stack

### Frontend

* React.js
* Vite
* React Router DOM
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Multer
* dotenv

---

## Project Structure

```
Insurance_Claim_Management/

├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── components/
│   │   └── context/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── config/
│   │   └── server.js
│
├── uploads/
└── README.md
```

## API Endpoints

### Authentication

| Method | Endpoint             | Description   |
| ------ | -------------------- | ------------- |
| POST   | `/api/auth/register` | Register User |
| POST   | `/api/auth/login`    | Login User    |

---

### Patient APIs

| Method | Endpoint         | Description    |
| ------ | ---------------- | -------------- |
| POST   | `/api/claims`    | Submit Claim   |
| GET    | `/api/claims/my` | View My Claims |

---

### Insurer APIs

| Method | Endpoint          | Description            |
| ------ | ----------------- | ---------------------- |
| GET    | `/api/claims`     | View All Claims        |
| GET    | `/api/claims/:id` | View Claim Details     |
| PATCH  | `/api/claims/:id` | Approve / Reject Claim |

---

## Installation

### Clone Repository

```bash
git clone https://github.com/KarthikaMovva/Insurance_Claim_Management_Application.git

cd Insurance_Claim_Management
```

---

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

```
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## Application Workflow

### Patient

1. Register/Login
2. Submit Insurance Claim
3. Upload Supporting Document
4. Track Claim Status
5. View Approved Amount

---

### Insurer

1. Login
2. View Submitted Claims
3. Apply Filters
4. Review Claim Details
5. View Uploaded Document
6. Approve or Reject Claim
7. Add Approved Amount and Comments

---






