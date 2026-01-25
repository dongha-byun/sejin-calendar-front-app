import Select, { createFilter } from "react-select";
import { InputTextSize } from "./InputText";
import type { option } from "../../types/values/OptionType";

interface Props {
  options: option[];
  size?: InputTextSize;
  value: any;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  defaultOption?: string[]; 
  isFilterStartWith?: boolean
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
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.data?.isBlocked 
      ? "#f3f4f6"  // isBlocked 옵션은 회색 배경
      : state.isSelected
      ? provided.backgroundColor  // 선택된 옵션은 기본 스타일 유지
      : state.isFocused
      ? provided.backgroundColor  // 포커스된 옵션은 기본 스타일 유지
      : provided.backgroundColor, // 기본은 기본 스타일 유지
    color: state.data?.isBlocked 
      ? "#6b7280"  // isBlocked 옵션은 회색 텍스트
      : provided.color, // 기본은 기본 색상 유지
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

const startWithFilter = createFilter({
  ignoreCase: true,
  ignoreAccents: true,
  matchFrom: "start", // ← "any" 대신 "start"로 설정
});

export default function CommonSelect({options, size, value, name, onChange, defaultOption, isFilterStartWith}: Props) {
  let finalOptions = options;
  if(defaultOption) {
    finalOptions = [
      ...options,
      { value: "---------", label: "---------", isBlocked: true },
      ...defaultOption.map(o => ({ value: o, label: o}))
    ];
  }
  
  console.log(finalOptions);

  return (
    <div className={`${style(size)}`}>
      <Select<option>
        styles={smallSelectStyles}
        options={finalOptions}
        isClearable
        isSearchable
        filterOption={isFilterStartWith ? startWithFilter : undefined}
        placeholder=""
        value={finalOptions.find(option => option.value === value) || (value ? { value, label: value } : null)}
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