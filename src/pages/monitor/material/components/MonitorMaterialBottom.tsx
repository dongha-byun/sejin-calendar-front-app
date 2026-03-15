import { formatNumber } from "../../../../utils/numberUtils";

interface Props {
    totalPutinAmount: number;
    totalUsageAmount: number;
    currentUsableAmount: number;
    onPreviewPrintContent: () => void;
    onDoPrint: () => void;
    onInitForm: () => void;
    openMaterialOrderOut: () => void;
}

export default function MonitorMaterialBottom({ totalPutinAmount, totalUsageAmount, currentUsableAmount, onPreviewPrintContent, onDoPrint, onInitForm, openMaterialOrderOut }: Props) {
    const getAmountColorClass = (amount: number) => {
        if (amount < 0) return "text-red-600";
        if (amount > 0) return "text-blue-700";
        return "text-black";
    }
    return (
        <div className="mt-6 flex flex-col items-center justify-center text-sm gap-3">
            <div>
                {/* 예시: 기본 스타일 + colorClass를 함께 사용 */}
                입고량 합계: <span className={`font-semibold mr-10 ${getAmountColorClass(totalPutinAmount)}`}>{formatNumber(totalPutinAmount)}</span> 
                사용량 합계: <span className={`font-semibold mr-10 ${getAmountColorClass(totalUsageAmount)}`}>{formatNumber(totalUsageAmount)}</span> 
                재고: <span className={`font-semibold ${getAmountColorClass(currentUsableAmount)}`}>{formatNumber(currentUsableAmount)}</span>
            </div>
            <div className="flex gap-4">
                <button className="min-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400" onClick={openMaterialOrderOut}>발주바로가기</button>
                <button className="min-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400" onClick={onInitForm}>초기화</button>
                <button className="min-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400" onClick={onPreviewPrintContent}>인쇄 미리보기</button>
                <button className="min-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400" onClick={onDoPrint}>인쇄</button>
            </div>
        </div>
  );
}