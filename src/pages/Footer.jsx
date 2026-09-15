import { mySocials } from "../constants";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center gap-4 pb-5 text-sm text-neutral-400 c-space">
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />

      <div className="flex gap-4">
        {mySocials.map((social, index) => (
          <a
            href={social.href}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={social.icon}
              className="w-5 h-5"
              alt={social.name}
            />
          </a>
        ))}
      </div>

      <p>© 2026 Rakshit. All rights reserved.</p>
    </footer>
  );
};

export default Footer;