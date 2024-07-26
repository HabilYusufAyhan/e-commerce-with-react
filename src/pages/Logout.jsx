import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const [text, setText] = useState(".");
  useEffect(() => {
    localStorage.removeItem("ecommerce_training_token");
    setInterval(() => {
      setText(text + ".");
    }, 1000);
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }, [navigate]);

  return (
    <div className="absolute w-full h-full flex justify-center items-center bg-red-400">
      <div className="text-white font-semibold text-3xl">Signing out{text}</div>
    </div>
  );
};

export default Logout;
