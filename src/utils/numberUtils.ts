
export const formatNumber = (value: string | number) => {
    if (value === null || value === undefined || value === "") return "";
    if (typeof value === "number") {
        return value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    }

    // 콤마 제거
    let str = value.replace(/,/g, "");

    // 소수점이 없는 경우
    if (!str.includes(".")) {
        return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // 소수점이 있는 경우
    const [intPart, decPart] = str.split(".");
    
    return (
        intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        "." +
        (decPart !== undefined ? decPart : "") // 소수점 둘째자리까지
    );
};

// blur 시 소수점 둘째자리까지 0으로 채우기
export const padDecimal = (value: string) => {
    if (value === null || value === undefined || value === "") return "";
    if (!value.includes(".")) return value; // 소수점 없으면 그대로

    const [intPart, decPart = ""] = value.split(".");
    let padded = decPart.padEnd(2, "0").slice(0, 2);
    return intPart + "." + padded;
};
