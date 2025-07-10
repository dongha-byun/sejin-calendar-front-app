import Select from "react-select";
import { InputTextSize } from "./InputText";

interface Props {
  options: { value: string; label: string }[];
  size?: InputTextSize
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
            return "w-24";
        default:
            return "w-48";
    }
}

export default function SelectText({options, size}: Props) {
  return (
    <div className={`${style(size)}`}>
      <Select
        options={options}
        isClearable
        isSearchable
        placeholder=""
      />
    </div>
  );
}