
export default function MonitorOrderBottom() {
  return (
    <div className="border-t border-gray-300 p-2 bg-gray-50">
      {/* 상단 합계 영역 */}
      <div className="flex flex-wrap gap-4 text-sm mb-2">
        <span>접수: <span className="text-blue-700 font-semibold">755,459</span></span>
        <span>출고: <span className="text-blue-700 font-semibold">467,236</span></span>
        <span>견본: <span className="text-blue-700 font-semibold">0</span></span>
        <span>미출고: <span className="text-red-600 font-semibold">288,223</span></span>
        <span>실제고(인쇄): <span className="text-red-600 font-semibold">0</span></span>
        <span>실제고(제본): <span className="text-red-600 font-semibold">0</span></span>
        <span>접수가능량(정합): <span className="text-red-600 font-semibold">0</span></span>
        <span>접수가능량(제본): <span className="text-red-600 font-semibold">0</span></span>
      </div>

      {/* 하단 4컬럼 영역 */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        {/* 인쇄 */}
        <div className="border p-1 flex flex-col">
          <div className="flex justify-between items-center mb-1">
            <span>인쇄</span>
            <label className="flex items-center gap-1 text-[11px]">
              <input type="checkbox" /> 상세보기
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
                <tr>
                  <td colSpan={3} className="border py-2 text-gray-400">데이터 없음</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-[11px] mt-1">인쇄합계: 0</div>
        </div>

        {/* 정합 */}
        <div className="border p-1 flex flex-col">
          <div className="flex justify-between items-center mb-1">
            <span>정합</span>
            <label className="flex items-center gap-1 text-[11px]">
              <input type="checkbox" /> 상세보기
            </label>
          </div>
          <div className="border h-28 overflow-y-auto">
            <table className="w-full text-center border-collapse">
              <thead className="sticky top-0 bg-gray-100">
                <tr>
                  <th className="border px-1">수량</th>
                  <th className="border px-1">상호</th>
                  <th className="border px-1">날짜</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={3} className="border py-2 text-gray-400">데이터 없음</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-[11px] mt-1">정합합계: 0</div>
        </div>

        {/* 제본 */}
        <div className="border p-1 flex flex-col">
          <div className="flex justify-between items-center mb-1">
            <span>제본</span>
            <label className="flex items-center gap-1 text-[11px]">
              <input type="checkbox" /> 상세보기
            </label>
          </div>
          <div className="border h-28 overflow-y-auto">
            <table className="w-full text-center border-collapse">
              <thead className="sticky top-0 bg-gray-100">
                <tr>
                  <th className="border px-1">수량</th>
                  <th className="border px-1">상호</th>
                  <th className="border px-1">날짜</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={3} className="border py-2 text-gray-400">데이터 없음</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-[11px] mt-1">제본합계: 0</div>
        </div>

        {/* 버튼 영역 */}
        {/* <div className="border p-1 flex flex-col justify-end">
          <div className="flex justify-end">
            <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs">
              종료
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}
