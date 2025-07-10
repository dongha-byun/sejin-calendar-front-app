import type React from "react";

type FormItemProps = {
    label: string;
    children: React.ReactNode;
    required?: boolean;
}

export default function FormItem ({label, children, required}: FormItemProps) {
    return (
        <div className={`flex items-center gap-2 flex-1`}>
            <label className="w-20 shrink-0 text-right">
                {label}{required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            {children}
        </div>
    );
}
