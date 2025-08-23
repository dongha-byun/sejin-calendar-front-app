import CommonTd from "../../../../component/grid/CommonTd";
import CommonTh from "../../../../component/grid/CommonTh";
import type { Model } from "../../../../types/baseinfo/Model";

interface Props {
  data: Model[];
}

export default function ModelTable({ data }: Props) {

    return (
    <div className="overflow-x-auto">
        <table className="table-auto w-full border text-sm">
            <thead className="bg-gray-200">
                <tr>
                    <CommonTh>모델</CommonTh>
                    <CommonTh>모델명</CommonTh>
                    <CommonTh>가로</CommonTh>
                    <CommonTh>세로</CommonTh>
                    <CommonTh>규격(inch)</CommonTh>
                    <CommonTh>매수</CommonTh>
                    <CommonTh>국내가</CommonTh>
                    <CommonTh>해외A1가</CommonTh>
                    <CommonTh>해외A2가</CommonTh>
                    <CommonTh>해외B가</CommonTh>
                    <CommonTh>용지무게(표)</CommonTh>
                    <CommonTh>용지지질(표)</CommonTh>
                    <CommonTh>용지규격(표)</CommonTh>
                    <CommonTh>부당용지소요량(표)</CommonTh>
                    <CommonTh>소부(표)</CommonTh>
                    <CommonTh>도수(표)</CommonTh>
                    <CommonTh>용지무게(내)</CommonTh>
                    <CommonTh>용지지질(내)</CommonTh>
                    <CommonTh>용지규격(내)</CommonTh>
                    <CommonTh>부당용지소요량(내)</CommonTh>
                    <CommonTh>소부(내)</CommonTh>
                    <CommonTh>도수(내)</CommonTh>
                    <CommonTh>제본방식</CommonTh>
                    <CommonTh>제본단가</CommonTh>
                    <CommonTh>상호규격(cm)</CommonTh>
                    <CommonTh>상호규격(inch)</CommonTh>
                    <CommonTh>BOX</CommonTh>
                    <CommonTh>부수/box</CommonTh>
                    <CommonTh>쇄입방법</CommonTh>
                </tr>
            </thead>
            <tbody>
            {data.map((s, idx) => (
                <tr key={s.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <CommonTd>{s.modelNum}</CommonTd>
                    <CommonTd>{s.modelName}</CommonTd>
                    <CommonTd>{s.width}</CommonTd>
                    <CommonTd>{s.height}</CommonTd>
                    <CommonTd>{s.standardInch}</CommonTd>
                    <CommonTd additionalClasses="text-right">{s.pages}</CommonTd>
                    <CommonTd additionalClasses="text-right">{s.priceInternal}</CommonTd>
                    <CommonTd additionalClasses="text-right">{s.priceExternalA1}</CommonTd>
                    <CommonTd additionalClasses="text-right">{s.priceExternalA2}</CommonTd>
                    <CommonTd additionalClasses="text-right">{s.priceExternalB}</CommonTd>
                    <CommonTd>{s.coverWeight}</CommonTd>
                    <CommonTd>{s.coverProperties}</CommonTd>
                    <CommonTd>{s.coverStandard}</CommonTd>
                    <CommonTd additionalClasses="text-right">{s.coverRequirePaper}</CommonTd>
                    <CommonTd additionalClasses="text-right">{s.coverSobu}</CommonTd>
                    <CommonTd additionalClasses="text-right">{s.coverDosu}</CommonTd>
                    <CommonTd>{s.innerWeight}</CommonTd>
                    <CommonTd>{s.innerProperties}</CommonTd>
                    <CommonTd>{s.innerStandard}</CommonTd>
                    <CommonTd additionalClasses="text-right">{s.innerRequirePaper}</CommonTd>
                    <CommonTd additionalClasses="text-right">{s.innerSobu}</CommonTd>
                    <CommonTd additionalClasses="text-right">{s.innerDosu}</CommonTd>
                    <CommonTd>{s.bindMethod}</CommonTd>
                    <CommonTd additionalClasses="text-right">{s.pricePerBinding}</CommonTd>
                    <CommonTd>{s.companyNameCm}</CommonTd>
                    <CommonTd>{s.companyNameInch}</CommonTd>
                    <CommonTd>{s.box}</CommonTd>
                    <CommonTd additionalClasses="text-right">{s.countPerBox}</CommonTd>
                    <CommonTd>{s.printMethod}</CommonTd>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
    );
}