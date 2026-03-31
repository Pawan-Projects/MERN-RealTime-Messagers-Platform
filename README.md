# 💬 Real-Time Chat Application (MERN + Socket.io)

A full-stack real-time chat application built using the MERN stack and Socket.io. This app allows users to register, log in, and communicate instantly with other users through a clean and modern UI.

---

## 🚀 Features

* 🔐 Authentication (JWT-based login & register)
* 💬 Real-time messaging using Socket.io
* 👥 Dynamic user list
* ⚡ Instant message delivery (no refresh required)
* 🟢 Online user tracking
* 📱 Responsive chat UI
* 🔄 Auto-scroll and smooth UX
* 🧠 Feature-based architecture (scalable)

---

## 🏗️ Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* Socket.io

### Authentication

* JSON Web Tokens (JWT)

---

## 📁 Project Structure (Feature Based layerd Architecture is used in frontend and MVC is used in Backend)

```
/client
  /features
    /auth
    /chat
    /users
  /components
  /pages

/server
  /controllers
  /models
  /routes
  /middlewares
  /lib
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

---

### 2. Install dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd client
npm install
```

---

### 3. Environment Variables

Create a `.env` file in `/server`:

```
PORT=8000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
```

---

### 4. Run the app

#### Backend

```bash
npm run dev
```

#### Frontend

```bash
npm run dev
```

---

## 🔌 API Endpoints

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

### Users

* `GET /api/users/all`

### Messages

* `POST /api/message`

---

## 🔄 Real-Time Flow

1. User logs in → gets JWT token
2. Socket connects with userId
3. Send message → API saves in DB
4. Socket emits → receiver gets instantly

---

## 📸 Screenshots

> Add your app screenshots here

---

## 🧠 Future Improvements

* 📂 Chat history (pagination)
* 🟡 Typing indicator
* 🔔 Notifications
* 📎 File/image sharing
* 🟢 Online/offline status with last seen

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed by **Pawan Patidar**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
