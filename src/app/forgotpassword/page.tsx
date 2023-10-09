"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [token, setToken] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [cpassword, setCpassword] = React.useState<string>("");
  const [error, setError] = React.useState(false);

  async function handleResetLink() {
    if (password.length > 0 && cpassword.length > 0 && password === cpassword) {
      try {
        await axios.post('api/users/forgotpassword', {password , token})
        router.push('/login')
      } catch (error: any) {
        setError(true);
        console.log(error.response.data);
      }
    }
  }

  useEffect(() => {
    setToken(window.location.search.split("=")[1]);
  }, []);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset your password
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm flex flex-col gap-3">
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="cpassword"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Confirm Password
          </label>
          <div className="mt-2">
            <input
              id="cpassword"
              name="cpassword"
              type="password"
              required
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            onClick={handleResetLink}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
