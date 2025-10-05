import React, { useState } from "react";
import { Container, LogoutBtn, Logo } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function DarkHeader() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
  ];

  const isPathActive = (slug) => window.location.pathname === slug;

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/50 border-b border-gray-800 shadow-md">
      <Container>
        <nav className="flex justify-between items-center py-3 md:py-4 px-4 md:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo
              width="120px"
              className="object-contain filter brightness-200 transition-transform duration-300 hover:scale-105"
            />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-6">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className={`relative py-1 text-sm tracking-wide uppercase transition-colors duration-200 ${
                        isPathActive(item.slug)
                          ? "text-cyan-400 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-cyan-400"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn className="border border-gray-700 text-gray-300 px-3 py-1 rounded-md hover:text-white hover:border-red-400 transition-colors duration-200" />
              </li>
            )}
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-200 focus:outline-none"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-black/80 border-t border-gray-800 overflow-hidden"
            >
              <ul className="flex flex-col items-start p-4 space-y-2">
                {navItems.map(
                  (item) =>
                    item.active && (
                      <li key={item.name} className="w-full">
                        <button
                          onClick={() => {
                            navigate(item.slug);
                            setMenuOpen(false);
                          }}
                          className={`block w-full text-left py-2 text-gray-300 text-sm tracking-wide uppercase border-b border-gray-800 last:border-none transition-colors duration-150 ${
                            isPathActive(item.slug) ? "text-cyan-400" : "hover:text-white"
                          }`}
                        >
                          {item.name}
                        </button>
                      </li>
                    )
                )}
                {authStatus && (
                  <li className="pt-2">
                    <LogoutBtn className="border border-gray-700 text-gray-300 px-3 py-1 rounded-md hover:text-white hover:border-red-400 transition-all duration-200" />
                  </li>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}

export default DarkHeader;
