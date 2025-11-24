import './App.css'
import Posts from './components/posts/Posts'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Login from './components/authentication/Login'
import Navbar from './components/shared/Navbar'
import PrivateRoute from './components/shared/PrivateRoute'
import Register from './components/authentication/Register'
import { Toaster } from 'react-hot-toast'
import HomeProfile from './pages/HomeProfile'
import ModeratorRoute from './components/shared/ModeratorRoute'
import AdminRoute from './components/shared/AdminRoute'
import ModeratorPage from './pages/ModeratorPage'
import AdminPage from './pages/AdminPage'

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route element={<PrivateRoute isPublic />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<HomeProfile />} />
          <Route path="/moderator" element={<ModeratorRoute><ModeratorPage /></ModeratorRoute>} />
          <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />

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
