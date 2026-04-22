import { useCallback, useEffect, useState } from "react";
import MonitorOrderFormSection from "./components/MonitorOrderFormSection";
import {
    emptyMonitorOrdersStatistic,
    type MonitorOrderApiRow,
    type MonitorOrdersStatisticData,
    type MonitorOrderHistoryBlock,
    type MonitorPrintHistoryItem,
    type MonitorMachineHistoryItem,
    type MonitorBindHistoryItem,
} from "../../../types/monitor/MonitorOrder";
import MonitorOrderTable from "./components/MonitorOrderTable";
import MonitorOrderBottom from "./components/MonitorOrderBottom";
import PageHeader from "../../../component/layout/PageHeader";
import type { Model } from "../../../types/baseinfo/Model";
import { modelApi } from "../../../api/baseinfo/modelApi";
import { CompanyType, type CustomCompany } from "../../../types/baseinfo/CustomCompany";
import { customCompanyApi } from "../../../api/baseinfo/customCompanyApi";
import { monitorOrderApi, type MonitorOrdersQuery } from "../../../api/monitor/monitorOrderApi";

const emptyHistory = <T,>(): MonitorOrderHistoryBlock<T> => ({ list: [], totalAmount: 0 });

export default function MonitorOrderPage() {
    const [orders, setOrders] = useState<MonitorOrderApiRow[]>([]);
    const [highlightOrderNum, setHighlightOrderNum] = useState<number | undefined>();
    const [statistic, setStatistic] = useState<MonitorOrdersStatisticData | null>(null);
    const [printHistory, setPrintHistory] = useState<MonitorOrderHistoryBlock<MonitorPrintHistoryItem>>(emptyHistory());
    const [machineHistory, setMachineHistory] = useState<MonitorOrderHistoryBlock<MonitorMachineHistoryItem>>(emptyHistory());
    const [bindHistory, setBindHistory] = useState<MonitorOrderHistoryBlock<MonitorBindHistoryItem>>(emptyHistory());
    const [models, setModels] = useState<Model[]>([]);
    const [companies, setCompanies] = useState<CustomCompany[]>([]);

    const fetchMonitorOrders = useCallback(async (query: MonitorOrdersQuery) => {
        try {
            const [listResult, statisticData] = await Promise.all([
                monitorOrderApi.list(query),
                monitorOrderApi.statistic(query),
            ]);
            setOrders(listResult.orderList);
            setStatistic(statisticData);
            setPrintHistory(listResult.raw.printHistory);
            setMachineHistory(listResult.raw.machineHistory);
            setBindHistory(listResult.raw.bindHistory);
        } catch {
            setOrders([]);
            setStatistic(emptyMonitorOrdersStatistic);
            setPrintHistory(emptyHistory());
            setMachineHistory(emptyHistory());
            setBindHistory(emptyHistory());
        }
    }, []);

    const clearMonitorOrders = useCallback(() => {
        setOrders([]);
        setStatistic(null);
        setPrintHistory(emptyHistory());
        setMachineHistory(emptyHistory());
        setBindHistory(emptyHistory());
        setHighlightOrderNum(undefined);
    }, []);

    const handleOrderNumSearch = useCallback((orderNum: string) => {
        setHighlightOrderNum(orderNum ? Number(orderNum) : undefined);
    }, []);

    useEffect(() => {
        modelApi.list().then(setModels);
        customCompanyApi.list(CompanyType.Agency).then(setCompanies);
    }, []);

    return (
        <div className="px-6 py-3">
            <PageHeader>접수내역 조회</PageHeader>
            <MonitorOrderFormSection
                models={models}
                companies={companies}
                onMonitorOrdersFetch={fetchMonitorOrders}
                onMonitorOrdersClear={clearMonitorOrders}
                onOrderNumSearch={handleOrderNumSearch}
            />
            <MonitorOrderTable data={orders} highlightOrderNum={highlightOrderNum} />
            <MonitorOrderBottom
                statistic={statistic ?? emptyMonitorOrdersStatistic}
                printHistory={printHistory}
                machineHistory={machineHistory}
                bindHistory={bindHistory}
            />
        </div>
    );
}