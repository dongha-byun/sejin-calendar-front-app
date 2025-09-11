import type { OrderCancelSearch } from "../../../../types/ordermanager/OrderCancelSearch";

interface Props {
    data: OrderCancelSearch[];
}

export default function OrderManagerCancelTable ({ data }: Props) {

    return (
        <div className="overflow-y-auto h-[400px] w-[1100px]">
            <table className="table-auto border text-sm">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border px-2 py-1 w-[40px]">Check</th>
                        <th className="border px-2 py-1 w-[100px]">접수번호</th>
                        <th className="border px-2 py-1 w-[150px]">주문인</th>
                        <th className="border px-2 py-1 w-[100px]">호수</th>
                        <th className="border px-2 py-1 w-[100px]">주문량</th>
                        <th className="border px-2 py-1 w-[490px]">상호</th>
                        <th className="border px-2 py-1 w-[100px]">state</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((s, idx) => (
                    <tr key={s.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border px-2 py-1 text-center">
                            <input type="checkbox"
                                className="form-checkbox transition duration-150 ease-in-out items-center"/>
                        </td>
                        <td className="border px-2 py-1">{s.orderNum}</td>
                        <td className="border px-2 py-1">{s.customerName}</td>
                        <td className="border px-2 py-1">{s.modelNum}</td>
                        <td className="border px-2 py-1">{s.amount}</td>
                        <td className="border px-2 py-1">{s.printCn}</td>
                        <td className="border px-2 py-1">{s.state}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div> 
    );
}