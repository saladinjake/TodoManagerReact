import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import PasswordForgotForm from "../components/forget-password"

function ResetPassword() { 
  return (
    <PasswordForgotForm/>
  )
}

export default ResetPassword;