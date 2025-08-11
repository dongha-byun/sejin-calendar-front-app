import { useEffect, useState } from "react";
import type { AdminMember } from "../../../types/admin/AdminMember";
import AdminMemberFormSection from "./components/AdminMemberFormSection";
import AdminMemberTable from "./components/AdminMemberTable";

export default function AdminMemberPage() {
  const [members, setMembers] = useState<AdminMember[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("members");
    if (saved) setMembers(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("members", JSON.stringify(members));
  }, [members]);

  const addMember = (member: AdminMember) => {
    setMembers(prev => [...prev, member]);
  };

  return (
    <div className="px-6 py-3">
      <h1 className="text-base font-semibold pb-2">관리자 - 사용자관리</h1>
      <div className="grid grid-cols-2 gap-4 p-3 border border-white-500">
        <AdminMemberTable data={members} />
        <AdminMemberFormSection onAdd={addMember} />
      </div>
    </div>
  );
}