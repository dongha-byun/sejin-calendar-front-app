import Layout from "../../Layout";
import DiaryPrintPage from "./DiaryPrintPage";

export default function DiaryPrint() {

    return (
        <Layout child={
            <DiaryPrintPage />
        } />
    );
}