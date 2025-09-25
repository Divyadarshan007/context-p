import LabPcStudentTable from "../components/LabPcStudentTable"
import PieCharts from "../components/PieCharts"

const Dashboard = () => {
    return (
        <section className='bg-[#e3e3e3]'>
            <div className=' container mx-auto'>
                <div className="flex gap-6 relative h-screen py-10  z-20">
                    <div className="w-4/12">
                        <PieCharts />
                    </div>
                    <div className="w-8/12">
                        <LabPcStudentTable />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Dashboard


