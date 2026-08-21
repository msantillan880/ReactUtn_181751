import { auth } from "../firebase/firebaseConfig"
import { signInWithEmailAndPassword, signOut } from "firebase/auth"

const loginUser = async (email, password) => {
  const userCredentials = await signInWithEmailAndPassword(auth, email, password)
  return userCredentials.user
}

const logoutUser = async () => {
  await signOut(auth)
}

export { loginUser, logoutUser }