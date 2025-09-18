import { Link, useNavigate } from "react-router-dom"
import { LabContext } from "../context/LabContextProvider"
import { useContext } from "react"

const Lab = () => {
    const navigate = useNavigate()
    const { labs, deleteLab } = useContext(LabContext)

    return (
        <div className="bg-[#e3e3e3] py-10 h-screen ">
            <div className="container mx-auto ">
                <div className="flex justify-between items-center py-10">
                    <h1 className="text-3xl text-foreground font-semibold">All Labs</h1>
                    <button onClick={() => navigate('/add-lab')} className="border bg-[#010201] text-background font-medium px-7 py-2 m-5">Add Lab</button>
                </div>
            </div>
            <div className="container mx-auto">
                <div className="relative overflow-x-auto shadow-md ">
                    <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 border-b'>
                            <tr>
                                <th className="text-center px-6 py-3">No.</th>
                                <th className='text-center px-6 py-3'>Name</th>
                                <th className='text-center px-6 py-3'>Capacity</th>
                                <th className='text-center px-6 py-3'>Remaining Space</th>
                                <th className='text-center px-6 py-3'>Location</th>
                                <th className='text-center px-6 py-3'>Created On</th>
                                <th className='text-center px-6 py-3'>Action</th>
                            </tr>
                        </thead>
                        <tbody className=' '>
                            {
                                labs.map((lab, idx) => {
                                    return <tr key={idx} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'>
                                        <th className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{idx + 1}</th>
                                        <td className='text-center px-6 py-4'>{lab.name}</td>
                                        <td className='text-center px-6 py-4'>{lab.capacity}</td>
                                        <td className='text-center  '>
                                            <div className="bg-green-600 px-4 py-1 rounded-full text-white inline-block">
                                                {lab.assigned <= 0 ? "Full" : lab.assigned}
                                            </div>
                                        </td>
                                        <td className='text-center px-6 py-4'>{lab.location}</td>
                                        <td className='text-center px-6 py-4'>{lab.createdAt.toDate().toLocaleDateString("en-In")}</td>
                                        <td className="px-6 py-4 justify-center flex gap-4">
                                            <Link to={`/edit-lab/${lab.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                            <Link onClick={() => deleteLab(lab.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</Link>
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

export default Lab