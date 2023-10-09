"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const VefifyEmail = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
     await axios.post("api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  });

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);
  return (
    <div className="flex h-[100vh] flex-col justify-center items-center px-6 py-12 lg:px-8 gap-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "No Token"}
      </h2>

      {verified && (
        <div>
          <h2 className="text-2xl">Email verified</h2>
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
        </div>
      )}

      {error && (
        <div>
          <h2 className="text-2xl bg-red-400">Error</h2>
        </div>
      )}
    </div>
  );
};

export default VefifyEmail;
