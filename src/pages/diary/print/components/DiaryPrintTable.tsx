import CheckBoxRow from "../../../../component/form/CheckBoxRow";
import type { DiaryPrint } from "../../../../types/diary/DiaryPrint";

interface Props {
    data: DiaryPrint[];
}

export default function DiaryPrintTable({data}: Props) {
    const allSelected = () => {
        console.log('모두 선택 버튼 호출됨');
    }

    const onCancel = () => {
        console.log('취소 버튼 눌림');
    }

    const handleSubmit = () => {
        console.log('선택완료 버튼 눌림');
    }

    return (
        <div>
            <div className="flex my-2 items-center text-sm gap-3">
                <button onClick={allSelected} className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">모두선택</button>
            </div>

            <div className="overflow-x-auto">
                <table className="table-auto w-full border text-sm">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border px-2 py-1">check</th>
                            <th className="border px-2 py-1">인쇄소</th>
                            <th className="border px-2 py-1">호수</th>
                            <th className="border px-2 py-1">모델명</th>
                            <th className="border px-2 py-1">총수량</th>
                            <th className="border px-2 py-1">인쇄지시일</th>
                            <th className="border px-2 py-1">출고일</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((s, idx) => (
                        <tr key={s.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="border px-2 py-1 text-center">
                                <CheckBoxRow />
                            </td>
                            <td className="border px-2 py-1">{s.printCompanyName}</td>
                            <td className="border px-2 py-1">{s.modelNum}</td>
                            <td className="border px-2 py-1">{s.modelName}</td>
                            <td className="border px-2 py-1">{s.amount}</td>
                            <td className="border px-2 py-1">{s.iDate}</td>
                            <td className="border px-2 py-1">출고일(?)</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="flex my-2 items-center text-sm gap-3">
                <button onClick={onCancel} className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">취소</button>
                <button onClick={handleSubmit} className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">선택완료</button>
            </div>

        </div>
    );
}