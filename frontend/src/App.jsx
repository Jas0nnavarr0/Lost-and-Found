import './App.css'
import Posts from './components/posts/Posts'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Login from './components/authentication/Login'
import Navbar from './components/shared/Navbar'
import PrivateRoute from './components/shared/PrivateRoute'
import Register from './components/authentication/Register'
import { Toaster } from 'react-hot-toast'

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        {/* Public routes */}
        <Route element={<PrivateRoute isPublic />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/posts" element={<Posts />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
      <Toaster position="top-center" reverseOrder={false} />
    </Router>
  );
}

export default App;
