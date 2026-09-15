import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import AOS from 'aos'
import "aos/dist/aos.css"
import Hero from "./pages/Hero"
import AdminLogin from "./admin/AdminLogin"
import AdminDashboard from "./admin/AdminDashboard"
import ProtectedRoute from "./admin/ProtectedRoute"
import About from "./pages/About"
import Projects from "./pages/Projects"
import Sample from "./pages/Sample"

function AppContent() {
  const [darkMode, setDarkMode] = useState(true)
  useEffect(()=>{
    AOS.init({

      duration:1000,
      once:false,
      offset:100
    });
    document.documentElement.classList.add("dark");
  }, []);

  const toggleDarkMode=()=>{
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <Routes>
      {/* Admin Login Page */}
      <Route path="/admin" element={<AdminLogin darkMode={darkMode} />} />
      
      {/* Admin Dashboard */}
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute darkMode={darkMode}>
            <AdminDashboard darkMode={darkMode} />
          </ProtectedRoute>
        } 
      />

      {/* Main Portfolio */}
      <Route 
        path="/*" 
        element={
          <>
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <Hero />
            <About/>
            <Projects />
            <Sample />
            {/* <div className={`${darkMode ? 'text-white' : 'text-gray-900'} p-8`}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat nisi molestias neque fugit atque perspiciatis recusandae vel minima ea, magnam eaque provident dolor dolore in voluptatum debitis enim rerum impedit, tenetur obcaecati aut ducimus? Nisi, cumque. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi blanditiis, sit aspernatur quas quos sint, facilis atque libero ipsam rem, dolores dignissimos. Voluptatem exercitationem unde blanditiis consectetur laboriosam quas  dolorum aut suscipit incidunt consequuntur maxime molestiae quia perferendis tenetur excepturi perspiciatis eos dignissimos soluta doloremque, nam numquam nihil! Ea nihil natus sapiente sint iusto sunt aspernatur fuga eius quidem. Deserunt neque fugit velit commodi voluptate nesciunt, nisi quia in harum qui consectetur assumenda consequuntur amet ipsam eum corporis eligendi, dicta rem? Minus itaque delectus, repudiandae doloribus iure quisquam odio, expedita temporibus enim alias, vitae in quis voluptas fuga! Praesentium, perspiciatis!</div> */}
          </>
        } 
      />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App