import React, { useEffect, useState } from "react";
import axiosConfig from "../config/axiosConfig";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [waitingStatus, setWaitingStatus] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("ecommerce_training_token")
      ? `Bearer ${localStorage.getItem("ecommerce_training_token")}`
      : "";
    if (token) {
      axiosConfig
        .get("user/me", {
          Authorization: localStorage.getItem("ecommerce_training_token"),
        })
        .then((response) => {
          if (response.data) {
            navigate("/products");
            return;
          }
        });
    }
  }, []);
  const handleSubmit = (e) => {
    setWaitingStatus(true);
    e.preventDefault();
    console.log("info:", { email, username, gender, password });
    if (!username || !password || !email || !gender) {
      setError("Username, email, gender and password are required");
      setWaitingStatus(false);
      return;
    }
    axiosConfig
      .post("user/register", {
        email: email,
        username: username,
        gender: gender,
        password: password,
      })
      .then((response) => {
        setWaitingStatus(false);
        console.log(response.data);
      })
      .catch((error) => {
        setWaitingStatus(false);
        setError("Failed to register user. please try again.");
        console.error(error);
      });
  };

  return (
    <div className="flex justify-center items-center absolute w-full h-full bg-red-400">
      <div className="w-[360px] p-[8% 0 0] ">
        <div className="rounded-[10px] relative bg-white max-w-[360px] p-11 text-center shadow-[0 0 20px] shadow-[rgba(0, 0, 0, 0.2)]">
          <h3 className="pb-2 text-2xl">REGISTER</h3>
          {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}
          <form>
            <div className="flex items-center bg-[#f2f2f2] justify-center">
              <span className="pl-3">
                <i
                  className={`transition-all fa-solid fa-envelope text-sm ${
                    email ? "text-black" : "text-[#9b9a9a]"
                  }`}
                ></i>
              </span>
              <input
                className="outline-none bg-[#f2f2f2] w-full border-none m-[0 0 15px] p-4 pl-2 box-border text-sm placeholder:text-[#9b9a9a]"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex items-center bg-[#f2f2f2] justify-center">
              <span className="pl-3">
                <i
                  className={`transition-all fa-solid fa-user text-sm ${
                    username ? "text-black" : "text-[#9b9a9a]"
                  }`}
                ></i>
              </span>
              <input
                className="outline-none bg-[#f2f2f2] w-full border-none m-[0 0 15px] p-4 pl-2 box-border text-sm placeholder:text-[#9b9a9a]"
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex items-center bg-[#f2f2f2] justify-center">
              <span className="pl-3">
                <i
                  className={`transition-all fa-solid fa-lock text-sm ${
                    password ? "text-black" : "text-[#9b9a9a]"
                  }`}
                ></i>
              </span>
              <input
                className="outline-none bg-[#f2f2f2] w-full border-none m-[0 0 15px] p-4 pl-2 box-border text-sm placeholder:text-[#9b9a9a]"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-around mt-2 mb-2">
              <div className="">
                <input
                  id="male"
                  className="mr-1 outline-none border-none"
                  type="radio"
                  value="male"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                />
                <label className="text-[#6c0303]" htmlFor="male">
                  Male
                </label>
              </div>
              <div>
                <input
                  className="mr-1"
                  id="female"
                  type="radio"
                  value="female"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                />
                <label className="text-[#6c0303]" htmlFor="female">
                  Female
                </label>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="flex items-center justify-center uppercase outline-none bg-[#6c0303] w-full border-none p-4 text-white text-sm transition-all ease-linear cursor-pointer rounded-b-md hover:bg-[#960000] active:bg-[#960000]"
              type="submit"
            >
              Register
              {waitingStatus && (
                <img className="w-5 pl-1" src="src/assets/loading.gif" alt="" />
              )}
            </button>
            <p className="m-[15px 0 0] text-[#b3b3b3] text-xs mt-2">
              Do you already have an account?
              <a className="text-[#6c0303] ml-1" href="/login">
                login now
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
