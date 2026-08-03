import { useState } from "react";
import { Menu, X } from "lucide-react";

const FullscreenNav = () => {
  const [open, setOpen] = useState(false);
  const links = ["Home", "About", "Projects", "Services", "Contact"];

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 z-50 w-full  flex items-center justify-end px-5 lg:px-10 py-6">

        <button onClick={() => setOpen(!open)} className="text-zinc-500 z-60">
          {open ? <X size={34} /> : <Menu size={34} />}
        </button>
      </nav>

      {/* Fullscreen Menu */}
      <div
        className={`fixed inset-0 z-40 bg-neutral-950 transition-transform duration-700 ease-in-out ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="text-6xl font-semibold text-white transition hover:text-neutral-400"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};
export default FullscreenNav;
