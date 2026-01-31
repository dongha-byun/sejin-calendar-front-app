import ListCheckBox from "../../../../component/grid/ListCheckBox";
import type { Order } from "../../../../types/ordermanager/Order";

interface Props {
    data: Order[];
    checkedIds: number[];
    onCheckId: (isChecked: boolean, id?: number) => void;
    deleteRows: (ids: number[]) => void;
    onInit: () => void;
    completePrint: () => void;
}

export default function DiaryPrintCnTable({data, checkedIds, onCheckId, deleteRows, onInit, completePrint}: Props) {

    const allChecked = () => {
        data.forEach(s => {
            onCheckId(true, s.id);
        });
    }

    const deleteChecked = () => {
        deleteRows(checkedIds);
    }

    const onCancel = () => {
        onInit();
    }

    const onComplete = () => {
        completePrint();
    }

    return (
        <div>
            <div className="flex my-2 items-center text-sm gap-3">
                <button onClick={allChecked} className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">모두선택</button>
                <button onClick={deleteChecked} className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">선택삭제</button>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-[75vw] border text-sm">
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
                                <div className="flex items-center justify-center">
                                    <ListCheckBox
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onCheckId(e.target.checked, s.id)}
                                        checked={checkedIds.includes(s.id ?? 0)}
                                    />
                                </div>
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