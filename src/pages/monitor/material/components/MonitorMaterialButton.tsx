
export default function MonitorMaterialButton() {
    return (
        <div className="mt-6 flex flex-col items-center justify-center text-sm gap-3">
            <div>
                입고량 합계: <span className="text-blue-700 font-semibold mr-10">12</span> 
                사용량 합계: <span className="text-blue-700 font-semibold mr-10">144,495</span> 
                재고: <span className="text-red-600 font-semibold">-144,483</span>
            </div>
            <div className="flex gap-4">
                <button className="min-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">발주바로가기</button>
                <button className="min-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">초기화</button>
                <button className="min-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">인쇄 미리보기</button>
                <button className="min-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">인쇄</button>
            </div>
        </div>
  );
}