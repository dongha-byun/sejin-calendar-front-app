
export default function MonitorPaperButton() {
    return (
        <div className="mt-6 flex flex-col items-center justify-center text-sm gap-3">
            <div>
                용지입고량 합계: <span className="text-blue-700 font-semibold mr-10">12</span> 
                금액 합계: <span className="text-blue-700 font-semibold mr-10">144,495</span> 
                용지배송량 합계: <span className="text-red-600 font-semibold mr-10">-144,483</span>
                인쇄지시량 합계: <span className="text-red-600 font-semibold">-144,483</span>
            </div>
            <div className="justify-between">
                지업사 재고: <span className="text-blue-700 font-semibold mr-10">12</span> 
                인쇄소 재고: <span className="text-blue-700 font-semibold mr-10">12</span> 
            </div>
            <div className="flex gap-4">
                <button className="min-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">초기화</button>
                <button className="min-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">인쇄 미리보기</button>
                <button className="min-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">인쇄</button>
                <button className="min-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">종료</button>
            </div>
        </div>
  );
}