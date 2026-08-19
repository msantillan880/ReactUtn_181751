import { createContext, useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase/firebaseConfig"
import { loginUser, logoutUser } from "../services/firebaseAuth"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  // herramientas que será proveidas a la app
  const [user, setUser] = useState(null)
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoader(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email, password) => {
    return await loginUser(email, password)
  }

  const logout = async () => {
    return await logoutUser()
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loader }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }