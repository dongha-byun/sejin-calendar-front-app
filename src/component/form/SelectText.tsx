import Select from "react-select";
import { InputTextSize } from "./InputText";

interface Props {
  options: { value: string | number; label: string | number }[];
  size?: InputTextSize;
  value: any;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
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
        default:
            return "w-full";
    }
}

export default function SelectText({options, size, value, name, onChange}: Props) {
  return (
    <div className={`${style(size)}`}>
      <Select
        options={options}
        isClearable
        isSearchable
        placeholder=""
        value={options.find(option => option.value === value)}
        name={name}
        onChange={option => {
          if(onChange) {
            onChange({
              target: {
                name: name || '',
                value: option ? option.value : ''
              }
            } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>);
          }
        }}
      />
    </div>
  );
}