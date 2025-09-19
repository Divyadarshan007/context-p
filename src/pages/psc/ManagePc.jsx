import { useContext, useEffect, useState } from "react"
import { LabContext } from "../../context/LabContextProvider"
import { PcContext } from "../../context/PcContextProvider"
import { useNavigate, useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../config/firebase"


const ManagePc = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [input, setInput] = useState({
        name: '', labId: ''
    })
    const { pcId, labId } = useParams()
    const navigate = useNavigate()
    const { labs } = useContext(LabContext)
    const { addPc, updatePc } = useContext(PcContext)
    useEffect(() => {
        if (pcId) {
            getPc()
            setIsEdit(true)
        }
    }, [pcId])

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value })
    }
    const getPc = async () => {
        const pcSnapshot = await getDoc(doc(db, "pcs", pcId))
        if (pcSnapshot.exists()) {
            setInput(pcSnapshot.data())
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isEdit) {
            await updatePc(pcId, input, labId)
            navigate('/pcs')
        } else {
            await addPc(input)
            navigate('/pcs')
        }

    }
    return (
        <div className="bg-[#e3e3e3] h-screen py-10">
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pc Name</label>
                    <input type="text" value={input.name} onChange={handleChange} id="name" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@flowbite.com" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="labId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lab</label>
                    <select id="labId" value={input.labId} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value>Choose a Lab</option>
                        {
                            labs && labs.map((lab, idx) => {
                                return lab.assigned <= 0 ? "" : <option key={idx} value={lab.id}>{lab.name}</option>
                            })
                        }
                    </select>
                </div>
             
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isEdit ? "Update" : "Add New"} Lab</button>
            </form>
        </div>
    )
}

export default ManagePc
