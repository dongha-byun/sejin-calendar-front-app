import CheckBoxRow from "../../../../component/form/CheckBoxRow";
import type { Order } from "../../../../types/ordermanager/Order";

interface Props {
    data: Order[];
}

export default function DiaryPrintCnTable({data}: Props) {

    const allSelected = () => {
        console.log('모두선택 버튼 눌림');
    }

    const deleteSelected = () => {
        console.log('선택삭제 버튼 눌림');
    }

    const onCancel = () => {
        console.log('취소 버튼 눌림');
    }

    const onComplete = () => {
        console.log('입력완료 버튼 눌림');
    }

    return (
        <div>
            <div className="flex my-2 items-center text-sm gap-3">
                <button onClick={allSelected} className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">모두선택</button>
                <button onClick={deleteSelected} className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">선택삭제</button>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border text-sm">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border px-2 py-1">check</th>
                            <th className="border px-2 py-1">접수번호</th>
                            <th className="border px-2 py-1">호수</th>
                            <th className="border px-2 py-1">부수</th>
                            <th className="border px-2 py-1">상호</th>
                            <th className="border px-2 py-1">도</th>
                            <th className="border px-2 py-1">주문인</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((s, idx) => (
                        <tr key={s.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="border px-2 py-1 text-center">
                                <CheckBoxRow />
                            </td>
                            <td className="border px-2 py-1">{s.orderNum}</td>
                            <td className="border px-2 py-1">{s.modelNum}</td>
                            <td className="border px-2 py-1">{s.amount}</td>
                            <td className="border px-2 py-1">{s.printCn}</td>
                            <td className="border px-2 py-1">{s.dosu}</td>
                            <td className="border px-2 py-1">{s.customerName}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="flex my-2 items-center text-sm gap-3">
                <button onClick={onCancel} className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">취소</button>
                <button onClick={onComplete} className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">입력완료</button>
            </div>

        </div>
    );
}