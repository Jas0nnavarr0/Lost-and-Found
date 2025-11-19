import './App.css'
import Posts from './components/posts/Posts'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/home/Login'
import Navbar from './components/shared/Navbar'

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={ <Login />}/>
        <Route path='/posts' element={ <Posts />}/>
      </Routes>
    </Router>
    // <>
    //   <Posts />
    // </>
  )
}

export default App
