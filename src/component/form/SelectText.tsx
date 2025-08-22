import Select from "react-select";
import { InputTextSize } from "./InputText";
import CreatableSelect from "react-select/creatable";

interface Props {
  options: { value: string | number; label: string | number }[];
  size?: InputTextSize;
  value: any;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const smallSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    minHeight: "28px",       // 기본 높이 줄이기
    height: "28px",
    padding: "0 2px",        // 좌우 패딩 축소
    fontSize: "12px",        // 글자 크기 축소
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    padding: "0 4px",        // 내부 패딩 축소
    height: "28px",
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
    height: "28px",
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    padding: "0 4px",        // 드롭다운 아이콘 패딩 축소
  }),
  clearIndicator: (provided: any) => ({
    ...provided,
    padding: "0 4px",
  }),
  menu: (provided: any) => ({
    ...provided,
    fontSize: "12px",        // 드롭다운 목록 글자 크기
  }),
};

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
      <CreatableSelect
        styles={smallSelectStyles}
        options={options}
        isClearable
        isSearchable
        placeholder=""
        value={options.find(option => option.value === value) || (value ? { value, label: value } : null)}
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