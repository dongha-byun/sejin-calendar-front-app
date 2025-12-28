import { useEffect, useState } from "react";
import CommandOrderOutFormSection from "./components/CommandOrderOutFormSection";
import CommandOrderOutTable from "./components/CommandOrderOutTable";
import type { CommandOrderOutSearchDto } from "../../../types/command/CommandOrderOut";
import { commandOrderOutApi } from "../../../api/command/commandOrderOutApi";
import { CompanyType, type CustomCompany } from "../../../types/baseinfo/CustomCompany";
import { customCompanyApi } from "../../../api/baseinfo/customCompanyApi";
import CommandOrderOutBottom from "./components/CommandOrderOutBottom";
import { orderApi } from "../../../api/ordermanager/orderApi";

export const DEFAULT_PRINT_CN = "NO_PRINT";
export const DEFAULT_ORDER_TYPE = "ORDER_NUM";
export const DEFAULT_CUSTOMER_NAME = "";

export default function CommandOrderOutPage () {
    const [orders, setOrders] = useState<CommandOrderOutSearchDto[]>([]);
    const [companies, setCompanies] = useState<CustomCompany[]>([]);
    const [checkIds, setCheckIds] = useState<number[]>([]);
    const [nextReleaseNum, setNextReleaseNum] = useState<number>(0);
    const [scrollToOrderNum, setScrollToOrderNum] = useState<number | null>(null);

    useEffect(() => {
        customCompanyApi.list(CompanyType.Agency).then(setCompanies);
        getNextReleaseNum();
    }, []);
    
    const getNextReleaseNum = () => {
        orderApi.nextReleaseNum().then(result => {
            setNextReleaseNum(result.nextReleaseNum);
        });
    }

    const searchOrders = (printCn: string, orderType: string, customerName: string) => {
        commandOrderOutApi.searchOrders(printCn, orderType, customerName).then(response => {
            if(response.result.success) {
                const ordersWithDefault = (response.data || []).map(order => ({
                    ...order,
                    isVisible: order.isVisible ?? true
                }));
                setOrders(ordersWithDefault);
                setCheckIds([]);
            } else {
                alert(response.result.message);
            }
        });
    }

    // 모두선택: 리스트에 노출된 모든 체크박스를 체크
    const handleSelectAll = () => {
        const allIds = orders.filter(order => order.id).map(order => order.id!);
        setCheckIds(allIds);
    };

    // 선택삭제: 체크된 항목들을 리스트에서 제거
    const handleSelectedClear = () => {
        setCheckIds([]);
    };
    
    // 선택숨김 : 체크된 항목들을 리스트에서 숨김처리
    const handleSelectedHide = () => {
        setOrders(orders.map(order =>
            checkIds.includes(order.id ?? 0)
                ? { ...order, isVisible: false }
                : order
        ));
        setCheckIds([]);
    };

    const openPrintPreviewPop = () => {
        window.open(
            "/command/order-out/print/preview",
            "orderOutPrintPreview",
            "width=1080,height=600"
        );
    }

    const alignReleaseNum = () => {
        commandOrderOutApi.alignReleaseNum(nextReleaseNum, checkIds).then(response => {
            if(response.result.success) {
                searchOrders(DEFAULT_PRINT_CN, DEFAULT_ORDER_TYPE, DEFAULT_CUSTOMER_NAME);
                getNextReleaseNum();
            } else {
                alert(response.result.message);
            }
        });
    }

    // 접수번호 검색 처리
    const handleSearchByOrderNum = (orderNum: string) => {
        const orderNumValue = parseInt(orderNum, 10);
        if (isNaN(orderNumValue)) {
            alert("올바른 접수번호를 입력해주세요.");
            return;
        }

        const foundOrder = orders.find(order => order.orderNum === orderNumValue && order.isVisible);
        if (foundOrder) {
            // 해당 접수번호로 스크롤
            setScrollToOrderNum(orderNumValue);
            // 스크롤 후 상태 초기화 (다음 검색을 위해)
            setTimeout(() => {
                setScrollToOrderNum(null);
            }, 1000);
        } else {
            alert(`접수번호 ${orderNumValue}를 찾을 수 없습니다.`);
        }
    }

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">작업지시 - 출고증발행</h1>
            <CommandOrderOutFormSection 
                companies={companies} searchOrders={searchOrders} 
                onSelectAll={handleSelectAll}
                onSelectedClear={handleSelectedClear}
                onSelectedHide={handleSelectedHide}
                openPrintPreviewPop={openPrintPreviewPop}
                onSearchByOrderNum={handleSearchByOrderNum}
            />
            <CommandOrderOutTable 
                data={orders} 
                checkIds={checkIds} 
                setCheckIds={setCheckIds}
                scrollToOrderNum={scrollToOrderNum}
            />
            <CommandOrderOutBottom nextReleaseNum={nextReleaseNum} alignReleaseNum={alignReleaseNum} />
        </div>
    );
}