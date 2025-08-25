import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useEffect, useState } from "react"
import { auth } from "../config/firebase";
export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(undefined);
    useEffect(() => {
        const unsubscibe = onAuthStateChanged(auth, (data) => {
            setUser(data);
        })
        return () => unsubscibe()
    }, [])

    const handleLogin = async (email, password) => {
     return await signInWithEmailAndPassword(auth, email, password)
    }

    const value = {
        user, handleLogin
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider