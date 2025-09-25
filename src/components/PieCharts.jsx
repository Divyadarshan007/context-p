import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useContext } from "react";
import { LabContext } from "../context/LabContextProvider";
import { PcContext } from "../context/PcContextProvider";
import { StudentContext } from "../context/StudentContextProvider";

const COLORS_LABS = ["#0088FE", "#FF8042"];
const COLORS_PCS = ["#00C49F", "#FFBB28", "#FF6666"];
const COLORS_STUDENTS = ["#7C3AED", "#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

const PieCharts = () => {
  const { pcs } = useContext(PcContext);
  const { labs } = useContext(LabContext);
  const { students } = useContext(StudentContext);

  const totalCapacity = labs.reduce((acc, lab) => acc + lab.capacity, 0);
  const totalAssigned = labs.reduce((acc, lab) => acc + lab.assigned, 0);
  const labData = [
    { name: "Used", value: totalAssigned },
    { name: "Remaining", value: totalCapacity - totalAssigned },
  ];

  const pcStatusData = [
    { name: "Available", value: pcs.filter((pc) => pc.status === "Available").length },
    { name: "Occupied", value: pcs.filter((pc) => pc.status === "Occupied").length },
    { name: "In-Repair", value: pcs.filter((pc) => pc.status === "in-Repair").length },
  ];

  const studentPerLab = labs.map((lab) => ({
    name: lab.name,
    value: students.filter((stu) => stu.labId === lab.id).length,
  }));

  return (
    <div className="bg-white rounded-xl shadow-md p-4 md:p-6 h-[200px] md:h-[300px] lg:h-[400px]">
      <h2 className="text-xl font-bold mb-4 md:mb-6 text-center">
        Overview: Labs, PCs & Students
      </h2>

      {/* Chart Container fills available height */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip />

          {/* Inner Pie: Labs */}
          <Pie
            data={labData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={70}
            label
          >
            {labData.map((entry, index) => (
              <Cell key={`lab-${index}`} fill={COLORS_LABS[index % COLORS_LABS.length]} />
            ))}
          </Pie>
          <text x="50%" y="50%" textAnchor="middle" dy={-80} className="fill-gray-700 text-xs md:text-sm">
            Labs
          </text>

          {/* Middle Pie: PCs */}
          <Pie
            data={pcStatusData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={90}
            outerRadius={120}
            label
          >
            {pcStatusData.map((entry, index) => (
              <Cell key={`pc-${index}`} fill={COLORS_PCS[index % COLORS_PCS.length]} />
            ))}
          </Pie>
          <text x="50%" y="50%" textAnchor="middle" dy={-130} className="fill-gray-700 text-xs md:text-sm">
            PCs
          </text>

          {/* Outer Pie: Students */}
          <Pie
            data={studentPerLab}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={140}
            outerRadius={180}
            label
          >
            {studentPerLab.map((entry, index) => (
              <Cell key={`student-${index}`} fill={COLORS_STUDENTS[index % COLORS_STUDENTS.length]} />
            ))}
          </Pie>
          <text x="50%" y="50%" textAnchor="middle" dy={-190} className="fill-gray-700 text-xs md:text-sm">
            Students
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>

  );
};

export default PieCharts;
