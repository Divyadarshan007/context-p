import { useContext, useEffect, useState } from "react"
import { LabContext } from "../context/LabContextProvider"
import { useNavigate, useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../config/firebase"

const AddLab = () => {
    const [input, setInput] = useState({
        name: '', capacity: '', location: ''
    })
    const [isEdit, setIsEdit] = useState(false)
    const { labId } = useParams()
    const navigate = useNavigate()
    const { addLab, updateLab } = useContext(LabContext);
    useEffect(() => {
        const getData = async () => {
            try {
                const docSnap = await getDoc(doc(db, "labs", labId))
                setInput(docSnap.data())
                setIsEdit(true)
            } catch (err) {
                console.log(err)
            }
        }
        if (labId) {
            getData()
        }
    }, [labId])
    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            updateLab(labId, input)
            setInput({ name: '', capacity: '', location: '' })
            navigate('/labs')
        } else {
            addLab(input)
            setInput({ name: '', capacity: '', location: '' })
            navigate('/labs')
        }
    }
    return (
        <div>
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lab Name</label>
                    <input type="text" value={input.name} onChange={handleChange} id="name" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@flowbite.com" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="capacity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Capacity</label>
                    <input type="number" value={input.capacity} onChange={handleChange} id="capacity" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
                </div>
                <div className="mb-5">
                    <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                    <input type="text" value={input.location} onChange={handleChange} id="location" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isEdit ? "Update" : "Add New"} Lab</button>
            </form>
        </div>
    )
}

export default AddLab