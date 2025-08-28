import type { PutinPaperDto } from "../../../../types/putin/PutinPaper";
import { formatNumber, padDecimal } from "../../../../utils/numberUtils";

interface Props {
  data: PutinPaperDto[];
}

export default function PutinPaperTable({ data }: Props) {
    console.log(data);
    return (
    <div className="overflow-x-auto">
        <table className="table-auto w-full border text-sm">
            <thead className="bg-gray-200">
                <tr>
                    <th className="border px-2 py-1">지업사명</th>
                    <th className="border px-2 py-1">무게</th>
                    <th className="border px-2 py-1">지질</th>
                    <th className="border px-2 py-1">규격</th>
                    <th className="border px-2 py-1">수량</th>
                    <th className="border px-2 py-1">단가</th>
                    <th className="border px-2 py-1">금액</th>
                    <th className="border px-2 py-1">입고일자</th>
                    <th className="border px-2 py-1">결재</th>
                    <th className="border px-2 py-1">비고</th>
                </tr>
            </thead>
            <tbody>
            {data.map((s, idx) => (
                <tr key={s.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border px-2 py-1">{s.companyName}</td>
                    <td className="border px-2 py-1">{s.weight}</td>
                    <td className="border px-2 py-1">{s.properties}</td>
                    <td className="border px-2 py-1">{s.standard}</td>
                    <td className="border px-2 py-1 text-right">{padDecimal(formatNumber(s.amount))}</td>
                    <td className="border px-2 py-1 text-right">{padDecimal(formatNumber(s.pricePer))}</td>
                    <td className="border px-2 py-1 text-right">{padDecimal(formatNumber(s.price))}</td>
                    <td className="border px-2 py-1 text-right">{s.issueDate}</td>
                    <td className="border px-2 py-1">{s.approval}</td>
                    <td className="border px-2 py-1">{s.etc}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div> 
    );
}