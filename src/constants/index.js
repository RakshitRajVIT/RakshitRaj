const navLinks = [
    { name: 'Home', link: "#home" },
    { name: 'About', link: "#home" },
    { name: 'Skills' , link: "#home"},
    { name: 'Experience', link: "#home"},
    { name: 'Contact', link: "#home"},
];

const darkColor = {
    navBg: 'bg-linear-to-br from-neutral-900 to-neutral-950',
    textPrimary: 'text-whitesmoke',
    textSecondary:'text-gray-300',
    textHover:"text-orange-400",
    textActive:"text-orange-400",
    indicator:"from-orange-500 to-amber-500",
    button:"from-orange-500 to-amber-500"
};
const lightColor = {
    navBg: 'bg-linear-to-br from-orange-200 to white',
    textPrimary: 'text-gray-900',
    textSecondary:'text-gray-800',
    textHover:"text-orange-500",
    textActive:"text-orange-600",
    indicator:"from-orange-500 to-amber-500",
    button:"from-orange-500 to-amber-500"
};

export{
    navLinks,
    lightColor,
    darkColor
}
 