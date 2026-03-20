interface Props {
    onPreviewPrintContent: () => void;
    onDoPrint: () => void;
    onInit: () => void;
}

export default function MonitorModelButton({ onPreviewPrintContent, onDoPrint, onInit }: Props) {
    return (
        <div className="mt-6 flex flex-col items-center justify-center text-sm gap-3">
            <div className="flex gap-4">
                <button className="min-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400" onClick={onInit}>초기화</button>
                <button className="min-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400" onClick={onPreviewPrintContent}>인쇄 미리보기</button>
                <button className="min-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400" onClick={onDoPrint}>인쇄</button>
            </div>
        </div>
  );
}