import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { PcContext } from "../../context/PcContextProvider"
import { LabContext } from "../../context/LabContextProvider"

const Pcs = () => {
    const navigate = useNavigate()
    const { pcs } = useContext(PcContext)
    const { labs } = useContext(LabContext)

    const showLab = (labId) => {
       const labName = labs.find((lab) => {
            return lab.id == labId 
        })
        return labName.name 
    }

    return (
        <div>
            <div className="container mx-auto flex justify-between py-10    ">
                <h1 className="text-3xl">All Pcs</h1>
                <button onClick={() => navigate('/add-pc')} className="border px-7 py-2 m-5">Add Pc</button>
            </div>
            <div className="container mx-auto">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    No.
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Lab Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Created on
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pcs.map((pc, idx) => {
                                    return <tr key={idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {idx + 1}
                                        </th>
                                        <td className="px-6 py-4">
                                            {pc.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {showLab(pc.labId)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {pc.status}
                                        </td>
                                        <td className="px-6 py-4">
                                            {pc.createdAt.toDate().toLocaleDateString("en-In")}
                                        </td>
                                        <td className="px-6 py-4 text-right flex gap-4">
                                            {/* <Link to={`/edit-lab/${lab.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                            <Link onClick={() => deleteLab(lab.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</Link> */}
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>


            </div>
        </div>
    )
}

export default Pcs