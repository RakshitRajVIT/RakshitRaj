import navLinks from "../constants"


const Navbar = () => {
    return (
        <nav className="flex items-center mx-auto border">
            <h1 className="text-5xl">Rakshit Raj</h1>
            <ul>
                {navLinks.map(({ label }) => (
                    <li key={label}>
                        <a href={label}>{label}</a>
                    </li>
                ))}
            </ul>
            <button id="toggleTheme">🌑</button>
            <button id="resume">Hire Me</button>
        </nav>
    )
}

export default Navbar
