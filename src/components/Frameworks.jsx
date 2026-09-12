import { OrbitingCircles } from "./OrbitingCircles";

export function Frameworks() {
  const skills = [
    "Docker",
    "react",
    "Java",
    "MySQL",
    "Next.js",
    "Python",
    "Node.js",
    "Streamlit",
    "C++ (CPlusPlus)",
    "git",
    "html5",
    "Flask",
    "Pandas",
    "NumPy",
    "tailwindcss",
    "vitejs",
    "MongoDB",
    "Vercel",
    "Jupyter",
    "javascript",
    "AWS",
    "Express",
    "github",
    "TypeScript",
  ];
  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={40}>
        {skills.map((skill, index) => (
          <Icon key={index} src={`/assets/logos/${skill}.svg`} alt={skill} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={25} radius={100} reverse speed={2}>
        {[...skills].reverse().map((skill, index) => (
          <Icon key={index} src={`/assets/logos/${skill}.svg`} alt={skill} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

const Icon = ({ src, alt }) => (
  <img src={src} alt={alt || "tech logo"} className="duration-200 rounded-sm hover:scale-110 object-contain w-full h-full" />
);
