
export const formatNumber = (value: string | number) => {
    if (value === null || value === undefined || value === "") return "";
    const num = typeof value === "string" ? Number(value) : value;
    return num.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}
