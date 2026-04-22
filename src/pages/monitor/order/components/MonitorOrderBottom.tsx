import { useState } from "react";
import type {
    MonitorOrdersStatisticData,
    MonitorOrderHistoryBlock,
    MonitorPrintHistoryItem,
    MonitorMachineHistoryItem,
    MonitorBindHistoryItem,
} from "../../../../types/monitor/MonitorOrder";
import { formatNumber } from "../../../../utils/numberUtils";

interface Props {
    statistic: MonitorOrdersStatisticData;
    printHistory: MonitorOrderHistoryBlock<MonitorPrintHistoryItem>;
    machineHistory: MonitorOrderHistoryBlock<MonitorMachineHistoryItem>;
    bindHistory: MonitorOrderHistoryBlock<MonitorBindHistoryItem>;
}

export default function MonitorOrderBottom({ statistic, printHistory, machineHistory, bindHistory }: Props) {
    const [printDetail, setPrintDetail] = useState(false);
    const [machineDetail, setMachineDetail] = useState(false);
    const [bindDetail, setBindDetail] = useState(false);

    const fmt = (n: number) => formatNumber(n);

    return (
        <div className="border-t border-gray-300 p-2 bg-gray-50">
            <div className="flex flex-wrap gap-4 text-sm mb-2">
                <span>접수: <span className="text-blue-700 font-semibold">{fmt(statistic.totalOrder)}</span></span>
                <span>출고: <span className="text-blue-700 font-semibold">{fmt(statistic.totalRelease)}</span></span>
                <span>견본: <span className="text-blue-700 font-semibold">{fmt(statistic.totalSample)}</span></span>
                <span>미출고: <span className="text-red-600 font-semibold">{fmt(statistic.notRelease)}</span></span>
                <span>실제고(인쇄): <span className="text-red-600 font-semibold">{fmt(statistic.printQuantity)}</span></span>
                <span>실제고(제본): <span className="text-red-600 font-semibold">{fmt(statistic.bindQuantity)}</span></span>
                <span>접수가능량(정합): <span className="text-red-600 font-semibold">{fmt(statistic.acceptableMachine)}</span></span>
                <span>접수가능량(제본): <span className="text-red-600 font-semibold">{fmt(statistic.acceptableBind)}</span></span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
                {/* 인쇄 */}
                <div className="border p-1 flex flex-col">
                    <div className="flex justify-between items-center mb-1">
                        <span>인쇄</span>
                        <label className="flex items-center gap-1 text-[11px]">
                            <input
                                type="checkbox"
                                checked={printDetail}
                                onChange={(e) => setPrintDetail(e.target.checked)}
                            />
                            상세보기
                        </label>
                    </div>
                    <div className="border h-28 overflow-y-auto">
                        <table className="w-full text-center border-collapse">
                            <thead className="sticky top-0 bg-gray-100">
                                <tr>
                                    <th className="border px-1">수량</th>
                                    <th className="border px-1">날짜</th>
                                    <th className="border px-1">인쇄소</th>
                                </tr>
                            </thead>
                            <tbody>
                                {printHistory.list.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="border py-2 text-gray-400">데이터 없음</td>
                                    </tr>
                                ) : (
                                    printHistory.list.map((item, idx) => (
                                        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                            <td className="border px-1">{fmt(item.amount)}</td>
                                            <td className="border px-1">{item.iDate}</td>
                                            <td className="border px-1">{printDetail ? item.printCompanyName : item.printCompanyName}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="text-[11px] mt-1">인쇄합계: {fmt(printHistory.totalAmount)}</div>
                </div>

                {/* 정합 */}
                <div className="border p-1 flex flex-col">
                    <div className="flex justify-between items-center mb-1">
                        <span>정합</span>
                        <label className="flex items-center gap-1 text-[11px]">
                            <input
                                type="checkbox"
                                checked={machineDetail}
                                onChange={(e) => setMachineDetail(e.target.checked)}
                            />
                            상세보기
                        </label>
                    </div>
                    <div className="border h-28 overflow-y-auto">
                        <table className="w-full text-center border-collapse">
                            <thead className="sticky top-0 bg-gray-100">
                                <tr>
                                    <th className="border px-1">수량</th>
                                    <th className="border px-1">상호</th>
                                    <th className="border px-1">날짜</th>
                                    {machineDetail && <th className="border px-1">비고</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {machineHistory.list.length === 0 ? (
                                    <tr>
                                        <td colSpan={machineDetail ? 4 : 3} className="border py-2 text-gray-400">데이터 없음</td>
                                    </tr>
                                ) : (
                                    machineHistory.list.map((item, idx) => (
                                        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                            <td className="border px-1">{fmt(item.amount)}</td>
                                            <td className="border px-1">{item.printCn}</td>
                                            <td className="border px-1">{item.iDate}</td>
                                            {machineDetail && <td className="border px-1"></td>}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="text-[11px] mt-1">정합합계: {fmt(machineHistory.totalAmount)}</div>
                </div>

                {/* 제본 */}
                <div className="border p-1 flex flex-col">
                    <div className="flex justify-between items-center mb-1">
                        <span>제본</span>
                        <label className="flex items-center gap-1 text-[11px]">
                            <input
                                type="checkbox"
                                checked={bindDetail}
                                onChange={(e) => setBindDetail(e.target.checked)}
                            />
                            상세보기
                        </label>
                    </div>
                    <div className="border h-28 overflow-y-auto">
                        <table className="w-full text-center border-collapse">
                            <thead className="sticky top-0 bg-gray-100">
                                <tr>
                                    <th className="border px-1">수량</th>
                                    <th className="border px-1">상호</th>
                                    <th className="border px-1">날짜</th>
                                    {bindDetail && <th className="border px-1">비고</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {bindHistory.list.length === 0 ? (
                                    <tr>
                                        <td colSpan={bindDetail ? 4 : 3} className="border py-2 text-gray-400">데이터 없음</td>
                                    </tr>
                                ) : (
                                    bindHistory.list.map((item, idx) => (
                                        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                            <td className="border px-1">{fmt(item.amount)}</td>
                                            <td className="border px-1">{item.printCn}</td>
                                            <td className="border px-1">{item.iDate}</td>
                                            {bindDetail && <td className="border px-1"></td>}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="text-[11px] mt-1">제본합계: {fmt(bindHistory.totalAmount)}</div>
                </div>
            </div>
        </div>
    );
}
