"use client"
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { auth } from "../services";
import CustomInput from "./custom-input";

import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';

interface IUser {
    email: string;
    password: string;
  }
const PasswordForgotForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    formState: { isValid },
    handleSubmit,
  } = useForm<IUser>();

   const [email, setEmail] = useState('')
  const auth = getAuth();

  const triggerResetEmail = async (data) => {
    await sendPasswordResetEmail(auth, data.email);
    console.log("Password reset email sent")
  }

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    try {
      setIsSubmitting(true);
      await triggerResetEmail( data.email);
      toast.success("Email Sent to your inbox");
      router.push("todos");
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  //social auth

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged(async (user) => {
  //     setUser(user);
  //   });
  // }, []);

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900 mb-5">
        Forgot Password
      </h1>

      <p className="text-gray-700 mb-10">
        Enter Your Email to recieve a notification to reset your password
      </p>

      <div className="mb-4">
        <CustomInput
          required
          label="Email"
          name="email"
          placeholder="Example@email.com"
          register={register}
          rules={{ required: true }}
        />
      </div>

     
      <div className="flex justify-end text-sm text-blue-600 font-medium py-4">
        <button>Forgot Password?</button>
      </div>

      <button
        className={`bg-gray-900 text-white w-full h-[44px] rounded-xl ${
          isSubmitting || !isValid ? "cursor-not-allowed !bg-gray-500" : ""
        }`}
        disabled={isSubmitting || !isValid}
        onClick={handleSubmit(onSubmit)}
      >
        {isSubmitting ? "Signing in..." : "Send Notification"}
      </button>

     

      <div className="text-center text-sm text-gray-700 mt-10">
        Remember my password{" "}
        <button
          className="text-blue-700 font-medium"
          onClick={() => router.push("?action=signin")}
        >
          Sign In
        </button>
      </div>
    </>
  );
};

export default PasswordForgotForm
