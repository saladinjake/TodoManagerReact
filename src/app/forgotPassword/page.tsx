import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import PasswordForgotForm from "../components/forget-password"
import { useSearchParams } from "next/navigation";
function ResetPassword() {
  const searchParams = useSearchParams();
  return (
    <PasswordForgotForm/>
  )
}

export default ResetPassword;