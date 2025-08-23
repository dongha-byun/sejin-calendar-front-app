import type React from "react";

type FormItemProps = {
    label: string;
    children: React.ReactNode;
    required?: boolean;
    additionClass?: string;
    checkEvent?: () => void;
    labelWidth?: string;
}

export default function FormItem ({label, children, required, additionClass, checkEvent, labelWidth}: FormItemProps) {
    return (
        <div className={`flex items-center gap-2 flex-1 ${additionClass}`}>
            {label.length > 0 && 
            <div className={`${labelWidth ? labelWidth : 'w-20'} shrink-0 flex justify-end`}>
                <label className="inline-flex items-center space-x-1">
                    {checkEvent && 
                    <input 
                        type="checkbox" 
                        onChange={checkEvent}
                        className="form-checkbox h-4 w-4 transition ease-in-out mr-1"/>}
                    {label}{required && <span className="text-red-500 ml-0.5">*</span>}
                </label>   
            </div>
            }
            {children}
        </div>
    );
}
