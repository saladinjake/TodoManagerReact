import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { auth, facebook, google, signInWithProvider,signOutOfProvider } from "../services";
import CustomInput from "./custom-input";
interface IUser {
    email: string;
    password: string;
  }
const SigninForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    formState: { isValid },
    handleSubmit,
  } = useForm<IUser>();
  const onSubmit: SubmitHandler<IUser> = async (data) => {
    try {
      setIsSubmitting(true);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success("Successfully signed in");
      router.push("todos");
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  //social auth

  //Function to login user 
  const loginSocial = async (provider) => {
    try {
      //authenticate the user by calling a popup
      const result = await signInWithProvider(auth, provider);
      //fetch the user data
     // setUser(result.user); // Stores user data in the 'user' state
       toast.success("Successfully signed in");
      router.push("todos"); 
    } catch (e) {
     
      console.log(`login error ${e}`);
      //setIsLogin(false); // Sets 'isLogin' to false on login failure
    }
  }
  //Function to logout user
  const logoutSocial = async () => {
    try {
      await signOut(auth); // Signs the user out through Firebase
        toast.success("Successfully logged out");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900 mb-5">
        Welcome Back 👋
      </h1>

      <p className="text-gray-700 mb-10">
        Today is a new day. It&apos;s your day. you shape it. Sign in to start
        managing your projects.
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

      <CustomInput
        required
        type="password"
        name="password"
        label="Password"
        placeholder="At least 8 characters"
        register={register}
        rules={{ required: true }}
      />

      <div className="flex justify-end text-sm text-blue-600 font-medium py-4">
        <button   onClick={() => router.push("?forgotPassword")}>Forgot Password?</button>
      </div>

      <button
        className={`bg-gray-900 text-white w-full h-[44px] rounded-xl ${
          isSubmitting || !isValid ? "cursor-not-allowed !bg-gray-500" : ""
        }`}
        disabled={isSubmitting || !isValid}
        onClick={handleSubmit(onSubmit)}
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>

      <div className="relative my-8">
        <div className="w-full h-[1px] bg-gray-100"></div>

        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white px-3 text-sm text-gray-600">
          Or
        </div>
      </div>

      <button onClick={()=> loginSocial(google)} className="w-full h-[44px] bg-[#F3F9FA] text-sm text-gray-500 font-medium rounded-xl flex items-center pl-[94px] gap-x-1">
        <Image src="/icons/google.svg" alt="google" width="36" height="36" />
        Sign in with Google
      </button>

      <button onClick={()=> loginSocial(facebook)} className="w-full h-[44px] bg-[#F3F9FA] text-sm text-gray-500 font-medium rounded-xl flex items-center pl-[100px] gap-x-2 mt-4">
        <Image src="/icons/facebook.svg" alt="google" width="24" height="24" />
        Sign in with facebook
      </button>

      <div className="text-center text-sm text-gray-700 mt-10">
        Don&apos;t you have an account?{" "}
        <button
          className="text-blue-700 font-medium"
          onClick={() => router.push("?action=signup")}
        >
          Sign up
        </button>
      </div>
    </>
  );
};

export default SigninForm;
