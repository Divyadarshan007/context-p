import { signOut } from "firebase/auth"
import { auth } from "../config/firebase"
import { Link, useNavigate } from "react-router-dom"

const Dashboard = () => {
    const navigate = useNavigate()

    const handleLogout = async () => {
        await signOut(auth)
        navigate("/login")
    }
    return (
        <div>
            <button className="border px-7" onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Dashboard