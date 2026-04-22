import { useEffect, useRef } from "react";
import type { MonitorOrderApiRow } from "../../../../types/monitor/MonitorOrder";
import { formatNumber, padDecimal } from "../../../../utils/numberUtils";

interface Props {
    data: MonitorOrderApiRow[];
    highlightOrderNum?: number;
}

const cell = (v: string | number | null | undefined) =>
    v === null || v === undefined ? "" : String(v);

export default function MonitorOrderTable({ data, highlightOrderNum }: Props) {
    const rowRefs = useRef<Map<number, HTMLTableRowElement>>(new Map());

    useEffect(() => {
        if (highlightOrderNum == null) return;
        rowRefs.current.get(highlightOrderNum)?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }, [highlightOrderNum]);

    return (
    <div className="overflow-x-auto h-[330px] overflow-y-auto bg-white">
            <table className="table-auto min-w-[1200px] border text-sm w-full border-spacing-0">
                <thead className="bg-gray-200 sticky top-0">
                    <tr>
                        <th className="border px-2 py-1 whitespace-nowrap">접수번호</th>
                        <th className="border px-2 py-1 whitespace-nowrap">주문인</th>
                        <th className="border px-2 py-1 whitespace-nowrap">모델</th>
                        <th className="border px-2 py-1 whitespace-nowrap">모델명</th>
                        <th className="border px-2 py-1 whitespace-nowrap">주문량</th>
                        <th className="border px-2 py-1 whitespace-nowrap">상호</th>
                        <th className="border px-2 py-1 whitespace-nowrap">도수</th>
                        <th className="border px-2 py-1 whitespace-nowrap">주문일자</th>
                        <th className="border px-2 py-1 whitespace-nowrap">단가</th>
                        <th className="border px-2 py-1 whitespace-nowrap">금액</th>
                        <th className="border px-2 py-1 whitespace-nowrap">납품방법</th>
                        <th className="border px-2 py-1 whitespace-nowrap">쇄입지시일</th>
                        <th className="border px-2 py-1 whitespace-nowrap">쇄입방법</th>
                        <th className="border px-2 py-1 whitespace-nowrap">쇄입완료일자</th>
                        <th className="border px-2 py-1 whitespace-nowrap">포장 날짜</th>
                        <th className="border px-2 py-1 whitespace-nowrap">box 번호</th>
                        <th className="border px-2 py-1 whitespace-nowrap">box 수량</th>
                        <th className="border px-2 py-1 whitespace-nowrap">출고증번호</th>
                        <th className="border px-2 py-1 whitespace-nowrap">출고일자</th>
                        <th className="border px-2 py-1 whitespace-nowrap">출고완료일자</th>
                        <th className="border px-2 py-1 whitespace-nowrap">상태</th>
                        <th className="border px-2 py-1 whitespace-nowrap">선방번호</th>
                        <th className="border px-2 py-1 whitespace-nowrap">비고1</th>
                        <th className="border px-2 py-1 whitespace-nowrap">비고2</th>
                        <th className="border px-2 py-1 whitespace-nowrap">비고3</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((s, idx) => (
                    <tr
                        key={s.id ?? `${s.orderNum}-${idx}`}
                        ref={(el) => { if (el) rowRefs.current.set(s.orderNum, el); else rowRefs.current.delete(s.orderNum); }}
                        className={s.orderNum === highlightOrderNum ? "bg-yellow-200" : idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                        <td className="border px-2 py-1 whitespace-nowrap">{s.orderNum}</td>
                        <td className="border px-2 py-1 whitespace-nowrap">{s.customerName}</td>
                        <td className="border px-2 py-1 whitespace-nowrap">{s.modelNum}</td>
                        <td className="border px-2 py-1 whitespace-nowrap">{s.modelName}</td>
                        <td className="border px-2 py-1 whitespace-nowrap">{padDecimal(formatNumber(s.amount))}</td>
                        <td className="border px-2 py-1 whitespace-nowrap">{s.printCn}</td>
                        <td className="border px-2 py-1 whitespace-nowrap">{s.dosu}</td>
                        <td className="border px-2 py-1 whitespace-nowrap">{cell(s.issueDate)}</td>
                        <td className="border px-2 py-1 whitespace-nowrap">{padDecimal(formatNumber(s.pricePer))}</td>
                        <td className="border px-2 py-1 whitespace-nowrap">{padDecimal(formatNumber(s.price))}</td>
                        <td className="border px-2 py-1 whitespace-nowrap">{s.deliveryMethod}</td>
                        <td className="border px-2 py-1 whitespace-nowrap">{cell(s.printDate)}</td>
                        <td className="border px-2 py-1 whitespace-nowrap">{cell(s.printMethod)}</td>
                        <td className="border px-2 py-1 whitespace-nowrap">{cell(s.printCompleteDate)}</td>
                        <td className="border px-2 py-1 whitespace-nowrap">{cell(s.boxDate)}</td>
                        <td className="border px-2 py-1 whitespace-nowrap">{cell(s.boxNum)}</td>
                        <td className="border px-2 py-1 whitespace-nowrap">{padDecimal(formatNumber(s.boxAmount))}</td>
                        <td className="border px-2 py-1 whitespace-nowrap">{cell(s.releaseNum)}</td>
                        <td className="border px-2 py-1 whitespace-nowrap">{cell(s.releaseDate)}</td>
                        <td className="border px-2 py-1 whitespace-nowrap">{cell(s.releaseCompleteDate)}</td>
                        <td className="border px-2 py-1 whitespace-nowrap">{cell(s.state)}</td>
                        <td className="border px-2 py-1 whitespace-nowrap">{s.shipNum}</td>
                        <td className="border px-2 py-1 whitespace-nowrap">{s.etc1}</td>
                        <td className="border px-2 py-1 whitespace-nowrap">{s.etc2}</td>
                        <td className="border px-2 py-1 whitespace-nowrap">{s.etc3}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}