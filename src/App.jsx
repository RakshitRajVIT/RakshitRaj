import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import AOS from 'aos'
import "aos/dist/aos.css"
import Hero from "./components/Hero"

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
    {/* <div className={
      darkMode?"bg-linear-to-br from-gray-900 via-[#0d182e] to-gray-950 min-h-screen":"bg-linear-to-br from-gray-50  to-blue-50 min-h-screen"
    }></div> */}
    <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    <Hero />
    <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat nisi molestias neque fugit atque perspiciatis recusandae vel minima ea, magnam eaque provident dolor dolore in voluptatum debitis enim rerum impedit, tenetur obcaecati aut ducimus? Nisi, cumque. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi blanditiis, sit aspernatur quas quos sint, facilis atque libero ipsam rem, dolores dignissimos. Voluptatem exercitationem unde blanditiis consectetur laboriosam quas dolorum aut suscipit incidunt consequuntur maxime molestiae quia perferendis tenetur excepturi perspiciatis eos dignissimos soluta doloremque, nam numquam nihil! Ea nihil natus sapiente sint iusto sunt aspernatur fuga eius quidem. Deserunt neque fugit velit commodi voluptate nesciunt, nisi quia in harum qui consectetur assumenda consequuntur amet ipsam eum corporis eligendi, dicta rem? Minus itaque delectus, repudiandae doloribus iure quisquam odio, expedita temporibus enim alias, vitae in quis voluptas fuga! Praesentium, perspiciatis!</div>
      </>
  )
}

export default App