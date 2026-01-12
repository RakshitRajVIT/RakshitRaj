import { useState } from "react"
import { motion } from "framer-motion"
import { darkColor, lightColor } from "../constants"
import { X, Menu } from "lucide-react"

// import { a } from "framer-motion/client"

const navLinks = [
  { name: 'Home', link: "#home" },
  { name: 'About', link: "#about" },
  { name: 'Skills', link: "#skills" },
  { name: 'Experience', link: "#experience" },
  { name: 'Contact', link: "#contact" },
];

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const colors = darkMode ? darkColor : lightColor;
  const handleNavClick = (itemsName) => {
    setActiveSection(itemsName.toLowerCase());
    setIsMenuOpen(false);
  };

  return (
    <div className="flex justify-center w-full fixed top-0 z-50 mt-4">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`flex items-center justify-center ${colors.navBg} backdrop-blur-lg rounded-2xl px-4 lg:px-8 py-2 shadow-lg`}>
        <div className="flex items-center justify-between w-full space-x-6 lg:space-x-8">
          {/* logo */}
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2">
            <span className={`text-3xl font-bold ${darkMode ? colors.textPrimary : colors.textSecondary} GreatVibes`}>Rakshit Raj
            </span>
            
          </motion.a>
          {/* navigation menu */}
          <div className="hidden  lg:flex items-center space-x-6">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.link}
                onClick={() => handleNavClick(item.name)}
                className="relative"
              >
                <motion.span className={`font-medium transition-colors duration-300
                ${activeSection === item.name.toLowerCase() ? colors.textActive : `${colors.textSecondary} hover:text-orange-500`
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  {item.name}
                </motion.span>
                {activeSection === item.name.toLowerCase() && (
                  <motion.div
                    layoutId='navbar-indicator'
                    className={`absolute bottom-1 left-0 right-0 h-0.5 bg-linear-to-r rounded-full ${colors.indicator}`}
                  ></motion.div>
                )}
              </a>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            {/* dark mode toggle  */}
            {/* <motion.button
              whileHover={{ scale: 1.11 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} transition-colors`}
              aria-label={darkMode ? 'switch to light mode' : 'switch to dark mode'}
            >
              {darkMode ? (
                <Sun className='w-5 h-5 text-yellow-300' />
              ) : (<Moon className='w-5 h-5 text-gray-700' />)}
            </motion.button> */}
            {/* Resume */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`hidden lg:block px-6 py-2 font-semibold rounded-full bg-linear-to-r ${colors.button} text-white shadow-md hover:shadow-lg transform-shadow`}
            >Hire Me
            </motion.a>
          </div>

          {/* mobile menu */}
          <div className="flex lg:hidden items-center space-x-4 px-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
              {isMenuOpen ? (
                <X className={`w-5 h-5 ${darkMode ? "text-white" : "text-gray-700"}`} />
              ) : (
                <Menu className={`w-5 h-5 ${darkMode ? "text-white" : "text-gray-700"}`} />
              )
              }
            </motion.button>

          </div>

        </div>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`absolute top-full left-0 ring-0 mt-2 lg:hidden ${darkMode ? "bg-gray-900/95" : "bg-white/95"} backdrop-blur-lg rounded-xl shadow0-lg border ${darkMode?"bg-gray-700":"bg-gray-200"}`}>
              <div className="px-4 py-2 space-y-2">
                
                    {navLinks.map((item) => (
                    <a
                      key={item.name}
                      href={item.link}
                      onClick={() => handleNavClick(item.name)}
                      className="block"
                    >
                      <motion.div
                      whileHover={{x:5}}
                      className={`py-3 px-4 rounded-lg text-center
                        ${
                          activeSection===item.name.toLowerCase()?darkMode?"bg-gray-800":"bg-orange-50":' '
                        }`}
                      >
                        <span
                        className={`font-medium ${
                          activeSection===item.name.toLowerCase()?colors.textActive:colors.textSecondary}`}
                        >
                        {item.name}
                        </span>

                      </motion.div>
                    </a>))}
                    <motion.a
                    href="#contact"
                    onClick={()=> setIsMenuOpen(false)}
                    whileTap={{scale:0.95}}
                    className={`block px-4 py-3 text-center font-semibold rounded-lg bg-linear-to-r ${colors.button} text-white shadow-md   `}
                    >Hire me</motion.a>


              </div>

          </motion.div>
        )}

      </motion.nav>

    </div>
  )
}

export default Navbar
