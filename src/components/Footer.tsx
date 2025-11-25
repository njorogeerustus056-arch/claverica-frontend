// src/components/Footer.tsx
import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaPaperPlane } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* GET IN TOUCH */}
        <div>
          <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-2">
            Get in Touch
          </h3>
          <h2 className="text-xl font-bold text-white mb-3">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-sm leading-relaxed text-gray-400 mb-4">
            Stay updated with the latest fintech insights and innovative financial solutions.
          </p>

          <div className="flex items-center shadow-lg rounded-md overflow-hidden">
            <input
              type="email"
              placeholder="Enter Email"
              className="bg-gray-800 text-gray-100 w-full px-4 py-2 placeholder-gray-500 focus:outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 transition-all duration-500 hover:scale-105 hover:shadow-lg animate-pulse-slow">
              <FaPaperPlane />
            </button>
          </div>

          <div className="flex space-x-5 mt-5 text-lg">
            <a href="#" className="hover:text-blue-400 transition-all duration-300 transform hover:scale-125 hover:drop-shadow-lg">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-blue-400 transition-all duration-300 transform hover:scale-125 hover:drop-shadow-lg">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-blue-400 transition-all duration-300 transform hover:scale-125 hover:drop-shadow-lg">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* LOCATION */}
        <div>
          <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-2">
            Location
          </h3>
          <h2 className="text-xl font-bold text-white mb-3">Head Office</h2>
          <p className="text-sm text-gray-400 mb-1">
            123 Financial District, New York, NY 10004
          </p>
          <p className="text-sm text-gray-400 mb-1">+1 332 334 3426</p>
          <p className="text-sm text-gray-400">clavericaforgnxchange.info@gmail.com</p>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-2">
            Services
          </h3>
          <ul className="space-y-1 text-sm text-gray-400">
            <li className="hover:text-blue-400 transition">Business Loan</li>
            <li className="hover:text-blue-400 transition">Personal Loan</li>
            <li className="hover:text-blue-400 transition">Home Loan</li>
            <li className="hover:text-blue-400 transition">Car Loan</li>
            <li className="hover:text-blue-400 transition">Crypto Services</li>
          </ul>
        </div>

        {/* LEGAL */}
        <div>
          <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-2">
            Legal
          </h3>
          <ul className="space-y-1 text-sm text-gray-400">
            <li className="hover:text-blue-400 transition">Terms & Conditions</li>
            <li className="hover:text-blue-400 transition">Privacy Policy</li>
            <li className="hover:text-blue-400 transition">Customer Relations</li>
            <li className="hover:text-blue-400 transition">Innovation</li>
            <li className="hover:text-blue-400 transition">Quick Contact</li>
            <li className="hover:text-blue-400 transition">Apply Online</li>
          </ul>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="mt-8 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()}{" "}
        <span className="text-blue-400 font-semibold">ClaveRica</span>. All Rights Reserved.
      </div>
    </footer>
  );
}
