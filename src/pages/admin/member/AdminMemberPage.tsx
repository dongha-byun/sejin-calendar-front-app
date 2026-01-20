import { useEffect, useState } from "react";
import type { AdminMember } from "../../../types/admin/AdminMember";
import AdminMemberFormSection from "./components/AdminMemberFormSection";
import AdminMemberTable from "./components/AdminMemberTable";
import { memberApi } from "../../../api/admin/memberApi";

export default function AdminMemberPage() {
  const [members, setMembers] = useState<AdminMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<AdminMember>();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
    memberApi.list().then(setMembers);
  }

  const addMember = (member: AdminMember) => {
    memberApi.save(member).then(() => {
      fetch();
    });
  };

  const selectMember = (userId: string) => {
    memberApi.selectOne(userId).then(setSelectedMember);
  }

  const deleteMember = (userId: string) => {
    memberApi.delete(userId).then(() => {
      fetch();
    });
  }

  return (
    <div className="px-6 py-3">
      <h1 className="text-base font-semibold pb-2">관리자 - 사용자관리</h1>
      <div className="grid grid-cols-2 gap-4 p-3 border border-white-500">
        <AdminMemberTable data={members} selectMember={selectMember}/>
        <AdminMemberFormSection onAdd={addMember} selectedMember={selectedMember} deleteMember={deleteMember} />
      </div>
    </div>
  );
}