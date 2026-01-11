import navLinks from "../constants"


const Navbar = () => {
  return (
    <nav className="flex items-center justify-between w-4/5 mx-auto p-2.5 border border-black rounded-4xl m-3 sticky top-2.5 z-50 bg-linear-to-br from-neutral-900 to-neutral-950">
      <h1 className="GreatVibes text-4xl bold pl-1.5">Rakshit Raj</h1>

      <ul className="flex gap-15 Frederika">
        {navLinks.map(({ label }) => (
          <li key={label}>
            <a href={label}>
              {label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex gap-3">
        <button className=" rounded p-1" >🌑</button>
        <button className="text-white poppins pr-1.5 rounded-4xl p-2  bg-linear-to-r from-orange-600 to-orange-700">Hire Me</button>
      </div>
    </nav>
  )
}

export default Navbar
