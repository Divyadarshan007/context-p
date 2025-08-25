import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContextProvider"
import { useNavigate } from "react-router-dom"


const Login = () => {
    const [input, setInput] = useState({
        email: '', password: ''
    })
    const navigate = useNavigate()
    const { handleLogin, user } = useContext(AuthContext)

    useEffect(()=>{
        if(user){
            navigate("/")
            return
        }
    },[user])

    const handleSubmit = async (e) => {
        e.preventDefault();
       const res = await handleLogin(input.email, input.password)
       if(res){
        navigate("/")
       }
       
    }
    return (
        <div className=" ">
            <div className="flex items-center bg-gray-800 py-10 h-screen justify-center ">
                <div className="container">
                    <form className="w-3/12 mx-auto" onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="text" value={input.email} onChange={(e) => setInput({ ...input, [e.target.id]: e.target.value })} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input type="password" value={input.password} onChange={(e) => setInput({ ...input, [e.target.id]: e.target.value })} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                </div>
            </div>

        </div>

    )
}

export default Login