
export default function MonitorModelButton() {
    return (
        <div className="mt-6 flex flex-col items-center justify-center text-sm gap-3">
            <div className="flex gap-4">
                <button className="min-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">초기화</button>
                <button className="min-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">인쇄 미리보기</button>
                <button className="min-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">인쇄</button>
                <button className="min-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">종료</button>
            </div>
        </div>
  );
}