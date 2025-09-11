import type { OrderCancelSearch } from "../../../../types/ordermanager/OrderCancelSearch";

interface Props {
    data: OrderCancelSearch[];
}

export default function OrderManagerCancelTable ({ data }: Props) {

    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full border text-sm">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border px-2 py-1">check</th>
                        <th className="border px-2 py-1">접수번호</th>
                        <th className="border px-2 py-1">주문인</th>
                        <th className="border px-2 py-1">호수</th>
                        <th className="border px-2 py-1">주문량</th>
                        <th className="border px-2 py-1">상호</th>
                        <th className="border px-2 py-1">state</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((s, idx) => (
                    <tr key={s.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border px-2 py-1">
                            <input type="checkbox"
                                className="form-checkbox transition duration-150 ease-in-out items-center"/>
                        </td>
                        <td className="border px-2 py-1">{s.orderNum}</td>
                        <td className="border px-2 py-1">{s.customerName}</td>
                        <td className="border px-2 py-1">{s.modelNum}</td>
                        <td className="border px-2 py-1">{s.amount}</td>
                        <td className="border px-2 py-1">{s.printCn}</td>
                        <td className="border px-2 py-1">state</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div> 
    );
}