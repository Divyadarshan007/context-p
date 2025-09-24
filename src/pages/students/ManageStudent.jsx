import { useContext, useEffect, useState } from "react"
import { LabContext } from "../../context/LabContextProvider"
import { PcContext } from "../../context/PcContextProvider"
import { StudentContext } from "../../context/StudentContextProvider"
import { useNavigate, useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../config/firebase"

const ManageStudent = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [input, setInput] = useState({
    name: '', email: '', grid: '', labId: '', pcId: ''
  })
  const { stuId } = useParams();
  const navigate = useNavigate()
  const [filteredPc, setFilteredPc] = useState([])
  const { labs, showLab } = useContext(LabContext)
  const { pcs, showPc } = useContext(PcContext)
  const { addStudent, editStudent } = useContext(StudentContext)
  useEffect(() => {
    if (stuId) {
      getStudent();
      setIsEdit(true);
    }
  }, [stuId])
  useEffect(() => {
    if (input.labId) {
      const availablePc = pcs.filter((pc) => {
        return pc.labId == input.labId && pc.status == "Available"
      })
      setFilteredPc(availablePc)
    }
  }, [input.labId])
  const getStudent = async () => {
    const studentSnapshot = await getDoc(doc(db, 'students', stuId))
    if (studentSnapshot.exists()) {
      setInput(studentSnapshot.data())
    }
  }
  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isEdit) {
      await editStudent(input, stuId)
      navigate('/students')

    } else {
     await addStudent(input)
      navigate('/students')
    }
  }
  return (
    <section className="bg-[#e3e3e3] h-screen">
      <div className="py-10">
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Name</label>
            <input type="text" value={input.name} onChange={handleChange} id="name" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="John Doe" required />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input type="text" value={input.email} onChange={handleChange} id="email" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@flowbite.com" required />
          </div>
          <div className="mb-5">
            <label htmlFor="grid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">grid</label>
            <input type="text" value={input.grid} onChange={handleChange} id="grid" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="1234" required />
          </div>
          <div className="mb-5">
            <label htmlFor="labId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lab</label>
            <select id="labId" value={input.labId} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value=''>Choose a Lab</option>
              {labs.map((lab) => {
                return <option key={lab.id} value={lab.id}>{showLab(lab.id)}</option>
              })}
            </select>
          </div>
          <div className="mb-5">
            <label htmlFor="pcId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pc</label>
            <select id="pcId" value={input.pcId} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value=''>Choose a Pc</option>
              {filteredPc.map((pc) => {
                return <option key={pc.pcId} value={pc.pcId}>{showPc(pc.pcId)}</option>
              })}
            </select>
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isEdit ? "Update" : "Add New"} Student</button>
        </form>
      </div>
    </section>
  )
}

export default ManageStudent