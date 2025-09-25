import { useContext } from "react";
import { LabContext } from "../context/LabContextProvider";
import { PcContext } from "../context/PcContextProvider";
import { StudentContext } from "../context/StudentContextProvider";

const LabPcStudentTable = () => {
  const { labs } = useContext(LabContext);
  const { pcs } = useContext(PcContext);
  const { students } = useContext(StudentContext);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 md:p-6 w-full h-[200px] md:h-[300px] lg:h-[400px] overflow-auto">
      <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4 text-center">
        Labs, PCs & Students
      </h2>
      <div className="min-w-full overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm md:text-base">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="border px-2 md:px-4 py-1 md:py-2 text-left">Lab Name</th>
              <th className="border px-2 md:px-4 py-1 md:py-2 text-left">PC Name</th>
              <th className="border px-2 md:px-4 py-1 md:py-2 text-left">PC Status</th>
              <th className="border px-2 md:px-4 py-1 md:py-2 text-left">Student Name</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {labs.map((lab) => {
              const labPcs = pcs.filter((pc) => pc.labId === lab.id);

              return labPcs.length > 0 ? (
                labPcs.map((pc, pcIndex) => {
                  const pcStudents = students.filter((stu) => stu.pcId === pc.pcId);

                  return pcStudents.length > 0 ? (
                    pcStudents.map((stu, stuIndex) => (
                      <tr
                        key={`${lab.id}-${pc.pcId}-${stu.studentId}`}
                        className={pcIndex % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
                      >
                        {stuIndex === 0 && pcIndex === 0 && (
                          <td
                            rowSpan={labPcs.reduce(
                              (acc, p) =>
                                acc +
                                Math.max(1, students.filter((s) => s.pcId === p.pcId).length),
                              0
                            )}
                            className="border px-2 md:px-4 py-1 md:py-2 font-semibold"
                          >
                            {lab.name}
                          </td>
                        )}
                        {stuIndex === 0 && (
                          <td
                            rowSpan={pcStudents.length}
                            className="border px-2 md:px-4 py-1 md:py-2 font-medium"
                          >
                            {pc.name}
                          </td>
                        )}
                        <td className="border px-2 md:px-4 py-1 md:py-2">{pc.status}</td>
                        <td className="border px-2 md:px-4 py-1 md:py-2">{stu.name}</td>
                      </tr>
                    ))
                  ) : (
                    <tr key={`${lab.id}-${pc.pcId}`} className={pcIndex % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                      {pcIndex === 0 && (
                        <td
                          rowSpan={labPcs.length}
                          className="border px-2 md:px-4 py-1 md:py-2 font-semibold"
                        >
                          {lab.name}
                        </td>
                      )}
                      <td className="border px-2 md:px-4 py-1 md:py-2 font-medium">{pc.name}</td>
                      <td className="border px-2 md:px-4 py-1 md:py-2">{pc.status}</td>
                      <td className="border px-2 md:px-4 py-1 md:py-2">-</td>
                    </tr>
                  );
                })
              ) : (
                <tr key={lab.id} className="bg-gray-50">
                  <td className="border px-2 md:px-4 py-1 md:py-2 font-semibold">{lab.name}</td>
                  <td className="border px-2 md:px-4 py-1 md:py-2">-</td>
                  <td className="border px-2 md:px-4 py-1 md:py-2">-</td>
                  <td className="border px-2 md:px-4 py-1 md:py-2">-</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LabPcStudentTable;
