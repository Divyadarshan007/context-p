import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContextProvider"
import { useNavigate } from "react-router-dom"
import { LoginForm } from "@/components/login-form"
const Login = () => {
    const [input, setInput] = useState({
        email: '', password: ''
    })
    const navigate = useNavigate()
    const { handleLogin, user } = useContext(AuthContext)

    useEffect(() => {
        if (user) {
            navigate("/")
            return
        }
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await handleLogin(input.email, input.password)
        if (res) {
            navigate("/")
        }
    }
    return (
        <div className=" ">
            <div className="flex items-center bg-gray-800 py-10 h-screen justify-center ">
                <div className="container">
                    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                        <div className="w-full max-w-sm">
                            <LoginForm handleSubmit={handleSubmit} setInput={setInput} input={input} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login