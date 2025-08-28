
export enum InputTextSize {
    Normal = "normal",
    Full = "full",
    Small = "small",
    Medium = "medium"
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

export default function InputText({ name, value, onChange, type, size, placeholder, onKeyDown, unitText, onBlur }: Props) {

    return (
        <>
        <input 
            type={type} name={name} value={value} 
            onChange={onChange} 
            onKeyDown={onKeyDown}
            className={`${style(size)} border rounded p-1`} // p-1.5 
            placeholder={placeholder} 
            onBlur={onBlur}
        /> <span>{unitText}</span>
        </>
    );
}