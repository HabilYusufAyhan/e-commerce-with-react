import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthorizationToken } from "../config/axiosConfig";

const Logout = () => {
  const navigate = useNavigate();
  const [text, setText] = useState(".");

  useEffect(() => {
    const performLogout = async () => {
      setAuthorizationToken();
      setInterval(() => {
        setText((prevText) => prevText + ".");
      }, 1000);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    };

    performLogout();
  }, [navigate]);

  return (
    <div className="absolute w-full h-full flex justify-center items-center bg-red-400">
      <div className="text-white font-semibold text-3xl">Signing out{text}</div>
    </div>
  );
};

export default Logout;
