
interface Props {
    nextReleaseNum: number;
    alignReleaseNum: () => void;
}

export default function CommandOrderOutBottom({ nextReleaseNum, alignReleaseNum }: Props) {
    return (
        <div className="grid grid-cols-4 gap-4 p-4 bg-white rounded shadow mb-4 max-w-[75vw] mt-4">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <label htmlFor="orderOutNum" className="font-semibold">출고증# :</label>
                    <input
                        id="orderOutNum"
                        type="text"
                        value={nextReleaseNum}
                        className="border rounded px-2 py-1 text-sm w-32 bg-gray-200"
                        readOnly
                    />
                </div>
            </div>
            <div className="flex items-center gap-4 col-span-3">
                <button onClick={alignReleaseNum} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded">
                    일렬번호
                </button>
                <button onClick={alignReleaseNum} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded">
                    같은번호
                </button>
            </div>
        </div>
    );
}