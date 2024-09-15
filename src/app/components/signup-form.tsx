import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { auth } from "../services";
import CustomInput from "./custom-input";

  interface IUser {
    displayName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

const SignupForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const {
    register,
    formState: { isValid },
    handleSubmit,
    watch,
  } = useForm<IUser>();

  const password = watch("password");

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    try {
      setIsSubmitting(true);
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(auth.currentUser as User, {
        displayName: data.displayName,
      });

      toast.success("Successfully signed up 🔥");

      router.push("todos");
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900 mb-5">Join us</h1>

      <p className="text-gray-700 mb-10">
        Today is a new day. It&apos;s your day. you shape it. Join to start
        managing your projects.
      </p>

      <div className="mb-4">
        <CustomInput
          required
          label="Name"
          name="displayName"
          placeholder="John Doe"
          register={register}
          rules={{ required: true }}
        />
      </div>

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

      <div className="mb-4">
        <CustomInput
          required
          label="Password"
          name="password"
          type="password"
          placeholder="At least 8 characters"
          register={register}
          rules={{ required: true }}
        />
      </div>

      <CustomInput
        required
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        placeholder="Confirm password"
        register={register}
        rules={{
          required: true,
          validate: (value: string) => value === password,
        }}
      />

      <div className="flex justify-end text-sm text-blue-600 font-medium py-4">
        <button   onClick={() => router.push("/forgotPassword")}>Forgot Password?</button>
      </div>

      <button
        className={`bg-gray-900 text-white w-full h-[44px] rounded-xl ${
          isSubmitting || !isValid ? "cursor-not-allowed !bg-gray-500" : ""
        }`}
        disabled={isSubmitting || !isValid}
        onClick={handleSubmit(onSubmit)}
      >
        {isSubmitting ? "Signing up..." : "Sign up"}
      </button>

      <div className="relative my-8">
        <div className="w-full h-[1px] bg-gray-100"></div>

        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white px-3 text-sm text-gray-600">
          Or
        </div>
      </div>

      <button className="w-full h-[44px] bg-[#F3F9FA] text-sm text-gray-500 font-medium rounded-xl flex items-center pl-[94px] gap-x-1">
        <Image src="/icons/google.svg" alt="google" width="36" height="36" />
        Sign in with Google
      </button>

      <button className="w-full h-[44px] bg-[#F3F9FA] text-sm text-gray-500 font-medium rounded-xl flex items-center pl-[100px] gap-x-2 mt-4">
        <Image src="/icons/facebook.svg" alt="google" width="24" height="24" />
        Sign in with facebook
      </button>

      <div className="text-center text-sm text-gray-700 mt-10">
        Don&apos;t you have an account?{" "}
        <button
          className="text-blue-700 font-medium"
          onClick={() => router.push("/")}
        >
          Sign in
        </button>
      </div>
    </>
  );
};

export default SignupForm;
