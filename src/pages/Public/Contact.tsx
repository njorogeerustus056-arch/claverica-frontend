// src/pages/Public/Contact.tsx
import React from "react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 sm:px-10 pt-28 pb-16">
      {/* 👆 Added pt-28 to push below navbar */}

      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 animate-gradient-move">
          Get in Touch
        </h1>
        <p className="text-gray-300 text-lg">
          We're here to help and answer any question you might have. We look
          forward to hearing from you.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Left Column: Contact Info */}
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl font-semibold mb-3 text-blue-400 flex items-center gap-2">
              📧 Email Us
            </h2>
            <p className="text-gray-300 leading-relaxed">
              For general inquiries, partnership opportunities, or support,
              please send us an email.
            </p>
            <a
              href="mailto:clavericaforgnxchange.info@gmail.com"
              className="block mt-2 font-medium text-lg text-blue-400 hover:underline"
            >
              clavericaforgnxchange.info@gmail.com
            </a>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3 text-blue-400 flex items-center gap-2">
              📞 Call Us
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Our team is available during business hours to assist you over the
              phone.
            </p>
            <p className="mt-2 font-medium text-lg text-blue-400">
              +1 332 334 3426
            </p>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="bg-gray-800 p-8 rounded-2xl shadow-lg shadow-blue-900/40 border border-gray-700">
          <form className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-gray-300 mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-[0_0_10px_#3b82f6] transition duration-300"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-300 mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-[0_0_10px_#3b82f6] transition duration-300"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-300 mb-2" htmlFor="message">
                Your Message
              </label>
              <textarea
                id="message"
                placeholder="Your message..."
                rows={5}
                className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-[0_0_15px_#9333ea] transition duration-300 resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 hover:opacity-90 text-white font-semibold rounded-lg shadow-lg shadow-blue-900/30 transition-all flex items-center justify-center space-x-2"
            >
              <span>📨 Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
