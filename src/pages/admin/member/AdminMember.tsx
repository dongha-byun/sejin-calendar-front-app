import Layout from "../../Layout";
import AdminMemberPage from "./AdminMemberPage";

export default function AdminMember() {
    return (
        <Layout child={
            <AdminMemberPage />
        } />
    );
}