const navLinks = [
  { name: "Home", link: "#home" },
  { name: "About", link: "#home" },
  { name: "Skills", link: "#home" },
  { name: "Experience", link: "#home" },  { name: "Contact", link: "#home" },
];

const darkColor = {
  navBg: "bg-linear-to-br from-neutral-900 to-neutral-950",
  textPrimary: "text-whitesmoke",
  textSecondary: "text-gray-300",
  textHover: "text-orange-400",
  textActive: "text-orange-400",
  indicator: "from-orange-500 to-amber-500",
  button: "from-orange-500 to-amber-500",
};
const lightColor = {
  navBg: "bg-linear-to-br from-orange-200 to white",
  textPrimary: "text-gray-900",
  textSecondary: "text-gray-800",
  textHover: "text-orange-500",
  textActive: "text-orange-600",
  indicator: "from-orange-500 to-amber-500",
  button: "from-orange-500 to-amber-500",
};
export const myProjects = [
  {
    id: 1,
    title: "Google Developer Groups on Campus ",
    description:
      "Developed official Website for Advitya Fest, 500+ attendees, featuring Parallax Scrolling and custom animations, achieving 1.1s load time.",
    subDescription: [
      "Built the official Advitya Fest website for GDG on Campus.",
      "Implemented parallax scrolling and custom animations.",
      "Designed a responsive and interactive user interface.",
      "Optimized performance with ~1.1s load time.",
    ],
    href: "https://gdgcvitbhopal.vercel.app/advitya",
    logo: "",
    image: "/Projects/GDGC.jpg",
    tags: [
      {
        id: 1,
        name: "React",
        path: "/assets/logos/react.svg",
      },
      {
        id: 2,
        name: "Vercel",
        path: "/assets/logos/Vercel.svg",
      },
      {
        id: 3,
        name: "JavaScript",
        path: "/assets/logos/js.svg",
      },
      {
        id: 4,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
    ],
  },
  {
    id: 2,
    title: "My Buxar",
    description:
      "Local services directory listing 150+ businesses across 25+ services, used by 200+ residents.",
    subDescription: [
      "Built the platform using React, Firebase, and Tailwind CSS.",
      "Implemented business listings with service-based categorization.",
      "Designed a responsive and user-friendly interface.",
      "Deployed and optimized the website for production use.",
    ],
    href: "https://mybuxar.in/",
    logo: "",
    image: "/Projects/MYBUXAR.jpg",
    tags: [
      {
        id: 1,
        name: "React",
        path: "/assets/logos/react.svg",
      },
      {
        id: 2,
        name: "Firebase",
        path: "/assets/logos/firebase.svg",
      },
      {
        id: 3,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
      {
        id: 4,
        name: "JavaScript",
        path: "/assets/logos/javascript.svg",
      },
    ],
  },
 {
  id: 3,
  title: "Verma Family Restaurant",
  description:
    "A responsive restaurant website designed to showcase the menu, services, and restaurant information.",
  subDescription: [
    "Built a responsive website using React and Tailwind CSS.",
    "Designed an interactive and user-friendly restaurant interface.",
    "Integrated Firebase for backend functionality.",
    "Deployed and optimized the website for production use.",
  ],
  href: "https://vermafamilyrestaurant.in/",
  logo: "",
  image: "/Projects/VERMAFAMILY.jpg",
  tags: [
    {
      id: 1,
      name: "React",
      path: "/assets/logos/react.svg",
    },
    {
      id: 2,
      name: "Firebase",
      path: "/assets/logos/firebase.svg",
    },
    {
      id: 3,
      name: "TailwindCSS",
      path: "/assets/logos/tailwindcss.svg",
    },
    {
      id: 4,
      name: "JavaScript",
      path: "/assets/logos/javascript.svg",
    },
  ],
},
{
  id: 3,
  title: "Matrix Multimedia Club Official Website",
  description:
    "Official website for Matrix Multimedia Club, showcasing the club, teams, activities, and projects.",
  subDescription: [
    "Led web development with a team of 15+ developers.",
    "Built the club's official website using React and Tailwind CSS.",
    "Developed a Linktree-style platform for club resources and social links.",
    "Improved social engagement click-throughs by 47%.",
  ],
  href: "https://matrix-multimedia-club.netlify.app/",
  logo: "",
  image: "/Projects/MATRIX.jpg",
  tags: [
    {
      id: 1,
      name: "React",
      path: "/assets/logos/react.svg",
    },
    {
      id: 2,
      name: "Firebase",
      path: "/assets/logos/firebase.svg",
    },
    {
      id: 3,
      name: "TailwindCSS",
      path: "/assets/logos/tailwindcss.svg",
    },
    {
      id: 4,
      name: "JavaScript",
      path: "/assets/logos/javascript.svg",
    },
  ],
},

];

export { navLinks, lightColor, darkColor };
