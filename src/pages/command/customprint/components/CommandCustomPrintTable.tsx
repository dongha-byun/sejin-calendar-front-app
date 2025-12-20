import ListCheckBox from "../../../../component/grid/ListCheckBox";
import type { Order } from "../../../../types/ordermanager/Order";

interface Props {
  data: Order[];
  checkIds: number[];
  setCheckIds: (ids: number[]) => void;
}

export default function CommandCustomPrintTable({data, checkIds, setCheckIds} : Props) {
    const onCheckId = (isChecked: boolean, id?: number) => {
        if(!id) return;
        if(isChecked) {
            setCheckIds([...checkIds, id]);
        }
        else {
            setCheckIds(checkIds.filter((checkId) => checkId !== id));
        }
    }

    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full border text-sm">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border px-2 py-1">check</th>
                        <th className="border px-2 py-1">접수번호</th>
                        <th className="border px-2 py-1">주문인</th>
                        <th className="border px-2 py-1">호수</th>
                        <th className="border px-2 py-1">부수</th>
                        <th className="border px-2 py-1">상호</th>
                        <th className="border px-2 py-1">도</th>
                        <th className="border px-2 py-1">기타상황</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((s, idx) => (
                    <tr key={s.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border px-2 py-1">
                            <ListCheckBox
                                onChange={(e) => onCheckId(e.target.checked, s.id)}
                                checked={checkIds.includes(s.id ?? 0)}
                            />
                        </td>
                        <td className="border px-2 py-1">{s.orderNum}</td>
                        <td className="border px-2 py-1">{s.customerName}</td>
                        <td className="border px-2 py-1">{/* 호수 */}</td>
                        <td className="border px-2 py-1">{/* 부수 */}</td>
                        <td className="border px-2 py-1">{s.printCn}</td>
                        <td className="border px-2 py-1">{s.dosu}</td>
                        <td className="border px-2 py-1">{s.etc1}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div> 
    );
}