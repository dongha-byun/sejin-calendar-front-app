import { type CustomCompany } from "../../../../types/baseinfo/CustomCompany";

interface Props {
  data: CustomCompany[];
}

export default function CustomCompanyTable({ data }: Props) {
  return (
    <div className="overflow-x-auto pb-4 -mb-4">
      <table className="table w-full min-w-max border text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-2 py-1">번호</th>
            <th className="border px-2 py-1">분류</th>
            <th className="border px-2 py-1">거래처명</th>
            <th className="border px-2 py-1">대표자</th>
            <th className="border px-2 py-1">주소</th>
            <th className="border px-2 py-1">전화</th>
            <th className="border px-2 py-1">팩스</th>
            <th className="border px-2 py-1">사업자번호</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Webhard</th>
            <th className="border px-2 py-1">입력일</th>
            <th className="border px-2 py-1">가격표</th>
            <th className="border px-2 py-1">D/C</th>
            <th className="border px-2 py-1">Etc</th>
          </tr>
        </thead>
        <tbody>
          {data.map((s, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="border px-2 py-1 text-center">{s.id}</td>
              <td className="border px-2 py-1">{s.companyType}</td>
              <td className="border px-2 py-1">{s.name}</td>
              <td className="border px-2 py-1">{s.ceo}</td>
              <td className="border px-2 py-1">{s.address}</td>
              <td className="border px-2 py-1">{s.tel}</td>
              <td className="border px-2 py-1">{s.fax}</td>
              <td className="border px-2 py-1">{s.bizNo}</td>
              <td className="border px-2 py-1">{s.email}</td>
              <td className="border px-2 py-1">{s.webhard}</td>
              <td className="border px-2 py-1">{s.createdAt}</td>
              <td className="border px-2 py-1">{s.discountType}</td>
              <td className="border px-2 py-1 text-right">{s.discountRate}</td>
              <td className="border px-2 py-1">{s.etc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}