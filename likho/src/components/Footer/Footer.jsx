import React from 'react';
import Logo from '../../assets/Logo.png';

// --- SVG Icons (Self-contained components) ---
// Using SVG icons directly is a great practice to avoid external dependencies.

const TwitterIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
  </svg>
);

const GithubIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
  </svg>
);

const DribbbleIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61c-1.5.056-3.004.99-4.237 2.23-.968-1.21-2.45-1.78-4.244-1.78-1.402 0-2.73.405-3.82 1.15.546-1.45 1.543-2.78 2.87-3.794a10.024 10.024 0 014.78-1.576zm-13.203 3.513c0-1.34.405-2.61 1.15-3.64.972.99 2.193 1.78 3.64 1.78 1.396 0 2.71-.59 3.62-1.78.91 1.21 1.41 2.64 1.41 4.14v1.83c0 2.84-1.68 5.37-4.14 6.56a10.012 10.012 0 01-11.02 0C2.98 16.76 2 14.56 2 12.013v-1.89z" clipRule="evenodd" />
  </svg>
);


// --- Main Footer Component ---
function Footer() {
  return (
    <footer className="relative overflow-hidden py-10 bg-black border-t-2 border-t-teal-500">
        <div className="relative z-10 mx-auto max-w-7xl px-4">
            <div className="-m-6 flex flex-wrap">
                
                {/* Column 1: Logo and Copyright */}
                <div className="w-full p-6 md:w-1/2 lg:w-4/12">
                    <div className="flex h-full flex-col justify-between">
                        <div className="mb-4">
                            <a>
                                <img src={Logo} alt="YourBrand Logo" className="h-12 w-32 object-cover" />
                            </a>
                            <p className="text-sm text-gray-400 mt-4">
                                A design-forward company creating beautiful web experiences.
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                &copy; Copyright 2024. All Rights Reserved by YourBrand.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Column 2: Company Links */}
                <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                    <div className="h-full">
                        <h3 className="tracking-px mb-6 text-sm font-semibold uppercase text-white">
                            Company
                        </h3>
                        <ul>
                            <li className="mb-4">
                                <a className="text-base font-medium text-gray-300 hover:text-teal-400 transition-colors duration-300" href="#">
                                    Features
                                </a>
                            </li>
                            <li className="mb-4">
                                <a className="text-base font-medium text-gray-300 hover:text-teal-400 transition-colors duration-300" href="#">
                                    Pricing
                                </a>
                            </li>
                            <li className="mb-4">
                                <a className="text-base font-medium text-gray-300 hover:text-teal-400 transition-colors duration-300" href="#">
                                    Affiliate Program
                                </a>
                            </li>
                            <li>
                                <a className="text-base font-medium text-gray-300 hover:text-teal-400 transition-colors duration-300" href="#">
                                    Press Kit
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Column 3: Support Links */}
                <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                    <div className="h-full">
                        <h3 className="tracking-px mb-6 text-sm font-semibold uppercase text-white">
                            Support
                        </h3>
                        <ul>
                            <li className="mb-4">
                                <a className="text-base font-medium text-gray-300 hover:text-teal-400 transition-colors duration-300" href="#">
                                    Account
                                </a>
                            </li>
                            <li className="mb-4">
                                <a className="text-base font-medium text-gray-300 hover:text-teal-400 transition-colors duration-300" href="#">
                                    Help
                                </a>
                            </li>
                            <li className="mb-4">
                                <a className="text-base font-medium text-gray-300 hover:text-teal-400 transition-colors duration-300" href="#">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a className="text-base font-medium text-gray-300 hover:text-teal-400 transition-colors duration-300" href="#">
                                    Customer Support
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                
                {/* Column 4: Legals and Social */}
                <div className="w-full p-6 md:w-1/2 lg:w-4/12">
                    <div className="h-full">
                        <h3 className="tracking-px mb-6 text-sm font-semibold uppercase text-white">
                            Legals & Social
                        </h3>
                        <ul className="mb-6">
                           <li className="mb-4">
                                <a className="text-base font-medium text-gray-300 hover:text-teal-400 transition-colors duration-300" href="#">
                                    Terms &amp; Conditions
                                </a>
                            </li>
                            <li className="mb-4">
                                <a className="text-base font-medium text-gray-300 hover:text-teal-400 transition-colors duration-300" href="#">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a className="text-base font-medium text-gray-300 hover:text-teal-400 transition-colors duration-300" href="#">
                                    Licensing
                                </a>
                            </li>
                        </ul>
                         <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
                                <TwitterIcon />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
                                <GithubIcon />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
                                <DribbbleIcon />
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </footer>
  );
}

// Default export of the main App component for rendering.
// The wrapper div is removed to show only the footer.
export default function App() {
    return (
        <Footer />
    );
}

