import { useContext, useEffect } from "react"
import Login from "../pages/Login"
import { AuthContext } from "../context/AuthContextProvider"
import { useNavigate } from "react-router-dom"

const ProtectedRoute = ({ Component }) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)
    useEffect(() => {
        if (user == null) {
            navigate("/login");
        }
    }, [user])


    return (
        user ? <Component /> : null
    )
}

export default ProtectedRoute