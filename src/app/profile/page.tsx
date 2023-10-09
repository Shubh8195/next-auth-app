"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

const ProfilePage = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log(response);
      router.push("/login");
      toast.success("Logout Successful!");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const getUserDetails = async () => {
    const response = await axios.get("/api/users/currentuser");
    setData(response.data.user._id);
    console.log(response.data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-3">
      <h1>Profile</h1>
      <p>Profile page</p>
      <h2 className="bg-orange-200 px-4 py-2 rounded-full font-semibold">{!data ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <button
        onClick={handleLogout}
        className="bg-green-200 px-4 py-2 rounded-full font-semibold"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="bg-purple-200 px-4 py-2 rounded-full font-semibold"
      >
        User Detail
      </button>
    </div>
  );
};

export default ProfilePage;
