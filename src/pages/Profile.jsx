import React, { useEffect, useState } from "react";
import axiosConfig, { setAuthorizationToken } from "../config/axiosConfig";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("ecommerce_training_token")
      ? `Bearer ${localStorage.getItem("ecommerce_training_token")}`
      : "";

    if (!token) {
      navigate("/login");
    } else {
      axiosConfig.defaults.headers.common["Authorization"] = token;
      axiosConfig
        .get("user/me")
        .then((response) => {
          if (!response.data) {
            navigate("/login");
          } else {
            setUser(response.data);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data", error);
          navigate("/login");
        });
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="w-full h-full bg-red-400 fixed flex items-center justify-center">
        <p className="text-white text-2xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-red-400 fixed flex items-start">
      <div className="flex justify-center w-full">
        <div className="bg-red-800 mt-20 flex flex-col justify-center items-center p-7 h-full rounded-md">
          <div className="pb-5">
            <img
              className="rounded-full border-2 border-white bg-white"
              src={user.image}
              alt="profile picture"
            />
          </div>
          <div className="gap-2 flex flex-col pb-3">
            <div className="flex items-center gap-5 text-white">
              <p>
                <span className="font-semibold">First Name: </span>
                {user.firstName}
              </p>
              <p>
                <span className="font-semibold">Last Name: </span>{" "}
                {user.lastName}
              </p>
            </div>
            <div className="flex items-center gap-1 text-white">
              <span className="font-semibold"> Age:</span> {user.age}
            </div>
            <div className="flex items-center gap-1 text-white">
              <span className="font-semibold"> Date of Birth:</span>{" "}
              {user.birthDate}
            </div>
            <div className="flex items-center gap-1 text-white">
              <span className="font-semibold"> Email:</span> {user.email}
            </div>
            <div className="flex items-center gap-1 text-white">
              <span className="font-semibold"> Gender:</span>
              {user.gender}
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Profile;
