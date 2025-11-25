import React from "react";
import { Link } from "react-router-dom";

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-100">
      <h1 className="text-4xl font-bold mb-6">Our Services</h1>
      <Link className="text-yellow-700 hover:underline" to="/">Back to Landing</Link>
      <p className="text-gray-700 text-center max-w-xl mt-4">
        This is the Services page.
      </p>
    </div>
  );
}
