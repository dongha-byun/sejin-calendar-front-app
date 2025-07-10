import type React from "react";

type FormItemProps = {
    label: string;
    children: React.ReactNode;
    fullWidth?: boolean;
}

export default function FormItem ({label, children, fullWidth}: FormItemProps) {
    return (
        <div className={`flex items-center gap-2 ${fullWidth ? "flex-1" : ""}`}>
            <label>{label}</label>
            <div className={fullWidth ? "flex-1" : ""}>{children}</div>
        </div>
    );
}
