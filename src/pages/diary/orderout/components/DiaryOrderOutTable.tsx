import ListCheckBox from "../../../../component/grid/ListCheckBox";
import type { DiaryOrderOutOrder } from "../../../../types/diary/DiaryOrderOut";

interface Props {
    data: DiaryOrderOutOrder[];
    checkedIds: number[];
    onCheckId: (isChecked: boolean, id?: number) => void;
    deleteSelected: () => void;
    initForm: () => void;
}

const notExistsReleaseNumStyle = "bg-pink-500";
const canReleaseStyle = "bg-yellow-300";

export default function DiaryOrderOutTable({data, checkedIds, onCheckId, deleteSelected, initForm}: Props) {

    const allSelected = () => {
        data.forEach(s => {
                console.log(s, s.releaseNum);
                if(s.releaseNum) {
                    onCheckId(true, s.orderId);
                }
            });
    }

    const allDeleted = () => {
        deleteSelected();
    }

    const onCancel = () => {
        initForm();
    }

    const handleSubmit = () => {
        console.log('입력완료 버튼 눌림');
    }

    return (
        <div>
            <div className="flex my-2 items-center text-sm gap-3">

                <div className="flex gap-3 items-center">
                    <button onClick={allSelected} className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">모두선택</button>
                    <button onClick={allDeleted} className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">선택삭제</button>
                </div>
                <div className="w-12" />
                <div className="flex gap-3 items-center">
                    
                    <div className="flex items-center">
                        <span className={`${notExistsReleaseNumStyle} px-3 py-1 rounded w-4 h-4`}></span>
                        <span className="ml-2">출고증발행안됨</span>
                    </div>
                    <div className="flex items-center">
                        <span className={`${canReleaseStyle} px-3 py-1 rounded w-4 h-4`}></span>
                        <span className="ml-2">제품출고가능</span>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table-auto w-[75vw] border text-sm">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border px-2 py-1">check</th>
                            <th className="border px-2 py-1">접수번호</th>
                            <th className="border px-2 py-1">주문인</th>
                            <th className="border px-2 py-1">호수</th>
                            <th className="border px-2 py-1">주문량</th>
                            <th className="border px-2 py-1">출고량</th>
                            <th className="border px-2 py-1">상호</th>
                            <th className="border px-2 py-1">출고증 #</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((s) => (
                        <tr key={s.orderId} className={s.releaseNum ? canReleaseStyle : notExistsReleaseNumStyle}>
                            <td className="border px-2 py-1 text-center">
                                {s.releaseNum && (
                                    <ListCheckBox
                                        checked={checkedIds.includes(s.orderId)}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onCheckId(e.target.checked, s.orderId)} 
                                    />
                                )}
                            </td>
                            <td className="border px-2 py-1">{s.orderNum}</td>
                            <td className="border px-2 py-1">{s.customerName}</td>
                            <td className="border px-2 py-1">{s.modelNum}</td>
                            <td className="border px-2 py-1">{s.amount}</td>
                            <td className="border px-2 py-1">{s.totalReleasedAmount}</td>
                            <td className="border px-2 py-1">{s.printCn}</td>
                            <td className="border px-2 py-1">{s.releaseNum}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="flex my-2 items-center text-sm gap-3">
                <button onClick={onCancel} className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">취소</button>
                <button onClick={handleSubmit} className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">입력완료</button>
            </div>
        </div>
    );
}