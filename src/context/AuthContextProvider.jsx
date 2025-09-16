import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useEffect, useState } from "react"
import { auth } from "../config/firebase";
import { Skeleton } from "@/components/ui/skeleton"
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
        return <div className="flex justify-center items-center h-screen flex-col space-y-3">
                  <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                  <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                  </div>
              </div>
        // <div className="flex justify-center items-center h-screen bg-black">
        //     <h1 className="text-5xl  text-white  font-bold">Loading...</h1>
        // </div>
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