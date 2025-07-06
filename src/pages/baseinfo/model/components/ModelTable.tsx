import type { Model } from "../../../../types/baseinfo/Model";

interface Props {
  data: Model[];
}

export default function ModelTable({ data }: Props) {

    return (
    <div className="overflow-x-auto">
        <table className="table-auto w-full border text-sm">
            <thead className="bg-gray-200">
                <tr>
                    <th className="border px-2 py-1">모델</th>
                    <th className="border px-2 py-1">모델명</th>
                    <th className="border px-2 py-1">가로</th>
                    <th className="border px-2 py-1">세로</th>
                    <th className="border px-2 py-1">규격(inch)</th>
                    <th className="border px-2 py-1">매수</th>
                    <th className="border px-2 py-1">국내가</th>
                    <th className="border px-2 py-1">해외A1가</th>
                    <th className="border px-2 py-1">해외A2가</th>
                    <th className="border px-2 py-1">해외B가</th>
                    <th className="border px-2 py-1">용지무게(표)</th>
                    <th className="border px-2 py-1">용지지질(표)</th>
                    <th className="border px-2 py-1">용지규격(표)</th>
                    <th className="border px-2 py-1">부당용지소요량(표)</th>
                    <th className="border px-2 py-1">소부(표)</th>
                    <th className="border px-2 py-1">도수(표)</th>
                    <th className="border px-2 py-1">용지무게(내)</th>
                    <th className="border px-2 py-1">용지지질(내)</th>
                    <th className="border px-2 py-1">용지규격(내)</th>
                    <th className="border px-2 py-1">부당용지소요량(내)</th>
                    <th className="border px-2 py-1">소부(내)</th>
                    <th className="border px-2 py-1">도수(내)</th>
                    <th className="border px-2 py-1">제본방식</th>
                    <th className="border px-2 py-1">제본단가</th>
                    <th className="border px-2 py-1">상호규격(cm)</th>
                    <th className="border px-2 py-1">상호규격(inch)</th>
                    <th className="border px-2 py-1">BOX</th>
                    <th className="border px-2 py-1">부수/box</th>
                    <th className="border px-2 py-1">쇄입방법</th>
                </tr>
            </thead>
            <tbody>
            {data.map((s, idx) => (
                <tr key={s.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border px-2 py-1 text-center">{s.id}</td>
                    <td className="border px-2 py-1">{s.modelNum}</td>
                    <td className="border px-2 py-1">{s.modelName}</td>
                    <td className="border px-2 py-1">{s.width}</td>
                    <td className="border px-2 py-1">{s.height}</td>
                    <td className="border px-2 py-1">{s.standardInch}</td>
                    <td className="border px-2 py-1 text-right">{s.pages}</td>
                    <td className="border px-2 py-1 text-right">{s.priceInternal}</td>
                    <td className="border px-2 py-1 text-right">{s.priceExternalA1}</td>
                    <td className="border px-2 py-1 text-right">{s.priceExternalA2}</td>
                    <td className="border px-2 py-1 text-right">{s.priceExternalB}</td>
                    <td className="border px-2 py-1">{s.coverWeight}</td>
                    <td className="border px-2 py-1">{s.coverProperties}</td>
                    <td className="border px-2 py-1">{s.coverStandard}</td>
                    <td className="border px-2 py-1 text-right">{s.coverRequirePaper}</td>
                    <td className="border px-2 py-1 text-right">{s.coverSobu}</td>
                    <td className="border px-2 py-1 text-right">{s.coverDosu}</td>
                    <td className="border px-2 py-1">{s.innerWeight}</td>
                    <td className="border px-2 py-1">{s.innerProperties}</td>
                    <td className="border px-2 py-1">{s.innerStandard}</td>
                    <td className="border px-2 py-1 text-right">{s.innerRequirePaper}</td>
                    <td className="border px-2 py-1 text-right">{s.innerSobu}</td>
                    <td className="border px-2 py-1 text-right">{s.innerDosu}</td>
                    <td className="border px-2 py-1">{s.bindMethod}</td>
                    <td className="border px-2 py-1 text-right">{s.pricePerBinding}</td>
                    <td className="border px-2 py-1">{s.companyNameCm}</td>
                    <td className="border px-2 py-1">{s.companyNameInch}</td>
                    <td className="border px-2 py-1">{s.box}</td>
                    <td className="border px-2 py-1 text-right">{s.countPerBox}</td>
                    <td className="border px-2 py-1">{s.printMethod}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
    );
}