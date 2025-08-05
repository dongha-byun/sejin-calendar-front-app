import type { Order } from "../../../../types/ordermanager/Order";

interface Props {
    data: Order[];
}

export default function OrderManagerAcceptTable({ data }: Props) {
    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full border text-sm">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border px-2 py-1">번호</th>
                        <th className="border px-2 py-1">접수번호</th>
                        <th className="border px-2 py-1">주문인</th>
                        <th className="border px-2 py-1">모델</th>
                        <th className="border px-2 py-1">모델명</th>
                        <th className="border px-2 py-1">주문량</th>
                        <th className="border px-2 py-1">상호</th>
                        <th className="border px-2 py-1">도수</th>
                        <th className="border px-2 py-1">주문일자</th>
                        <th className="border px-2 py-1">단가</th>
                        <th className="border px-2 py-1">금액</th>
                        <th className="border px-2 py-1">납품방법</th>
                        <th className="border px-2 py-1">선방번호</th>
                        <th className="border px-2 py-1">비고1</th>
                        <th className="border px-2 py-1">비고2</th>
                        <th className="border px-2 py-1">비고3</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((s, idx) => (
                    <tr key={s.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border px-2 py-1">{s.id}</td>
                        <td className="border px-2 py-1">{s.orderNum}</td>
                        <td className="border px-2 py-1">{s.customerName}</td>
                        <td className="border px-2 py-1">{s.modelNum}</td>
                        <td className="border px-2 py-1">{s.modelName}</td>
                        <td className="border px-2 py-1">{s.amount}</td>
                        <td className="border px-2 py-1">{s.printCn}</td>
                        <td className="border px-2 py-1">{s.dosu}</td>
                        <td className="border px-2 py-1">{s.iDate}</td>
                        <td className="border px-2 py-1">{s.pricePer}</td>
                        <td className="border px-2 py-1">{s.price}</td>
                        <td className="border px-2 py-1">{s.deliveryMethod}</td>
                        <td className="border px-2 py-1">{s.shipNum}</td>
                        <td className="border px-2 py-1">{s.etc1}</td>
                        <td className="border px-2 py-1">{s.etc2}</td>
                        <td className="border px-2 py-1">{s.etc3}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div> 
    );
}