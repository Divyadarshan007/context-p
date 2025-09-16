import { useNavigate } from "react-router-dom"

const AllStudents = () => {
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
      </div>
    </div>
  )
}

export default AllStudents
