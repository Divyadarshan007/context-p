import { Link, useNavigate } from "react-router-dom"
import { LabContext } from "../context/LabContextProvider"
import { useContext } from "react"
import { Button } from "../components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const Lab = () => {
    const navigate = useNavigate()
    const { labs, deleteLab } = useContext(LabContext)
    return (
        <div className="bg-[#e3e3e3]  py-10 h-screen ">
            <div className="container mx-auto flex justify-between py-10">
                <h1 className="text-3xl text-background">All Labs</h1>
                <Button onClick={() => navigate('/add-lab')} className="border bg-primary  px-7 py-2 m-5">Add Lab</Button>
            </div>
            <div className="container mx-auto">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <Table className='bg-primary'>
                        <TableHeader className='text-muted-background'>
                            <TableRow>
                                <TableHead className="w-[100px] text-center">No.</TableHead>
                                <TableHead className='text-center'>Name</TableHead>
                                <TableHead className='text-center'>Capacity</TableHead>
                                <TableHead className='text-center'>Location</TableHead>
                                <TableHead className='text-center'>Created On</TableHead>
                                <TableHead className='text-center'>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className='text-muted-foreground font-medium'>
                            {
                                labs.map((lab, idx) => {
                                    return <TableRow key={idx}>
                                        <TableCell className="font-medium text-center">{idx + 1}</TableCell>
                                        <TableCell className='text-center'>{lab.name}</TableCell>
                                        <TableCell className='text-center'>{lab.capacity}</TableCell>
                                        <TableCell className='text-center'>{lab.location}</TableCell>
                                        <TableCell className='text-center'>{lab.createdAt.toDate().toLocaleDateString("en-In")}</TableCell>
                                        <TableCell className="flex justify-center gap-4">
                                            <Link to={`/edit-lab/${lab.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                            <Link onClick={() => deleteLab(lab.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</Link>
                                        </TableCell>
                                    </TableRow>
                                })
                            }
                        </TableBody>
                    </Table>
                </div>


            </div>


        </div>
    )
}

export default Lab