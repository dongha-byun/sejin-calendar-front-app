import ListCheckBox from "../../../../component/grid/ListCheckBox";
import type { DiaryBoxingOrder } from "../../../../types/diary/DiaryBoxing";

interface Props {
    data: DiaryBoxingOrder[];
    checkedIds: number[];
    onCheckId: (isChecked: boolean, id?: number) => void;
    deleteRows: (ids: number[]) => void;
    onInit: () => void;
    saveBoxing: () => void;
}

export default function DiaryPackagingTable({data, checkedIds, onCheckId, deleteRows, onInit, saveBoxing}: Props) {

    const allChecked = () => {
        data.forEach(s => {
            onCheckId(true, s.orderId);
        });
    }

    const deleteSelected = () => {
        deleteRows(checkedIds);
    }

    const onCancel = () => {
        onInit();
    }

    const onRefresh = () => {
        console.log('갱신 버튼 눌림');
    }

    const handleSubmit = () => {
        saveBoxing();
    }

    return (
        <div>
            <div className="flex my-2 items-center text-sm gap-3">
                <button onClick={allChecked} className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">모두선택</button>
                <button onClick={deleteSelected} className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">선택삭제</button>
            </div>

            <div className="overflow-x-auto">
                <table className="table-auto w-full border text-sm">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border px-2 py-1">check</th>
                            <th className="border px-2 py-1">접수번호</th>
                            <th className="border px-2 py-1">주문인</th>
                            <th className="border px-2 py-1">호수</th>
                            <th className="border px-2 py-1">모델명</th>
                            <th className="border px-2 py-1">보수</th>
                            <th className="border px-2 py-1">상호</th>
                            <th className="border px-2 py-1">Box 번호</th>
                            <th className="border px-2 py-1">Box 수</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((s, idx) => (
                        <tr key={s.orderId} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="border px-2 py-1 text-center">
                                <ListCheckBox 
                                    checked={checkedIds.includes(s.orderId)}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onCheckId(e.target.checked, s.orderId)} 
                                />
                            </td>
                            <td className="border px-2 py-1">{s.orderNum}</td>
                            <td className="border px-2 py-1">{s.customerName}</td>
                            <td className="border px-2 py-1">{s.modelNum}</td>
                            <td className="border px-2 py-1">{s.modelName}</td>
                            <td className="border px-2 py-1">{s.amount}</td>
                            <td className="border px-2 py-1">{s.printCn}</td>
                            <td className="border px-2 py-1">{s.realBox}</td>
                            <td className="border px-2 py-1">{s.realBoxCount}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="flex my-2 items-center text-sm gap-3">
                <button onClick={onCancel} className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">취소</button>
                <button onClick={onRefresh} className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">갱신</button>
                <button onClick={handleSubmit} className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">선택완료</button>
            </div>
        </div>
    );
}