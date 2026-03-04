import React from "react";

const Logo = ({ width = "100px" }) => {
  return (
    <div
      className="flex items-center gap-2 font-bold text-3xl text-blue-600"
      style={{ width }} // ✅ Apply width from props
    >
      {/* Example: You can replace this with an <img> or an SVG */}
      <span className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center rounded-full">
        Post
      </span>
      <span>Hive</span>
    </div>
  );
};

export default Logo;
