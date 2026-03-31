// src/App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/login";
import Chat from "./pages/Chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;