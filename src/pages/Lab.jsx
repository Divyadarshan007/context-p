import { useNavigate } from "react-router-dom"

const Lab = () => {
    const navigate = useNavigate()
    return (
        <div>
            <button onClick={()=>navigate('/add-lab')} className="border px-7 py-2 m-5">Add Lab</button>
        </div>
    )
}

export default Lab