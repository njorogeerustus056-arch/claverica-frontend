import React from "react";
import { Link } from "react-router-dom";

export default function Projects() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-100">
      <h1 className="text-4xl font-bold mb-6">Our Projects</h1>
      <Link className="text-purple-700 hover:underline" to="/">Back to Landing</Link>
      <p className="text-gray-700 text-center max-w-xl mt-4">
        This is the Projects page.
      </p>
    </div>
  );
}
