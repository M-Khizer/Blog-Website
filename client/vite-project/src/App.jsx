import './App.css'
import SignupPage from './Components/SignUp'
import Login from './Components/SignIn'
import { ToastContainer } from 'react-toastify';
import { Routes,Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import BlogForm from './Components/CreateBlogs';
import AllBlogs from './Components/AllBlogs';
function App() {

  return (
    <>
      <ToastContainer/>
     
      <Routes>
        <Route path="/" element={<Navbar />}>
          {/* Render AllBlogs separately */}
          <Route index element={<AllBlogs />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createblogs" element={<BlogForm />} />
        </Route>
    </Routes>
    </>
  )
}

export default App
