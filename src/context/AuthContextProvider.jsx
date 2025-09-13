import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useEffect, useState } from "react"
import { auth } from "../config/firebase";
export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
    const [loader, setLoader] = useState(true)
    const [user, setUser] = useState(undefined);
    useEffect(() => {
        const unsubscibe = onAuthStateChanged(auth, (data) => {
            setUser(data);
            setLoader(false)
        })
        return () => unsubscibe()
    }, [])
    if (loader) {
        return <div className="flex justify-center items-center h-screen bg-black">
            <h1 className="text-5xl  text-white  font-bold">Loading...</h1>
        </div>
    }
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