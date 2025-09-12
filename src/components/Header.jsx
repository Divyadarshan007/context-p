import { signOut } from "firebase/auth"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { auth } from "../config/firebase"

const Header = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const handleLogout = async () => {
        await signOut(auth)
        navigate("/login")
    }
    return (
        <div>
            {
                pathname == "/login" ? "" : <nav className=" bg-gray-800  w-full  border-b border-gray-200 dark:border-gray-600">
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                            
                            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">CodeLab</span>
                        </a>
                        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                            <button className="border px-7 text-white py-1" onClick={handleLogout}>Logout</button>
                            <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                                </svg>
                            </button>
                        </div>
                        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                                <li>
                                    <Link to={'/'} className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent " aria-current="page">Dashboard</Link>
                                </li>
                                <li>
                                    <Link to={'/labs'} className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent ">Labs</Link>
                                </li>
                                <li>
                                    <Link to={'/pcs'} className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent">Computers</Link>
                                </li>
                                <li>
                                    <Link to={'/Students'} className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent">Students</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            }
        </div>
    )
}

export default Header