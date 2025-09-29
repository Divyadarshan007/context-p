import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { StudentContext } from "../../context/StudentContextProvider"
import { LabContext } from "../../context/LabContextProvider"
import { PcContext } from "../../context/PcContextProvider"
import { EclipseIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { usePagination } from "@/hooks/use-pagination"

const AllStudents = () => {

  const { students, deleteStudent } = useContext(StudentContext)
  const { showLab } = useContext(LabContext)
  const { showPc } = useContext(PcContext)
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 10

  const totalPages = Math.ceil(students.length / rowsPerPage)

  const startIndex = (currentPage - 1) * rowsPerPage
  const currentStudents = students.slice(startIndex, startIndex + rowsPerPage)
  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay: 5,
  })

  return (
    <div className="py-10 bg-[#e3e3e3] h-screen">
      <div className="container mx-auto pt-10">
        <div className="dark bg-muted text-foreground px-4 md:py-2">
          <div className="flex gap-2 md:items-center">
            <div className="flex grow gap-3 md:items-center">
              <EclipseIcon
                className="shrink-0 opacity-60 max-md:mt-0.5"
                size={16}
                aria-hidden="true"
              />
              <div className="flex grow flex-col justify-between gap-3 md:flex-row md:items-center">
                <p className="text-lg text-[#e3e3e3] font-semibold">
                  All Students
                </p>
                <div className="flex gap-2 max-md:flex-wrap">
                  <Button onClick={() => navigate("/add-student")} size="sm" className="text-sm bg-[#e3e3e3] text-[#212121] hover:bg-[#cacaca] transition-all">
                    Add Student
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="relative overflow-x-auto shadow-md ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
              <tr>
                <th className="text-center px-6 py-3">No.</th>
                <th className="text-center px-6 py-3">Name</th>
                <th className="text-center px-6 py-3">Email</th>
                <th className="text-center px-6 py-3">GRID</th>
                <th className="text-center px-6 py-3">Lab</th>
                <th className="text-center px-6 py-3">PC</th>
                <th className="text-center px-6 py-3">Assigned On</th>
                <th className="text-center px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student, idx) => (
                <tr
                  key={student.studentId}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {startIndex + idx + 1}
                  </th>
                  <td className="text-center px-6 py-4">{student?.name}</td>
                  <td className="text-center px-6 py-4">{student?.email}</td>
                  <td className="text-center px-6 py-4">{student?.grid}</td>
                  <td className="text-center px-6 py-4">{showLab(student?.labId)}</td>
                  <td className="text-center px-6 py-4">{showPc(student?.pcId)}</td>
                  <td className="text-center px-6 py-4">
                    {student?.createdAt.toDate().toLocaleDateString("en-In")}
                  </td>
                  <td className="px-6 py-4 justify-center flex gap-4">

                    <Link
                      to={`/edit-student/${student?.studentId}/${student?.pcId}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <Link
                      onClick={() => deleteStudent(student?.studentId)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline">
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none cursor-pointer opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>

                {showLeftEllipsis && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                {pages.map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={page === currentPage}
                      onClick={() => setCurrentPage(page)}
                      className='cursor-pointer'
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {showRightEllipsis && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none cursor-pointer opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllStudents
