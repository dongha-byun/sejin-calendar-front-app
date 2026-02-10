import { useRef, useState } from "react";
import DiaryOrderOutFormSection, { type DiaryOrderOutFormSectionRef } from "./components/DiaryOrderOutFormSection";
import DiaryOrderOutTable from "./components/DiaryOrderOutTable";
import { diaryOrderOutApi } from "../../../api/diary/diaryOrderOutApi";
import type { DiaryOrderOutOrder } from "../../../types/diary/DiaryOrderOut";
import { nowDate } from "../../../utils/dateUtils";

export default function DiaryOrderOutPage() {
    const [data, setData] = useState<DiaryOrderOutOrder[]>([]);
    const [checkedIds, setCheckedIds] = useState<number[]>([]);
    const formSectionRef = useRef<DiaryOrderOutFormSectionRef>(null);

    const searchOrder = (orderNum: number) => {
        diaryOrderOutApi.searchOrder(orderNum).then(res => {
            console.log(res);
            console.log(res.result);
            if(res.result.success) {
                if(data.find(d => d.orderId === res.data?.orderId)) {
                    return;
                }
                setData([...data, res.data!]);
                formSectionRef.current?.focusAmountInput();
            } else {
                alert(res.result.message);
            }
        })
        .catch(err => {
            console.log(err);
            alert(err.result.message);
        });
    }

    const saveOrderRelease = () => {
        const releaseRequests = data.filter(d => checkedIds.includes(d.orderId)).map(d => ({
            orderNum: d.orderNum,
            releaseDate: formSectionRef.current?.getReleaseDate() ?? nowDate,
            releaseAmount: d.totalReleasedAmount
        }));
        diaryOrderOutApi.saveOrderRelease(releaseRequests).then(initForm);
    }

    const onCheckId = (isChecked: boolean, id?: number) => {
        if(!id) return;

        if(isChecked) {
            setCheckedIds(prev => [...prev, id]);
        } else {
            setCheckedIds(prev => prev.filter((checkId) => checkId !== id));
        }
    }

    const deleteSelected = () => {
        setData(data.filter(d => !checkedIds.includes(d.orderId)));
        setCheckedIds([]);
    }

    const initForm = () => {
        setData([]);
        setCheckedIds([]);
        formSectionRef.current?.resetForm();
    }

    const applyReleaseAmount = (orderNum: number, amount: number) => {
        const row = data.find(d => d.orderNum === orderNum);
        if (!row) {
            alert("해당 접수번호의 주문이 목록에 없습니다.");
            return;
        }
        if (amount !== row.amount) {
            alert("주문량과 동일한 수량을 입력하세요.");
            return;
        }
        setData(data.map(d =>
            d.orderNum === orderNum ? { ...d, totalReleasedAmount: amount } : d
        ));
        formSectionRef.current?.clearAmount();
        formSectionRef.current?.focusAndSelectOrderNum();
    }

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">작업일지 - 제품출고</h1>
            <DiaryOrderOutFormSection ref={formSectionRef} searchOrder={searchOrder} applyReleaseAmount={applyReleaseAmount} />
            <DiaryOrderOutTable 
                data={data} checkedIds={checkedIds} onCheckId={onCheckId} 
                deleteSelected={deleteSelected} 
                initForm={initForm} saveOrderRelease={saveOrderRelease}
            />
        </div>
    );
}