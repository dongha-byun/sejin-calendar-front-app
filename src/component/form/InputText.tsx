import { forwardRef } from "react";

export enum InputTextSize {
    Normal = "normal",
    Full = "full",
    Small = "small",
    Medium = "medium"
}

export enum TextAlign {
    Right = "text-right",
    Left = "text-left",
}

interface Props {
    name: string;
    value: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    size?: InputTextSize;
    placeholder?: string;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    unitText?: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    textAlign?: TextAlign;
}

/**
 * input style 제어
 * 1) normal : w-36 (default)
 * 2) full : w-full
 * 3) small : w-12
 */
const style = (size: InputTextSize = InputTextSize.Normal) => {
    switch (size) {
        case InputTextSize.Full:
            return "w-full";
        case InputTextSize.Small:
            return "w-12";
        case InputTextSize.Medium:
            return "w-36";
        default:
            return "w-full";
    }
}

const InputText = forwardRef<HTMLInputElement, Props>(
    ({ name, value, onChange, type, size, placeholder, onKeyDown, unitText, onBlur, readOnly, textAlign }, ref) => {

    const readOnlyStyle = readOnly ? "bg-gray-200" : "";

    return (
        <>
        <input 
            type={type} name={name} value={value} 
            onChange={onChange} 
            onKeyDown={onKeyDown}
            className={`${style(size)} border rounded p-1 ${readOnlyStyle} ${textAlign}`} // p-1.5 
            placeholder={placeholder} 
            onBlur={onBlur}
            readOnly = {readOnly}
            ref={ref}
        /> <span>{unitText}</span>
        </>
    );
});

export default InputText;