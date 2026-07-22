import type { PaperStockStatistics } from "../../../../types/monitor/MonitorPaperStockResponse";

interface Props {
    statistics: PaperStockStatistics | undefined;
    onInit: () => void;
}

export default function MonitorPaperButton({ statistics, onInit }: Props) {
    const fmt = (n: number | undefined) => (n ?? 0).toLocaleString();
    const color = (n: number | undefined) => (n ?? 0) < 0 ? "text-red-600 font-semibold" : "text-blue-700 font-semibold";

    return (
        <div className="mt-6 flex flex-col items-center justify-center text-sm gap-3">
            <div>
                용지입고량 합계: <span className={`${color(statistics?.totalPutin)} mr-10`}>{fmt(statistics?.totalPutin)}</span>
                금액 합계: <span className={`${color(statistics?.totalPrice)} mr-10`}>{fmt(statistics?.totalPrice)}</span>
                용지배송량 합계: <span className={`${color(statistics?.totalDelivery)} mr-10`}>{fmt(statistics?.totalDelivery)}</span>
                인쇄지시량 합계: <span className={color(statistics?.totalPrint)}>{fmt(statistics?.totalPrint)}</span>
            </div>
            <div>
                지업사 재고: <span className={`${color(statistics?.paperCompanyStocks)} mr-10`}>{fmt(statistics?.paperCompanyStocks)}</span>
                인쇄소 재고: <span className={`${color(statistics?.printCompanyStocks)} mr-10`}>{fmt(statistics?.printCompanyStocks)}</span>
            </div>
            <div className="flex gap-4">
                <button onClick={onInit} className="min-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">초기화</button>
                <button onClick={() => alert("[인쇄 미리보기] 준비중 입니다.")} className="min-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">인쇄 미리보기</button>
                <button onClick={() => alert("[인쇄] 준비중 입니다.")} className="min-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">인쇄</button>
            </div>
        </div>
    );
}
