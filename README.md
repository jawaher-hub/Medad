# Medad (مِداد) 

Medad is a platform designed to reduce food waste by connecting restaurants that have surplus food with verified charities that distribute food to beneficiaries in need.

---

## Team Members

| Name | Role |
|---|---|
| Zahraa | Server & database set up |
| Jawaher | API & Schema |
| Fatmah | Frontend-backend integrator |
| Sadeem | QA, Deployer & Documentation |

---

##  Demo Accounts

| Role | Email | Password |
|---|---|---|
| Admin | `admin@medad.com` | `123456` |
| Restaurant | `rest@medad.com` | `123456` |
| Charity | `charity@medad.com` | `123456` |

---

## 🖥 Frontend Setup

### Requirements
- Node.js v18+
- npm

### Steps

```bash
git clone https://github.com/jawaher-hub/Medad-Frontend.git
cd Medad-Frontend
npm install
npm start
```

The app will be available at `http://localhost:3000`

---

## ⚙ Backend Setup

### Requirements
- Node.js v18+
- npm
- MongoDB Atlas account

### Steps

```bash
cd server
npm install
node server.js
```

The server will run at `http://localhost:5000`

You should see:

```
Server is running on port 5000
Connected to MongoDB Atlas
```

---

##  Environment Variables

Create a `.env` file inside the `/server` folder:

```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string_here
```

> Never push your `.env` file to GitHub. It is already listed in `.gitignore`.

---

##  API Documentation

Base URL (local): `http://localhost:5000`

Base URL (production): `https://medad-backend.onrender.com`

---

###  Auth Routes

#### POST `/api/auth/register`

Request Body:

```json
{
  "name": "Test Restaurant",
  "email": "test@medad.com",
  "password": "123456",
  "role": "Restaurant"
}
```

Response 201 Created:

```json
{
  "_id": "69f51e796a163e36e1afefdf",
  "name": "Test Restaurant",
  "email": "test@medad.com",
  "role": "Restaurant",
  "isActive": true
}
```

---

#### POST `/api/auth/login`

Request Body:

```json
{
  "email": "test@medad.com",
  "password": "123456"
}
```

Response 200 OK:

```json
{
  "_id": "69f51e796a163e36e1afefdf",
  "name": "Test Restaurant",
  "email": "test@medad.com",
  "role": "Restaurant",
  "isActive": true
}
```

Response 401 Unauthorized:

```json
{
  "error": "Invalid credentials"
}
```

---

#### GET `/api/auth/users`

Response 200 OK:

```json
[
  {
    "_id": "69f51e796a163e36e1afefdf",
    "name": "Test Restaurant",
    "email": "test@medad.com",
    "role": "Restaurant",
    "isActive": true
  }
]
```

---

### Listing Routes

#### POST `/api/listings/add`

Request Body:

```json
{
  "restaurantId": "69f222861ed2f3c537b1ba9b",
  "foodName": "Rice and Chicken",
  "quantity": 10,
  "expiryTime": "2026-05-03T18:00:00Z",
  "description": "Leftover rice and chicken from today"
}
```

Response 201 Created:

```json
{
  "_id": "69f521a56a163e36e1afefe0",
  "foodName": "Rice and Chicken",
  "quantity": 10,
  "status": "Available"
}
```

---

#### GET `/api/listings`

Response 200 OK:

```json
[
  {
    "_id": "69f521a56a163e36e1afefe0",
    "foodName": "Rice and Chicken",
    "quantity": 10,
    "status": "Available"
  }
]
```

---

#### PUT `/api/listings/:id`

Request Body:

```json
{
  "quantity": 5,
  "status": "Available"
}
```

Response 200 OK:

```json
{
  "_id": "69f521a56a163e36e1afefe0",
  "foodName": "Rice and Chicken",
  "quantity": 5,
  "status": "Available"
}
```

---

#### DELETE `/api/listings/:id`

Response 200 OK:

```json
{
  "message": "Deleted"
}
```

---

###  Request Routes

#### POST `/api/requests`

Request Body:

```json
{
  "listingId": "69f521a56a163e36e1afefe0",
  "charityId": "69f222861ed2f3c537b1ba9b",
  "restaurantId": "69f222861ed2f3c537b1ba9b",
  "status": "Pending"
}
```

Response 201 Created:

```json
{
  "_id": "69f524df6a163e36e1afefe1",
  "listingId": "69f521a56a163e36e1afefe0",
  "charityId": "69f222861ed2f3c537b1ba9b",
  "status": "Pending"
}
```

---

### Feedback Routes

#### POST `/api/feedback/submit`

Request Body:

```json
{
  "requestId": "69f524df6a163e36e1afefe1",
  "rating": 5,
  "comment": "Great food, thank you!"
}
```

Response 201 Created:

```json
{
  "_id": "69f530006a163e36e1afefe2",
  "rating": 5,
  "comment": "Great food, thank you!"
}
```

Response 400 Bad Request (not delivered yet):

```json
{
  "error": "Cannot rate before delivery"
}
```

---

##  API Test Results (Postman)

| Route | Method | Status | Result |
|---|---|---|---|
| /api/auth/register | POST | 201 Created | ✅ PASS |
| /api/auth/login | POST | 200 OK | ✅ PASS |
| /api/auth/users | GET | 200 OK | ✅ PASS |
| /api/listings/add | POST | 201 Created | ✅ PASS |
| /api/listings | GET | 200 OK | ✅ PASS |
| /api/listings/:id | PUT | 200 OK | ✅ PASS |
| /api/listings/:id | DELETE | 200 OK | ✅ PASS |
| /api/requests | POST | 201 Created | ✅ PASS |
| /api/feedback/submit | POST | 400 (validation works) | ✅ PASS |

---

## Live URLs

| Service | URL |
|---|---|
| Frontend | https://medad-frontend-sand.vercel.app |
| Backend | https://medad-backend.onrender.com |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, React Router DOM, CSS3 |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Deployment | Vercel (Frontend), Render (Backend) |

---

## Folder Structure

```
Medad-Frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   └── App.js
├── server/
│   ├── models/
│   ├── routes/
│   └── server.js
├── .gitignore
├── package.json
└── README.md
```
