import { useEffect, useRef } from "react";
import ListCheckBox from "../../../../component/grid/ListCheckBox";
import type { CommandOrderOutSearchDto } from "../../../../types/command/CommandOrderOut";

interface Props {
  data: CommandOrderOutSearchDto[];
  checkIds: number[];
  setCheckIds: (ids: number[]) => void;
  scrollToOrderNum?: number | null;
}

export default function CommandOrderOutTable({data, checkIds, setCheckIds, scrollToOrderNum} : Props) {
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const rowRefs = useRef<Map<number, HTMLTableRowElement>>(new Map());

    const onCheckId = (isChecked: boolean, id?: number) => {
        if(!id) return;
        if(isChecked) {
            setCheckIds([...checkIds, id]);
        }
        else {
            setCheckIds(checkIds.filter((checkId) => checkId !== id));
        }
    }

    // 접수번호로 스크롤 처리 (테이블 컨테이너 내에서만)
    useEffect(() => {
        if (scrollToOrderNum !== null && scrollToOrderNum !== undefined && tableContainerRef.current) {
            const targetOrder = data.find(order => order.orderNum === scrollToOrderNum && order.isVisible);
            if (targetOrder && targetOrder.id) {
                const rowElement = rowRefs.current.get(targetOrder.id);
                const container = tableContainerRef.current;
                
                if (rowElement && container) {
                    // 약간의 지연을 두어 DOM 업데이트 후 스크롤
                    setTimeout(() => {
                        // 컨테이너의 현재 스크롤 위치와 행의 위치 계산
                        const containerRect = container.getBoundingClientRect();
                        const rowRect = rowElement.getBoundingClientRect();
                        
                        // 컨테이너 내에서의 상대적 위치 계산
                        const scrollTop = container.scrollTop;
                        const rowTop = rowRect.top - containerRect.top + scrollTop;
                        
                        // 행을 컨테이너 중앙에 위치시키기 위한 스크롤 위치 계산
                        const targetScrollTop = rowTop - (container.clientHeight / 2) + (rowRect.height / 2);
                        
                        // 부드러운 스크롤
                        container.scrollTo({
                            top: targetScrollTop,
                            behavior: 'smooth'
                        });
                    }, 100);
                }
            }
        }
    }, [scrollToOrderNum, data]);

    const setRowRef = (id: number | undefined, element: HTMLTableRowElement | null) => {
        if (id && element) {
            rowRefs.current.set(id, element);
        }
    };

    return (
        <div ref={tableContainerRef} className="overflow-x-auto h-[400px] overflow-y-auto w-[75vw]">
            <table className="table-auto border text-sm  w-[75vw]">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border px-2 py-1 w-16">check</th>
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
                    <tr 
                        key={s.id} 
                        ref={(el) => setRowRef(s.id, el)}
                        className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"} 
                        style={s.isVisible ? {} : { display: 'none' }} 
                    >
                        <td className="border px-2 py-1 text-center">
                            <ListCheckBox
                                onChange={(e) => onCheckId(e.target.checked, s.id ?? 0)}
                                checked={checkIds.includes(s.id ?? 0)}
                            />
                        </td>
                        <td className="border px-2 py-1">{s.orderNum}</td>
                        <td className="border px-2 py-1">{s.customerName}</td>
                        <td className="border px-2 py-1">{s.modelNum}</td>
                        <td className="border px-2 py-1">{s.amount}</td>
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