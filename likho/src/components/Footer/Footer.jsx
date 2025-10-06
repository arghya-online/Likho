import React from "react";
import { motion } from "framer-motion";
import { Github, Twitter, Instagram } from "lucide-react";
import Logo from "../../assets/Logo.svg";

function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-gray-950 via-black to-gray-950 border-t border-teal-500 text-gray-300 py-12 overflow-hidden">
      {/* Subtle gradient animation glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-teal-800/10 via-transparent to-teal-800/10 blur-3xl"
        animate={{ x: ["0%", "100%"] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Column 1: Logo and Description */}
        <div>
          <motion.img
            src={Logo}
            alt="Likho Logo"
            className="h-12 mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
          <p className="text-gray-400 text-sm leading-relaxed">
            Your journey, your words. Share the stories only you can tell, connect with those who listen, and inspire the world with Likho.
          </p>
          <p className="mt-6 text-xs text-gray-500">
            © {new Date().getFullYear()} Likho. All rights reserved.
          </p>
        </div>

        {/* Column 3: Support */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
            Support
          </h3>
          <ul className="space-y-2">
            {["Account", "Help", "Contact", "Customer Support"].map((item) => (
              <li key={item}>
                <a
                  href="mailto:arghyamajumdar.contact@gmail.com"
                  className="hover:text-teal-400 transition-all duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Social Links */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
            Connect
          </h3>
          <div className="flex space-x-5 mt-4">
            {[
              { Icon: Twitter, href: "https://x.com/ArghyaOnline01/" },
              { Icon: Github, href: "https://github.com/arghya-online/" },
              { Icon: Instagram, href: "https://www.instagram.com/arghya_explains/" },
            ].map(({ Icon, href }) => (
              <motion.a
                key={href}
                href={href}
                whileHover={{ scale: 1.2, color: "#14b8a6" }}
                transition={{ duration: 0.2 }}
                className="text-gray-400 hover:text-teal-400"
              >
                <Icon size={22} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
