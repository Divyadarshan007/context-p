import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { StudentContext } from "../../context/StudentContextProvider"
import { LabContext } from "../../context/LabContextProvider"
import { PcContext } from "../../context/PcContextProvider"

const AllStudents = () => {
  const { students } = useContext(StudentContext)
  const { showLab } = useContext(LabContext)
  const { showPc } = useContext(PcContext)
  const navigate = useNavigate()
  return (
    <div className="py-10 bg-[#e3e3e3] h-screen">
      <div className="container mx-auto ">
        <div className="flex items-center justify-between py-10">
          <h1 className="text-3xl font-semibold text-foreground">All Students</h1>
          <button
            onClick={() => navigate("/add-student")}
            className="border px-7 py-2 m-5 text-white bg-[#010201] font-medium">
            Add Student
          </button>
        </div>
        <div className="relative overflow-x-auto shadow-md ">
          <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 border-b'>
              <tr>
                <th className="text-center px-6 py-3">No.</th>
                <th className='text-center px-6 py-3'>Name</th>
                <th className='text-center px-6 py-3'>Email</th>
                <th className='text-center px-6 py-3'>GRID</th>
                <th className='text-center px-6 py-3'>Lab</th>
                <th className='text-center px-6 py-3'>PC</th>
                <th className='text-center px-6 py-3'>Assigned On</th>
                <th className='text-center px-6 py-3'>Action</th>
              </tr>
            </thead>
            <tbody className=''>
              {
                students.map((student, idx) => {
                  return <tr key={student.studentId} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'>
                    <th className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{idx + 1}</th>
                    <td className='text-center px-6 py-4'>{student?.name}</td>
                    <td className='text-center px-6 py-4'>{student?.email}</td>
                    <td className='text-center px-6 py-4'>{student?.grid}</td>
                    <td className='text-center px-6 py-4'>{showLab(student?.labId)}</td>
                    <td className='text-center px-6 py-4'>{showPc(student?.pcId)}</td>
                    <td className='text-center px-6 py-4'>{student?.createdAt.toDate().toLocaleDateString("en-In")}</td>
                    <td className="px-6 py-4 justify-center flex gap-4">
                      <Link to={`/edit-lab/${student?.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                      <Link onClick={() => deleteLab(student?.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</Link>
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

export default AllStudents
