import LoginForm from "@/components/auth/LoginForm";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex w-full justify-center items-center">
      <div className="w-[800px] h-[550px] flex bg-white mt-10">
        <div className="w-2/5 flex flex-col justify-between h-full p-8 bg-[#2874f0] text-white">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-background/70">
              Get access to your Orders, Wishlist and Recommendations
            </p>
          </div>
          <img src="/login-svg.png" alt="img" />
        </div>
        <div className="w-3/5 flex flex-col justify-start items-center mt-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
