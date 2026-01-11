import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import AOS from 'aos'
import "aos/dist/aos.css"

function App() {
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
    <>
    <div className={
      darkMode?"bg-linear-to-br from-gray-900 via-[#0d182e] to-gray-950 min-h-screen":"bg-linear-to-br from-gray-50  to-blue-50 min-h-screen"
    }></div>
    <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </>
  )
}

export default App