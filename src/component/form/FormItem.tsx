import type React from "react";

type FormItemProps = {
    label: string;
    children: React.ReactNode;
    required?: boolean;
    additionClass?: string;
}

export default function FormItem ({label, children, required, additionClass}: FormItemProps) {
    return (
        <div className={`flex items-center gap-2 flex-1 ${additionClass}`}>
            <label className="w-20 shrink-0 text-right">
                {label}{required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            {children}
        </div>
    );
}
