import { Link, useNavigate } from "react-router-dom"
import { LabContext } from "../context/LabContextProvider"
import { useContext } from "react"
import { Badge } from "@/components/ui/badge"
import { EclipseIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

const Lab = () => {
    const navigate = useNavigate()
    const { labs, deleteLab } = useContext(LabContext)

    return (
        <div className="bg-[#e3e3e3] py-10 h-screen ">
            <div className="container mx-auto pt-10">
                    <div className="dark bg-muted  text-foreground px-4 md:py-2">
                        <div className="flex gap-2 md:items-center">
                            <div className="flex grow gap-3 md:items-center">
                                <EclipseIcon
                                    className="shrink-0 opacity-60 max-md:mt-0.5"
                                    size={16}
                                    aria-hidden="true"
                                />
                                <div className="flex grow flex-col justify-between gap-3 md:flex-row md:items-center">
                                    <p className="text-lg text-[#e3e3e3] font-semibold">
                                        All Labs
                                    </p>
                                    <div className="flex gap-2 max-md:flex-wrap">
                                        <Button onClick={() => navigate('/add-lab')} size="sm" className="text-sm bg-[#e3e3e3] text-[#212121] hover:bg-[#cacaca] transition-all">
                                            Add Lab
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
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
                                            <Badge variant="outline" className="gap-1.5">
                                                <span
                                                    className={`size-1.5 rounded-full ${lab.assigned <= 0 ? "bg-emerald-500" : "bg-orange-500"} `}
                                                    aria-hidden="true"
                                                ></span>
                                                {lab.assigned <= 0 ? "Full" : lab.assigned}
                                            </Badge>

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