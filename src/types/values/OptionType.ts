
export interface option {
    value?: string | number | null;
    label: string | number;
    isDisabled?: boolean;
    isBlocked?: boolean; // 표시만 블럭 처리, 선택은 가능 (커스텀 옵션)
}